import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "../contexts/AuthProvider"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { updateUser } from "../hooks/auth/useUpdateUserInfo"
import { getStripeLinkForOnboarding } from "../hooks/useStripeBilling"
import OnboardingDecoration from "../images/auth-decoration.png"
import OnboardingImage from "../images/signin-image.png"
import LogoImage from "../images/service_buddy_landing_page_logo.png"
import {
  availableCountriesList,
  formatPhoneNumber,
  getAvailableCountryCodesPhoneList,
} from "../utils/commonFunctions"
import { getItem } from "../utils/localStorage"
import validator from "validator"
export interface formData {
  experienceLevel: string
  industry: string
  companyName: string
  companyEmail: string
  companyPhone: string
  addressInfo: {
    street_address: string
    country: string
    city: string
    post_code: string
  }
}
export interface formDataErrors {
  experienceLevel: boolean
  companyName: boolean
  industry: boolean
  companyEmail: boolean
  companyPhone: boolean
  addressInfo: {
    street_address: boolean
    country: boolean
    city: boolean
    post_code: boolean
  }
}
const availableIndustry = [
  "Home Service",
  "Residential/Commercial Cleaning",

  "HVAC",
  "Plumbing",
  "Freelance",
  "Electrcians",
  "Construction",
  "Other Businesses",
]

