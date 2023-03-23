import { useFormik } from "formik"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import ModalBasic from "../../../components/ModalBasic"
import { UserRoleTypes } from "../../../types/allTypes"
import { Employee } from "../../../types/employee"
import {
  availableCountriesList,
  formatPhoneNumber,
  makeid,
} from "../../../utils/commonFunctions"
export type EmployeeDialogProps = {
  onAdd: (employee: Partial<Employee>) => void
  onClose: () => void
  onUpdate: (employee: Employee) => void
  open: boolean
  processing: boolean
  employee?: Employee
  setModalOpen: (val: boolean) => void
}

function AddUpdateEmployeeForm(props: EmployeeDialogProps) {
  const { onAdd, onClose, onUpdate, open, processing, employee, setModalOpen } =
    props

  const editMode = Boolean(employee && employee.id)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [tagsInput, setTagsInput] = useState("")
  const [employeeTags, setEmployeeTags] = useState<string[]>([])
  const [userRole, setUserRole] = useState<string>(UserRoleTypes.ADMIN_STAFF)

  const countryNames = availableCountriesList
  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (!employee) {
        setEmployeeTags([])
      }
      if (employee && employee.tags) {
        setEmployeeTags(employee.tags)
      }
    }
    return () => {
      mounted = false
    }
  }, [])
  const handleSubmit = (values: Partial<Employee>) => {
    const modifiedValue: Partial<Employee> = {
      ...values,
      tags: employeeTags,
      access_level: [userRole] as UserRoleTypes[],
      suffix: employee && employee.suffix ? employee.suffix : `MR`,
    }
    if (employee && employee.id) {
      onUpdate({ ...modifiedValue, id: employee.id } as Employee)
    } else {
      onAdd(modifiedValue)
    }
  }
  useEffect(() => {
    if (employee && employee.id) {
      formik.setValues({
        ...employee,
      })
      if (employee.access_level && employee.access_level.length > 0) {
        setUserRole(employee.access_level[0])
      }
    } else {
      formik.setValues({ ...formik.initialValues })
    }
  }, [employee])

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      first_name: employee ? employee.first_name : "",
      last_name: employee ? employee.last_name : "",
      address_line_1: employee ? employee.address_line_1 : "",
      address_line_2: employee ? employee.address_line_2 : "",
      email: employee ? employee.email : "",
      phone_number: employee ? employee.phone_number : "",
      phone_number_alt: employee ? employee.phone_number_alt : "",
      notes: employee ? employee.notes : "",
      suffix: employee ? employee.suffix : "MR",
      city: employee ? employee.city : "",
      country: employee ? employee.country : "United Kingdom",
      post_code: employee ? employee.post_code : "",
      tags: employee ? employee.tags : [],
      access_level: employee
        ? employee.access_level
        : ([userRole] as UserRoleTypes[]),
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(100, `First name should be less than 100 char`)
        .required(`First name required`),
      last_name: Yup.string()
        .max(100, `Last name should be less than 100 char`)
        .required(`Last name required`),
      email: Yup.string()
        .email()
        .max(100, `email should be less than 100 char`)
        .required(`email required`),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <>
      <ModalBasic
        id="add-update-employee-modal"
        modalOpen={open}
        setModalOpen={setModalOpen}
        title={editMode ? `Update employee` : `Add employee`}
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
                {editMode ? `Update` : `Add`} employee for your company
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="suffix"
                  >
                    Suffix <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id={`suffix`}
                    className="form-select w-full"
                    value={formik.values.suffix}
                    onChange={formik.handleChange}
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
                <div></div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="first_name"
                  >
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="first_name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.first_name &&
                    Boolean(formik.errors.first_name) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.first_name && formik.errors.first_name}
                      </span>
                    )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="last_name"
                  >
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="last_name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.last_name &&
                    Boolean(formik.errors.last_name) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.last_name && formik.errors.last_name}
                      </span>
                    )}
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
                  />
                  {formik.touched.phone_number &&
                    Boolean(formik.errors.phone_number) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.phone_number &&
                          formik.errors.phone_number}
                      </span>
                    )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="access_level_temp"
                  >
                    Access Level <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="access_level_temp"
                    className="form-input w-full px-2 py-1"
                    value={userRole}
                    onChange={(e) => {
                      setUserRole(e.target.value)
                    }}
                  >
                    {Object.values(UserRoleTypes).map((elem: string) => {
                      if (elem !== UserRoleTypes.ADMIN) {
                        return (
                          <option key={elem} value={elem}>
                            {elem}
                          </option>
                        )
                      }
                    })}
                  </select>
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
                      Employee Tags<span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="tags"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      value={tagsInput}
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          setEmployeeTags((elem) => [...elem, tagsInput])
                          setTagsInput("")
                        }
                      }}
                      onChange={(e) => {
                        setTagsInput(e.target.value)
                      }}
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Please press 'enter' after typing to add employee tags
                    </span>
                    {formik.touched.tags && Boolean(formik.errors.tags) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.tags && formik.errors.tags}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-4 ">
                    {employeeTags.map((elem, index) => {
                      return (
                        <span
                          key={`${makeid(4)}-employee-tag-${index}`}
                          className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                        >
                          {elem}
                          <button
                            className="bg-transparent hover focus:outline-none"
                            onClick={() => {
                              const tempArr = [...employeeTags]
                              const index = tempArr.indexOf(elem)
                              if (index > -1) {
                                // only splice array when item is found
                                tempArr.splice(index, 1) // 2nd parameter means remove one item only
                              }
                              setEmployeeTags([...tempArr])
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
                  {editMode ? `Update Employee` : `Create New Employee`}
                </button>
              )}
            </div>
          </div>
        </form>
      </ModalBasic>
    </>
  )
}

export default AddUpdateEmployeeForm
