import axios from "axios"
import { useFormik } from "formik"
import moment from "moment"
import "moment-timezone"
import { useEffect, useState } from "react"
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import * as Yup from "yup"
import ModalBasic from "../../../components/ModalBasic"
import { useAuth } from "../../../contexts/AuthProvider"
import { Customer } from "../../../types/customer"
import validator from "validator"
import {
  availableCountriesList,
  formatPhoneNumber,
  getAvailableCountryCodesPhoneList,
  getCountryFromZone,
  makeid,
} from "../../../utils/commonFunctions"
import SearchBar, { iItemType } from "../common/SearchBar"
import { GoogleAddressParser } from "./GoogleAddressParser"

const GOOGLE_PLACES_API_KEY = process.env.VITE_APP_GOOGLE_PLACES_API_KEY
export type CustomerDialogProps = {
  onAdd: (customer: Partial<Customer>) => void
  onClose: () => void
  onUpdate: (customer: Customer) => void
  open: boolean
  processing: boolean
  customer?: Partial<Customer>
  setModalOpen: (val: boolean) => void
}

function AddUpdateCustomerForm(props: CustomerDialogProps) {
  const { onAdd, onClose, onUpdate, open, processing, customer, setModalOpen } =
    props
  const { userInfo } = useAuth()
  const editMode = Boolean(customer && customer.id)
  const [tagsInput, setTagsInput] = useState("")

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: GOOGLE_PLACES_API_KEY,
    options: {
      fields: ["ALL"],
    },
  })
  const [googleSearchValue, setGoogleSearchValue] = useState("")
  const [countryCodeForMobile, setCountryCodeForMobile] =
    useState<string>(`United States`)
  const [customerTags, setCustomerTags] = useState<string[]>([])
  const countryNames = availableCountriesList

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (!customer) {
        setCustomerTags([])
      }
      if (customer && customer.tags) {
        setCustomerTags(customer.tags)
      }
    }
    return () => {
      mounted = false
    }
  }, [])
  useEffect(() => {
    if (!editMode) {
      let userTimezone = moment.tz.guess()
      let getCountry = getCountryFromZone(userTimezone)
      const findNumber = getAvailableCountryCodesPhoneList.find((elem) => {
        return elem.name === getCountry
      })
      if (findNumber) {
        setCountryCodeForMobile(findNumber.name)
      }
      formik.setValues({
        ...customer,
        country: getCountry,
      })
    }
  }, [open])
  const handleSubmit = (values: Partial<Customer>) => {
    console.log("submitting account")
    const findNumber = getAvailableCountryCodesPhoneList.find((elem) => {
      return elem.name === countryCodeForMobile
    })
    let countryCode = `+1`
    if (findNumber) {
      countryCode = `+${findNumber.phoneCode}`
    }
    const modifiedValue: Partial<Customer> = {
      ...values,
      mobile_country_code: countryCode,
      suffix: customer && customer.suffix ? customer.suffix : `MR`,
      tags: customerTags,
    }
    console.log(modifiedValue)
    if (customer && customer.id) {
      onUpdate({ ...modifiedValue, id: customer.id } as Customer)
    } else {
      onAdd(modifiedValue)
    }
  }

  useEffect(() => {
    console.log(customer)
    console.log(formik.values)
    console.log(formik.initialValues)
    if (customer && customer.id) {
      if (customer && customer.mobile_country_code) {
        const findCustomerMobileCountryName =
          getAvailableCountryCodesPhoneList.find((elem) => {
            return `+${elem.phoneCode}` === customer.mobile_country_code
          })
        if (findCustomerMobileCountryName) {
          setCountryCodeForMobile(findCustomerMobileCountryName.name)
        }
      }
      formik.setValues({
        ...customer,
      })
    } else {
      formik.setValues({ ...formik.initialValues })
    }
  }, [customer])

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      first_name: customer ? customer.first_name : "",
      last_name: customer ? customer.last_name : "",
      address_line_1: customer ? customer.address_line_1 : "",
      address_line_2: customer ? customer.address_line_2 : "",
      email: customer ? customer.email : "",
      phone_number: customer ? customer.phone_number : "",
      phone_number_alt: customer ? customer.phone_number_alt : "",
      notes: customer ? customer.notes : "",
      suffix: customer ? customer.suffix : "MR",
      city: customer ? customer.city : "",
      country: customer ? customer.country : "Other",
      post_code: customer ? customer.post_code : "",
      tags: customer ? customer.tags : [],
      channel: customer ? customer.channel : "",
      mobile_country_code: customer ? customer.mobile_country_code : "+1",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required(`email required`),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <>
      <ModalBasic
        id="add-update-customer-modal"
        modalOpen={open}
        setModalOpen={setModalOpen}
        title={editMode ? `Update Customer` : `Add Customer`}
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
                {editMode ? `Update` : `Add`} customer for your company
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="suffix"
                  >
                    Suffix
                  </label>
                  <select
                    id={`suffix`}
                    className="form-select w-full"
                    value={formik.values.suffix}
                    onChange={(e) => {
                      console.log(e.target.value)
                      formik.handleChange(e)
                    }}
                  >
                    {[
                      {
                        label: "Mr",
                        value: "MR",
                      },
                      {
                        label: "Ms",
                        value: "MS",
                      },
                      {
                        label: "Sir",
                        value: "SIR",
                      },
                      {
                        label: "Madam",
                        value: "MADAM",
                      },
                    ].map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="last_name"
                    placeholder="optional"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    className="form-input w-full px-2 py-1"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.email && Boolean(formik.errors.email) && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formik.touched.email && formik.errors.email}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="phone_number"
                  >
                    Phone number
                  </label>
                  <select
                    id="country"
                    className="form-select w-1/3"
                    value={countryCodeForMobile}
                    onChange={(e) => {
                      setCountryCodeForMobile(e.target.value)
                    }}
                  >
                    {getAvailableCountryCodesPhoneList.map(
                      (elem: {
                        name: string
                        phoneCode: string
                        emoji: any
                      }) => {
                        return (
                          <option key={elem.name} value={`${elem.name}`}>
                            {`${elem.name} (+${elem.phoneCode})`}
                          </option>
                        )
                      }
                    )}
                  </select>
                  <input
                    id="phone_number"
                    className="form-input w-2/3 px-2 py-1"
                    type="text"
                    value={formik.values.phone_number}
                    placeholder="Phone number"
                    onChange={(e) => {
                      const tempVal = e.target.value
                      e.target.value = formatPhoneNumber(tempVal)
                      formik.handleChange(e)
                    }}
                  />
                </div>
              </div>
              <div>
                <div>
                  <SearchBar
                    label={"Autofill by search.."}
                    id="Search-box-find-address-via-google"
                    data={placePredictions.map((elem: any) => {
                      return {
                        title: elem.description,
                        sub_title: ``,
                        key: elem.place_id,
                      }
                    })}
                    value={googleSearchValue}
                    isLoading={isPlacePredictionsLoading}
                    showError={false}
                    onChange={(e: any) => {
                      console.log("changed")
                      getPlacePredictions({ input: e.target.value })

                      setGoogleSearchValue(e.target.value)
                    }}
                    onHandleSelect={async (selectedItem: iItemType) => {
                      console.log(selectedItem)
                      const getData = await axios.get(
                        `${process.env.VITE_SERVER_URL}/customer/google-place-detail?place_id=${selectedItem.key}`
                      )

                      console.log(getData)
                      const address = new GoogleAddressParser(
                        getData.data
                      ).result()
                      console.log(address)
                      formik.setValues({
                        ...formik.values,
                        address_line_1: address.street_name,
                        address_line_2: address.street_number,
                        city: address.city,
                        country: address.country,
                        post_code: address.postal_code,
                      })
                    }}
                    onHandleAddNew={() => {
                      // setOpenCustomerDialog(true)
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="text-md text-rose-500">Or</span>
                <br />
                <span className="text-md text-rose-500">Manually enter</span>
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="address_line_1"
                  >
                    Address line 1
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
                    Address line 2
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
                    City
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
                    Country
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
                  {formik.touched.country && Boolean(formik.errors.country) && (
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
                    Post code
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
                        {formik.touched.post_code && formik.errors.post_code}
                      </span>
                    )}
                </div>
              </div>

              {/* <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="channel"
                >
                  Channel
                </label>
                <input
                  id="channel"
                  className="form-input w-full px-2 py-1"
                  type="text"
                  value={formik.values.channel}
                  onChange={formik.handleChange}
                />
                {formik.touched.channel && Boolean(formik.errors.channel) && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {formik.touched.channel && formik.errors.channel}
                  </span>
                )}
              </div> */}

              <>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="tags"
                  >
                    Customer Tags
                  </label>
                  <input
                    id="tags"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={tagsInput}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        setCustomerTags((elem) => [...elem, tagsInput])
                        setTagsInput("")
                      }
                    }}
                    onChange={(e) => {
                      setTagsInput(e.target.value)
                    }}
                  />
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Please press 'enter' after typing to add customer tags
                  </span>
                  {formik.touched.tags && Boolean(formik.errors.tags) && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formik.touched.tags && formik.errors.tags}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-4 ">
                  {customerTags.map((elem, index) => {
                    return (
                      <span
                        key={`${makeid(4)}-customer-tag-${index}`}
                        className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                      >
                        {elem}
                        <button
                          className="bg-transparent hover focus:outline-none"
                          onClick={() => {
                            const tempArr = [...customerTags]
                            const index = tempArr.indexOf(elem)
                            if (index > -1) {
                              // only splice array when item is found
                              tempArr.splice(index, 1) // 2nd parameter means remove one item only
                            }
                            setCustomerTags([...tempArr])
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
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                  type="submit"
                >
                  {editMode ? `Update Customer` : `Save New Customer`}
                </button>
              )}
            </div>
          </div>
        </form>
      </ModalBasic>
    </>
  )
}

export default AddUpdateCustomerForm