function Onboarding() {
  const snackbar = useSnackbar()

  const { search } = useLocation()
  const navigate = useNavigate()
  const { userInfo } = useAuth()
  const [countryCodeForMobile, setCountryCodeForMobile] =
    useState("United States")
  const [isLoading, setIsLoading] = useState(false)

  const minStep = 1
  const maxStep = 4
  const [steps, setSteps] = useState(1)

  const [isSubmittingFormData, setIsSubmittingFormData] = useState(false)
  const [showError, setShowError] = useState<formDataErrors>({
    experienceLevel: false,
    industry: false,
    companyName: false,
    companyEmail: false,
    companyPhone: false,
    addressInfo: {
      city: false,
      street_address: false,
      country: false,
      post_code: false,
    },
  })
  const [formData, setFormData] = useState<formData>({
    experienceLevel: "beginner",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    industry: "Home Service",
    addressInfo: {
      city: "",
      street_address: "",
      country: "United States",
      post_code: "",
    },
  })

  useEffect(() => {
    setShowError({
      experienceLevel: false,
      industry: false,
      companyName: !(formData.companyName && formData.companyName.length > 0),
      companyEmail: !validator.isEmail(formData.companyEmail),
      companyPhone: !validator.isNumeric(formData.companyPhone),
      addressInfo: {
        city: !(
          formData.addressInfo.city && formData.addressInfo.city.length > 0
        ),
        street_address: !(
          formData.addressInfo.street_address &&
          formData.addressInfo.street_address.length > 0
        ),
        country: false,
        post_code: !(
          formData.addressInfo.post_code &&
          formData.addressInfo.post_code.length > 0
        ),
      },
    })
  }, [formData])

  const getOnboardToStripeLink = async () => {
    try {
      setIsLoading(true)
      const getLink = await getStripeLinkForOnboarding(getItem("authkey"))
      snackbar.success("Redirecting you to payment")
      window.location.href = `${getLink}`
    } catch (err: any) {
      console.log(err)
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message)
      } else {
        snackbar.error(`Something went wrong.`)
      }
    }
  }

  const handlePrevStep = () => {
    if (steps > minStep) {
      setSteps((curr) => curr - 1)
    }
  }

  const handleNextStep = async () => {
    if (steps >= minStep && steps < maxStep) {
      if (steps === 2) {
        try {
          setIsSubmittingFormData(true)
          const findItem = getAvailableCountryCodesPhoneList.find(
            (elem) => elem.name === countryCodeForMobile
          )
          let phoneCodeVal = ``
          if (findItem) {
            phoneCodeVal = `+${findItem.phoneCode}-`
          }
          let updatedFormData = {
            ...formData,
            companyPhone: `${phoneCodeVal}${formData.companyPhone}`,
            invoiceSettings: {
              companyName: formData.companyName,
              companyEmail: formData.companyEmail,
              companyPhone: formData.companyPhone,
              addressInfo: formData.addressInfo,
              vatInfo: "",
              footer: "All invoices must be paid before due date.",
              prefix: "",
              showCompanyLogo: false,
              showVatInfo: false,
              showDueDate: true,
              showPaymentLink: false,
              textTemplate: `Thanks for choosing ${formData.companyName}. Please visit your invoice at: {{invoice_ref_id}}`,
              emailTemplate: `Hi {{customer_first_name}},
              Thanks for choosing ${formData.companyName}. Please visit your invoice at: {{invoice_ref_id}}.
              Best Regards`,
            },
            estimateSettings: {
              companyName: formData.companyName,
              companyEmail: formData.companyEmail,
              companyPhone: formData.companyPhone,
              addressInfo: formData.addressInfo,
              vatInfo: "",
              footer: "",
              prefix: "",
              showCompanyLogo: false,
              showVatInfo: false,
              showValidityDate: true,
              textTemplate: `Thanks for choosing ${formData.companyName}. Please visit your estimate at: {{estimate_ref_id}}`,
              emailTemplate: `Hi {{customer_first_name}},
              Thanks for choosing ${formData.companyName}. Please visit your estimate at: {{estimate_ref_id}}.
              Best Regards`,
            },
          }
          const saveUserInfo = await updateUser(
            getItem("authkey"),
            updatedFormData
          )
          setIsSubmittingFormData(false)
          setSteps((curr) => curr + 1)
        } catch (err: any) {
          console.log(err)
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          ) {
            snackbar.error(err.response.data.message)
          } else {
            snackbar.error(`Something went wrong.`)
          }
          setIsSubmittingFormData(false)
          console.log(err)
        }
      } else {
        setSteps((curr) => curr + 1)
      }
    }
  }
  const currentDivForStep = () => {
    if (steps === 1) {
      return (
        <main className="bg-white">
          <div className="relative flex">
            {/* Content */}
            <div className="w-full md:w-1/2">
              <div className="min-h-screen h-full flex flex-col after:flex-1">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link className="block" to="/">
                      <img src={LogoImage} height={150} width={150} />
                    </Link>
                    {/* <div className="text-sm">
                              Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Sign In</Link>
                            </div> */}
                  </div>

                  {/* Progress bar */}
                  <div className="px-4 pt-12 pb-8">
                    <div className="max-w-md mx-auto w-full">
                      <div className="relative">
                        <div
                          className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                          aria-hidden="true"
                        ></div>
                        <ul className="relative flex justify-between w-full">
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              1
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              2
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              3
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              4
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-8">
                  <div className="max-w-md mx-auto">
                    <h1 className="text-3xl text-slate-800 font-bold mb-6">
                      Customize Your Experience
                    </h1>
                    {/* Form */}
                    <div className="space-y-3 mb-8">
                      <div>
                        {" "}
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="companyPhone"
                        >
                          Your Industry <span className="text-rose-500">*</span>
                        </label>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <select
                            id="country_code_for_mobile"
                            className="form-select w-full"
                            value={formData.industry}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                industry: e.target.value,
                              })
                            }}
                          >
                            {availableIndustry.map((elem) => {
                              return (
                                <option key={elem} value={`${elem}`}>
                                  {elem}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="companyPhone"
                        >
                          Your Experience Level{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                      </div>
                      <label className="relative block cursor-pointer">
                        <input
                          type="radio"
                          name="radio-buttons"
                          className="peer sr-only"
                          defaultChecked
                        />
                        <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                          <svg
                            className="w-6 h-6 shrink-0 fill-current mr-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="text-indigo-500"
                              d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                            />
                            <path
                              className="text-indigo-300"
                              d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
                            />
                            <path
                              className="text-indigo-200"
                              d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z"
                            />
                          </svg>
                          <span>
                            I use lot of different apps. I am an expert.
                          </span>
                        </div>
                        <div
                          className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                          aria-hidden="true"
                        ></div>
                      </label>
                      <label className="relative block cursor-pointer">
                        <input
                          type="radio"
                          name="radio-buttons"
                          className="peer sr-only"
                        />
                        <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                          <svg
                            className="w-6 h-6 shrink-0 fill-current mr-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="text-indigo-500"
                              d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                            />
                            <path
                              className="text-indigo-300"
                              d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z"
                            />
                          </svg>
                          <span>I need help figuring things out.</span>
                        </div>
                        <div
                          className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                          aria-hidden="true"
                        ></div>
                      </label>
                      <label className="relative block cursor-pointer">
                        <input
                          type="radio"
                          name="radio-buttons"
                          className="peer sr-only"
                        />
                        <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                          <svg
                            className="w-6 h-6 shrink-0 fill-current mr-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="text-indigo-500"
                              d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z"
                            />
                          </svg>
                          <span>What is internet ?</span>
                        </div>
                        <div
                          className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                          aria-hidden="true"
                        ></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto"
                        onClick={handleNextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
              aria-hidden="true"
            >
              <img
                className="object-cover object-center w-full h-full"
                src={OnboardingImage}
                width="760"
                height="1024"
                alt="Onboarding"
              />
              <img
                className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
                src={OnboardingDecoration}
                width="218"
                height="224"
                alt="Authentication decoration"
              />
            </div>
          </div>
        </main>
      )
    }
    if (steps === 2) {
      return (
        <main className="bg-white">
          <div className="relative flex">
            {/* Content */}
            <div className="w-full md:w-1/2">
              <div className="min-h-screen h-full flex flex-col after:flex-1">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <span className="block">
                      <svg width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                          <linearGradient
                            x1="28.538%"
                            y1="20.229%"
                            x2="100%"
                            y2="108.156%"
                            id="logo-a"
                          >
                            <stop
                              stopColor="#A5B4FC"
                              stopOpacity="0"
                              offset="0%"
                            />
                            <stop stopColor="#A5B4FC" offset="100%" />
                          </linearGradient>
                          <linearGradient
                            x1="88.638%"
                            y1="29.267%"
                            x2="22.42%"
                            y2="100%"
                            id="logo-b"
                          >
                            <stop
                              stopColor="#38BDF8"
                              stopOpacity="0"
                              offset="0%"
                            />
                            <stop stopColor="#38BDF8" offset="100%" />
                          </linearGradient>
                        </defs>
                        <rect fill="#6366F1" width="32" height="32" rx="16" />
                        <path
                          d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                          fill="#4F46E5"
                        />
                        <path
                          d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                          fill="url(#logo-a)"
                        />
                        <path
                          d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                          fill="url(#logo-b)"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="px-4 pt-12 pb-8">
                    <div className="max-w-md mx-auto w-full">
                      <div className="relative">
                        <div
                          className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                          aria-hidden="true"
                        ></div>
                        <ul className="relative flex justify-between w-full">
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              1
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              2
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              3
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              4
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-8">
                  <div className="max-w-md mx-auto">
                    <h1 className="text-3xl text-slate-800 font-bold mb-6">
                      Tell us about your company
                    </h1>
                    {/* Form */}

                    <div>
                      <div className="max-w-md mx-auto">
                        {/* htmlForm */}
                        <form>
                          <div className="space-y-4 mb-8">
                            {/* Company Name */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="company-name"
                              >
                                Company Name{" "}
                                <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id="company-name"
                                className="form-input w-full"
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    companyName: e.target.value,
                                  })
                                }}
                              />
                              {showError.companyName && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                  Company Name Required
                                </span>
                              )}
                            </div>
                            {/* Business Email and Business Phone */}
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="companyEmail"
                                >
                                  Business Email{" "}
                                  <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  id="companyEmail"
                                  className="form-input w-full"
                                  type="text"
                                  value={formData.companyEmail}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      companyEmail: e.target.value,
                                    })
                                  }}
                                />
                                {showError.companyEmail && (
                                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    Email Required
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              {" "}
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="companyPhone"
                              >
                                Business Phone{" "}
                                <span className="text-rose-500">*</span>
                              </label>
                            </div>
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <select
                                  id="country_code_for_mobile"
                                  className="form-select w-full"
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
                                        <option
                                          key={elem.name}
                                          value={`${elem.name}`}
                                        >
                                          {`${elem.name} (+${elem.phoneCode})`}
                                        </option>
                                      )
                                    }
                                  )}
                                </select>
                              </div>
                              <div className="flex-1">
                                <input
                                  id="companyPhone"
                                  className="form-input w-full"
                                  type="text"
                                  value={formData.companyPhone}
                                  onChange={(e) => {
                                    let tempVal = e.target.value
                                    tempVal = formatPhoneNumber(tempVal)
                                    setFormData({
                                      ...formData,
                                      companyPhone: tempVal,
                                    })
                                  }}
                                />{" "}
                                {showError.companyPhone && (
                                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    Business Phone Required
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Street Address */}
                            <div>
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="street"
                              >
                                Street Address{" "}
                                <span className="text-rose-500">*</span>
                              </label>
                              <input
                                id="street"
                                className="form-input w-full"
                                type="text"
                                value={formData.addressInfo.street_address}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    addressInfo: {
                                      ...formData.addressInfo,
                                      street_address: e.target.value,
                                    },
                                  })
                                }}
                              />
                              {showError.addressInfo.street_address && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                  Street address Required
                                </span>
                              )}
                            </div>

                            {/* City and Postal Code */}
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="city"
                                >
                                  City <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  id="city"
                                  className="form-input w-full"
                                  type="text"
                                  value={formData.addressInfo.city}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      addressInfo: {
                                        ...formData.addressInfo,
                                        city: e.target.value,
                                      },
                                    })
                                  }}
                                />
                                {showError.addressInfo.city && (
                                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    City Required
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="postal-code"
                                >
                                  Postal Code{" "}
                                  <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  id="postal-code"
                                  className="form-input w-full"
                                  type="text"
                                  value={formData.addressInfo.post_code}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      addressInfo: {
                                        ...formData.addressInfo,
                                        post_code: e.target.value,
                                      },
                                    })
                                  }}
                                />{" "}
                                {showError.addressInfo.post_code && (
                                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                    Postcode Required
                                  </span>
                                )}
                              </div>
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
                                className="form-select w-full"
                                value={formData.addressInfo.country}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    addressInfo: {
                                      ...formData.addressInfo,
                                      country: e.target.value,
                                    },
                                  })
                                }}
                              >
                                {availableCountriesList.map((elem: string) => {
                                  return (
                                    <option key={elem} value={elem}>
                                      {elem}
                                    </option>
                                  )
                                })}
                              </select>
                              {showError.addressInfo.country && (
                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                  Country Required
                                </span>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-6 mb-8">
                      <div>
                        <div className="font-medium text-slate-800 text-sm mb-1">
                          💸 Ask onboarding specialist to contact me.
                        </div>
                        <div className="text-xs">
                          Setup a meeting with our specialist to migrate data &
                          learn all features of Service Buddy.
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="form-switch">
                          <input
                            type="checkbox"
                            id="switch"
                            className="sr-only"
                            defaultChecked
                          />
                          <label className="bg-slate-400" htmlFor="switch">
                            <span
                              className="bg-white shadow-sm"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Switch label</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="text-sm underline hover:no-underline"
                        onClick={handlePrevStep}
                      >
                        Back
                      </button>
                      {isSubmittingFormData ? (
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
                        <>
                          <button
                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                            onClick={handleNextStep}
                            disabled={
                              !(
                                formData.companyName &&
                                formData.companyName.length > 0 &&
                                formData.addressInfo.city &&
                                formData.addressInfo.city.length > 0 &&
                                formData.addressInfo.post_code &&
                                formData.addressInfo.post_code.length > 0 &&
                                formData.companyEmail &&
                                formData.companyEmail.length > 0 &&
                                formData.companyPhone &&
                                formData.companyPhone.length > 0 &&
                                validator.isNumeric(formData.companyPhone) &&
                                validator.isEmail(formData.companyEmail) &&
                                formData.addressInfo.street_address &&
                                formData.addressInfo.street_address.length > 0
                              )
                            }
                          >
                            Next
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
              aria-hidden="true"
            >
              <img
                className="object-cover object-center w-full h-full"
                src={OnboardingImage}
                width="760"
                height="1024"
                alt="Onboarding"
              />
              <img
                className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
                src={OnboardingDecoration}
                width="218"
                height="224"
                alt="Authentication decoration"
              />
            </div>
          </div>
        </main>
      )
    }
    if (steps === 3) {
      return (
        <main className="bg-white">
          <div className="relative flex">
            {/* Content */}
            <div className="w-full md:w-1/2">
              <div className="min-h-screen h-full flex flex-col after:flex-1">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <span className="block">
                      <svg width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                          <linearGradient
                            x1="28.538%"
                            y1="20.229%"
                            x2="100%"
                            y2="108.156%"
                            id="logo-a"
                          >
                            <stop
                              stopColor="#A5B4FC"
                              stopOpacity="0"
                              offset="0%"
                            />
                            <stop stopColor="#A5B4FC" offset="100%" />
                          </linearGradient>
                          <linearGradient
                            x1="88.638%"
                            y1="29.267%"
                            x2="22.42%"
                            y2="100%"
                            id="logo-b"
                          >
                            <stop
                              stopColor="#38BDF8"
                              stopOpacity="0"
                              offset="0%"
                            />
                            <stop stopColor="#38BDF8" offset="100%" />
                          </linearGradient>
                        </defs>
                        <rect fill="#6366F1" width="32" height="32" rx="16" />
                        <path
                          d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                          fill="#4F46E5"
                        />
                        <path
                          d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                          fill="url(#logo-a)"
                        />
                        <path
                          d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                          fill="url(#logo-b)"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="px-4 pt-12 pb-8">
                    <div className="max-w-md mx-auto w-full">
                      <div className="relative">
                        <div
                          className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                          aria-hidden="true"
                        ></div>
                        <ul className="relative flex justify-between w-full">
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              1
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              2
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                              disabled
                            >
                              3
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
                              disabled
                            >
                              4
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 py-2">
                  <div className="max-w-md mx-auto">
                    <div className="text-center mt-2 mb-2">
                      <div>
                        {isLoading ? (
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
                          <span
                            className="mt-4 btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault()
                              getOnboardToStripeLink()
                            }}
                          >
                            Setup Online Payments
                          </span>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = "/onboarding/complete"
                          }}
                          className="mt-4 btn border-slate-200 hover:border-slate-300 text-slate-600"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
              aria-hidden="true"
            >
              <img
                className="object-cover object-center w-full h-full"
                src={OnboardingImage}
                width="760"
                height="1024"
                alt="Onboarding"
              />
              <img
                className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
                src={OnboardingDecoration}
                width="218"
                height="224"
                alt="Authentication decoration"
              />
            </div>
          </div>
        </main>
      )
    }
  }
  return <>{currentDivForStep()}</>
}

export default Onboarding
