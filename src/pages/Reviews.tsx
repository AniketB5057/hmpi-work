import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import LoadingSpinner from "../components/LoadingSpinner"
import { axios_instance } from "../config"
import { useAuth } from "../contexts/AuthProvider"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { updateUser } from "../hooks/auth/useUpdateUserInfo"
import { useSearchCustomer } from "../hooks/customers/useCustomer"
import { userActivityData } from "../hooks/dashboard/useDashboardData"
import { useReviewActivityData } from "../hooks/reviews/useReview"
import { Customer } from "../types/customer"
import { getItem } from "../utils/localStorage"
import SearchBar, { iItemType } from "./components/common/SearchBar"
import ReviewsActivityCard from "./components/reviews/ReviewsActivity"
function Reviews() {
  const activityDataHook = userActivityData()
  const [selectedCustomer, setSelectedCustomer] =
    useState<Partial<Customer> | null>(null)
  const [formattedDataForCustomerSearch, setFormattedDataForCustomerSearch] =
    useState<iItemType[]>([])
  const { userInfo } = useAuth()
  const [searchValForCustomer, setSearchValForCustomer] = useState("")
  const [searchBoxCustomer, setSearchBoxCustomer] = useState("")

  const reviewDataHook = useReviewActivityData()
  const searchCustomerHook = useSearchCustomer(0, 10, searchValForCustomer)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const snackbar = useSnackbar()
  const [fullName, setFullName] = useState("")
  const [googleBusinessProfile, setGoogleBusinessProfile] = useState("")
  const [smsData, setSMSdata] = useState("")
  const [emailData, setEmailData] = useState("")
  const [sendSms, setSendSms] = useState(false)
  const [sendEmail, setSendEmail] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const sendReviewRequest = async () => {
    try {
      setIsFormSubmitting(true)
      const token = `${getItem(`authkey`)}`
      const sendData = await axios_instance.post(
        "/review/send-request",
        {
          name: fullName,
          email: email,
          phone: phoneNumber,
          sms_content: smsData,
          email_content: emailData,
          companyName: userInfo?.companyName,
          send_sms: sendSms,
          send_email: sendEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setIsFormSubmitting(true)
    } catch (err: any) {
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
      setIsFormSubmitting(false)
    }
  }
  const saveGoogleLink = async () => {
    try {
      setIsFormSubmitting(true)
      const saveUserInfo = await updateUser(getItem("authkey"), {
        google_business_link: googleBusinessProfile,
      })
      snackbar.success("Saved google link")
      setIsFormSubmitting(false)
    } catch (err) {
      snackbar.error(`Failed to save`)
      setIsFormSubmitting(false)
    }
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (userInfo && userInfo.companyName) {
        if (userInfo.google_business_link) {
          setSMSdata(
            `Thanks for choosing ${userInfo.companyName}. Please leave us a feedback on ${userInfo.google_business_link}.`
          )
          setEmailData(`Hi,
          Thanks for choosing ${userInfo.companyName}. Please leave us a feedback on ${userInfo.google_business_link}.`)
        } else {
          setSMSdata(
            `Thanks for choosing ${userInfo.companyName}. Please leave us a feedback.`
          )
          setEmailData(`Hi,
          Thanks for choosing ${userInfo.companyName}. Please leave us a feedback.`)
        }
      } else {
        setSMSdata(
          `Thanks for choosing our service. Please leave us a feedback.`
        )
        setEmailData(`Hi,
        Thanks for choosing our service. Please leave us a feedback.`)
      }
    }

    return () => {
      mounted = false
    }
  }, [userInfo])

  useEffect(() => {
    if (userInfo) {
      setGoogleBusinessProfile(userInfo.google_business_link)
    }
  }, [userInfo])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setSearchValForCustomer(searchBoxCustomer)
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchBoxCustomer])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (searchCustomerHook.data && searchCustomerHook.data.data) {
        setFormattedDataForCustomerSearch(
          searchCustomerHook.data.data.map((elem: Customer) => {
            return {
              key: elem.id,
              sub_title: `${elem.email}`,
              title: `${elem.first_name} ${elem.last_name}`,
            }
          })
        )
      }
    }
    return () => {
      mounted = false
    }
  }, [searchCustomerHook.data])

  return (
    <div className="intro-js-dashboard px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Get Reviews
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Datepicker built with flatpickr */}
              {/* <Datepicker align="right" /> */}
            </div>
          </div>

          {/* Cards */}

          {/* <div className="grid grid-cols-12 gap-6">
          
            {analyticsDataHook.isFetching ? (
              <LoadingSpinner />
            ) : (
              analyticsDataHook.data && (
                <OverviewAnalyticsCard data={analyticsDataHook.data} />
              )
            )}

           
          </div> */}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-2">
            {!isMobile && (
              <div>
                <>
                  <div>
                    <SearchBar
                      label={"Find/Add Customer"}
                      id="Search-box-find-customer"
                      data={formattedDataForCustomerSearch}
                      value={searchBoxCustomer}
                      isLoading={searchCustomerHook.isFetching}
                      showError={false}
                      // addNewButtonText="customer"
                      // showAddNewButton={true}
                      onChange={(e: any) => {
                        setSearchBoxCustomer(e.target.value)
                      }}
                      onHandleSelect={(selectedCustomer: any) => {
                        // setCustomerUpdated()
                        if (
                          searchCustomerHook.data &&
                          searchCustomerHook.data.data &&
                          searchCustomerHook.data.data.length > 0
                        ) {
                          const findItem = searchCustomerHook.data.data.find(
                            (elem) => elem.id === selectedCustomer.key
                          )
                          if (findItem) {
                            setSelectedCustomer(findItem)
                            setPhoneNumber(
                              `${findItem.mobile_country_code}-${findItem.phone_number}`
                            )
                            setEmail(findItem.email)
                            setFullName(
                              `${findItem.first_name} ${findItem.last_name}`
                            )
                          }
                        }
                      }}
                      onHandleAddNew={() => {
                        alert("Selected customer")
                      }}
                    />
                  </div>
                  <div className="text-center">or</div>
                  <div className="mt-2">
                    <div className="w-full rounded-lg shadow-sm  p-2 bg-white gap-4 flex flex-col">
                      <div className="w-full border-b border-gray-300 flex items-center justify-between p-2">
                        <div className="text-textGray font-semibold">
                          Fill Customer Detail
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="default"
                        >
                          Full Name
                        </label>
                        <input
                          className="form-input w-full"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value)
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="default"
                        >
                          Email
                        </label>
                        <input
                          className="form-input w-full"
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="default"
                        >
                          Phone{" "}
                          <span className="text-rose-500">{`(Include country code with number)`}</span>
                        </label>
                        <input
                          className="form-input w-full"
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => {
                            const regexCheck = /^\+[1-9]{1}[0-9]{3,14}$/
                            regexCheck.test(e.target.value)
                            setPhoneNumber(e.target.value)
                          }}
                        />
                      </div>

                      <div
                        className="flex justify-between items-center"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-5 h-5 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                        </svg>
                        <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                          <div className="h-px w-full border-t border-dashed border-slate-200" />
                        </div>
                        <svg
                          className="w-5 h-5 fill-white rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                        </svg>
                      </div>
                      <div className="ml-2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="reminder_checkbox"
                        >
                          Send SMS
                          <input
                            className="form-checkbox ml-2"
                            type="checkbox"
                            checked={sendSms}
                            onChange={(e) => {
                              setSendSms(e.target.checked)
                            }}
                          />
                        </label>
                      </div>
                      {sendSms && (
                        <div>
                          <div className="w-full mt-2 border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                            <div className="text-textPrimary  text-[14px] font-[500]">
                              SMS Message
                              <span className="ml-2 text-xs text-rose-500">
                                {`(Change your message below.)`}
                              </span>
                            </div>
                            <textarea
                              className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                              rows={4}
                              value={smsData}
                              onChange={(e) => {
                                setSMSdata(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="ml-2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="reminder_checkbox"
                        >
                          Send Email
                          <input
                            className="form-checkbox ml-2"
                            type="checkbox"
                            checked={sendEmail}
                            onChange={(e) => {
                              setSendEmail(e.target.checked)
                            }}
                          />
                        </label>
                      </div>
                      {sendEmail && (
                        <div>
                          <div className="w-full mt-2 border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                            <div className="text-textPrimary  text-[14px] font-[500]">
                              Email Message
                              <span className="ml-2 text-xs text-rose-500">
                                {`(Change your message below.)`}
                              </span>
                            </div>
                            <textarea
                              className="outline-none rounded  text-[14px] font-[400] bg-myBgGray text-textGray text-lg p-2 border-none"
                              rows={4}
                              value={emailData}
                              onChange={(e) => {
                                setEmailData(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <button
                        className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        onClick={(e) => {
                          e.preventDefault()
                          sendReviewRequest()
                        }}
                        disabled={
                          !(
                            fullName.length > 0 &&
                            email.length > 0 &&
                            phoneNumber.length > 0 &&
                            (sendSms || sendEmail)
                          ) || isFormSubmitting
                        }
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              </div>
            )}

            <div>
              {activityDataHook.isFetching ? (
                <LoadingSpinner />
              ) : (
                activityDataHook.data && (
                  <>
                    <div className="w-full rounded-lg shadow-sm  p-2 bg-white gap-4 flex flex-col">
                      <div>
                        <div className="w-full mt-2 border border-gray-300 rounded-md p-2 flex flex-col gap-2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="default"
                          >
                            Google Business Profile{" "}
                            <span
                              className="ml-2 text-xs text-indigo-500 hover:underline cursor-pointer"
                              onClick={() => {
                                window.open(
                                  "https://support.google.com/business/answer/3474122?hl=en",
                                  "_blank"
                                )
                              }}
                            >
                              {`(Click here to open google business)`}
                            </span>
                            <span className="ml-2 text-xs text-rose-500">
                              {`(Save link for future reference.)`}
                            </span>
                          </label>
                          <input
                            className="form-input w-full"
                            type="text"
                            value={googleBusinessProfile}
                            onChange={(e) => {
                              setGoogleBusinessProfile(e.target.value)
                            }}
                          />
                          <button
                            className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                            onClick={(e) => {
                              e.preventDefault()
                              saveGoogleLink()
                            }}
                            disabled={isFormSubmitting}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      {reviewDataHook.isFetching ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          {reviewDataHook.data && (
                            <ReviewsActivityCard
                              activityList={reviewDataHook.data}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Reviews
