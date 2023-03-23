import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import ModalBasic from "../../../components/ModalBasic"
import { Location } from "../../../types/location"
import {
  availableCountriesList,
  formatPhoneNumber,
  makeid,
} from "../../../utils/commonFunctions"
export type LocationDialogProps = {
  onAdd: (location: Partial<Location>) => void
  onClose: () => void
  onUpdate: (location: Location) => void
  open: boolean
  processing: boolean
  location?: Location
  setModalOpen: (val: boolean) => void
}

function AddUpdateLocationForm(props: LocationDialogProps) {
  const { onAdd, onClose, onUpdate, open, processing, location, setModalOpen } =
    props

  const editMode = Boolean(location && location.id)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [tagsInput, setTagsInput] = useState("")
  const [locationTags, setLocationTags] = useState<string[]>([])

  const countryNames = availableCountriesList
  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (!location) {
        setLocationTags([])
      }
      if (location && location.tags) {
        setLocationTags(location.tags)
      }
    }
    return () => {
      mounted = false
    }
  }, [])
  const handleSubmit = (values: Partial<Location>) => {
    const modifiedValue: Partial<Location> = {
      ...values,
      tags: locationTags,
    }
    if (location && location.id) {
      onUpdate({ ...modifiedValue, id: location.id } as Location)
    } else {
      onAdd(modifiedValue)
    }
  }
  useEffect(() => {
    if (location && location.id) {
      formik.setValues({
        ...location,
      })
    } else {
      formik.setValues({ ...formik.initialValues })
    }
  }, [location])

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      location_name: location ? location.location_name : "",
      business_email: location ? location.business_email : "",
      address_line_1: location ? location.address_line_1 : "",
      address_line_2: location ? location.address_line_2 : "",
      phone_number: location ? location.phone_number : "",
      phone_number_alt: location ? location.phone_number_alt : "",
      notes: location ? location.notes : "",
      city: location ? location.city : "",
      country: location ? location.country : "United Kingdom",
      post_code: location ? location.post_code : "",
      tags: location ? location.tags : [],
      channel: location ? location.channel : "",
    },
    validationSchema: Yup.object({
      location_name: Yup.string()
        .max(100, `First name should be less than 100 char`)
        .required(`First name required`),
      phone_number: Yup.string()
        .max(100, `phone number should be less than 100 char`)
        .required(`phone number required`),
      business_email: Yup.string()
        .email()
        .max(100, `email should be less than 100 char`)
        .required(`email required`),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <>
      <ModalBasic
        id="add-update-location-modal"
        modalOpen={open}
        setModalOpen={setModalOpen}
        title={editMode ? `Update Location` : `Add Location`}
        fullScreen
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(keyEvent) => {
            if (keyEvent.code === "Enter") {
              keyEvent.preventDefault()
            }
          }}
        >
          <div className="px-5 py-4">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-3">
                {editMode ? `Update` : `Add`} location for your company
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="location_name"
                  >
                    Location Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="location_name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.location_name}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.location_name &&
                    Boolean(formik.errors.location_name) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.location_name &&
                          formik.errors.location_name}
                      </span>
                    )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="business_email"
                  >
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="business_email"
                    className="form-input w-full px-2 py-1"
                    type="email"
                    value={formik.values.business_email}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.business_email &&
                    Boolean(formik.errors.business_email) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.business_email &&
                          formik.errors.business_email}
                      </span>
                    )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="phone_number"
                  >
                    Phone number<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone_number"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.phone_number}
                    onChange={(e) => {
                      const tempVal = e.target.value
                      e.target.value = formatPhoneNumber(tempVal)
                      formik.handleChange(e)
                    }}
                    required
                  />
                  {formik.touched.phone_number &&
                    Boolean(formik.errors.phone_number) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.phone_number &&
                          formik.errors.phone_number}
                      </span>
                    )}
                </div>
                {showAdditionalInfo && (
                  <>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="phone_number_alt"
                      >
                        Phone number (Alternative)
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone_number_alt"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.phone_number_alt}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.phone_number_alt &&
                        Boolean(formik.errors.phone_number_alt) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.phone_number_alt &&
                              formik.errors.phone_number_alt}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="address_line_1"
                      >
                        Address line 1<span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="address_line_1"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.address_line_1}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.address_line_1 &&
                        Boolean(formik.errors.address_line_1) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.address_line_1 &&
                              formik.errors.address_line_1}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="address_line_2"
                      >
                        Address line 2<span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="address_line_2"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.address_line_2}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.address_line_2 &&
                        Boolean(formik.errors.address_line_2) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.address_line_2 &&
                              formik.errors.address_line_2}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="city"
                      >
                        City<span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="city"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.city && Boolean(formik.errors.city) && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formik.touched.city && formik.errors.city}
                        </span>
                      )}
                    </div>
                    {/* Country */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="country"
                      >
                        Country <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="country"
                        className="form-input w-full px-2 py-1"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                      >
                        {countryNames.map((elem: string) => {
                          return (
                            <option key={elem} value={elem}>
                              {elem}
                            </option>
                          )
                        })}
                      </select>
                      {formik.touched.country &&
                        Boolean(formik.errors.country) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.country && formik.errors.country}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="post_code"
                      >
                        Post code<span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="post_code"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.post_code}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.post_code &&
                        Boolean(formik.errors.post_code) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.post_code &&
                              formik.errors.post_code}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="channel"
                      >
                        Channel<span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="channel"
                        className="form-input w-full px-2 py-1"
                        type="text"
                        value={formik.values.channel}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.channel &&
                        Boolean(formik.errors.channel) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.channel && formik.errors.channel}
                          </span>
                        )}
                    </div>
                  </>
                )}
              </div>
              <div className="full-w">
                <button
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="button"
                  onClick={() => {
                    setShowAdditionalInfo((elem) => !elem)
                  }}
                >
                  {showAdditionalInfo ? `Hide` : `Add More`} Info
                </button>
              </div>
              {showAdditionalInfo && (
                <>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="tags"
                    >
                      Location Tags<span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="tags"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      value={tagsInput}
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          setLocationTags((elem) => [...elem, tagsInput])
                          setTagsInput("")
                        }
                      }}
                      onChange={(e) => {
                        setTagsInput(e.target.value)
                      }}
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Please press 'enter' after typing to add location tags
                    </span>
                    {formik.touched.tags && Boolean(formik.errors.tags) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.tags && formik.errors.tags}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-4 ">
                    {locationTags.map((elem, index) => {
                      return (
                        <span
                          key={`${makeid(4)}-location-tag-${index}`}
                          className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                        >
                          {elem}
                          <button
                            className="bg-transparent hover focus:outline-none"
                            onClick={() => {
                              const tempArr = [...locationTags]
                              const index = tempArr.indexOf(elem)
                              if (index > -1) {
                                // only splice array when item is found
                                tempArr.splice(index, 1) // 2nd parameter means remove one item only
                              }
                              setLocationTags([...tempArr])
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="times"
                              className="w-3 ml-3"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 352 512"
                            >
                              <path
                                fill="currentColor"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                              ></path>
                            </svg>
                          </button>
                        </span>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  //   setFeedbackModalOpen(false)
                  onClose()
                }}
              >
                Cancel
              </button>
              {processing ? (
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                  disabled
                >
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </button>
              ) : (
                <button
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="submit"
                >
                  {editMode ? `Update Location` : `Create New Location`}
                </button>
              )}
            </div>
          </div>
        </form>
      </ModalBasic>
    </>
  )
}

export default AddUpdateLocationForm
