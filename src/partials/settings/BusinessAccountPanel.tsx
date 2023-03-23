import React, { useEffect, useRef, useState } from "react"
import ModalBasic from "../../components/ModalBasic"
import { useAuth } from "../../contexts/AuthProvider"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { useUpdatePassword } from "../../hooks/auth/useUpdatePassword"
import {
  getPresignURLToUpload,
  singleImageUpload,
} from "../../hooks/useFileUploadToS3"
import validator from "validator"
import { updateUser } from "../../hooks/auth/useUpdateUserInfo"
import Image from "../../images/user-avatar-80.png"
import {
  availableCountriesList,
  CurrencySymbolArr,
  makeid,
} from "../../utils/commonFunctions"
import { getItem } from "../../utils/localStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import momentTimzeone from "moment-timezone"
import LoadingSpinner from "../../components/LoadingSpinner"

function BusinessAccountPanel() {
  const { userInfo, handleRefetch } = useAuth()
  const [sync, setSync] = useState(false)
  const inputRef = useRef<any>(null)
  const [fileOrimageUploading, setFileOrImageUploading] = useState(false)

  const snackbar = useSnackbar()
  const [isUpdatingUserInfo, setIsUpdatingUserInfo] = useState(false)

  const [formData, setFormData] = useState<{
    companyName: string
    companyLogo: string
    companyPhone: string
    companyEmail: string
    taxRate: string
    currency: string
    timezone: string
    addressInfo: {
      street_address: string
      country: string
      city: string
      post_code: string
    }
  }>({
    companyName: "",
    companyLogo: "",
    companyPhone: "",
    companyEmail: "",
    taxRate: "20",
    currency: "USD",
    timezone: `Europe/London`,
    addressInfo: {
      city: "",
      street_address: "",
      country: "United States",
      post_code: "",
    },
  })
  const handleFileChange = async (event: any) => {
    setFileOrImageUploading(true)
    const fileObj: File = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    const objectUrl = URL.createObjectURL(fileObj)
    const getImageURLtoUpload = await getPresignURLToUpload(
      fileObj.name,
      fileObj.type
    )

    try {
      const uploadImage = await singleImageUpload(
        getImageURLtoUpload.uploadURL,
        fileObj
      )
      const saveUserInfo = await updateUser(getItem("authkey"), {
        companyLogo: getImageURLtoUpload.downloadURL,
      })
      handleRefetch()
      snackbar.success("Uploaded File!")
    } catch (e) {
      console.log(e)
      snackbar.error("failed to upload!")
    }

    setFileOrImageUploading(false)
  }

  const saveChanges = async () => {
    setIsUpdatingUserInfo(true)
    try {
      const saveUserInfo = await updateUser(getItem("authkey"), {
        ...formData,
      })
      snackbar.success("saved profile changes!")
      setIsUpdatingUserInfo(false)
    } catch (e) {
      console.log(e)
      snackbar.error("failed to save!")
      setIsUpdatingUserInfo(false)
    }
  }

  useEffect(() => {
    let mounted = true

    if (mounted) {
      setFormData({
        companyName:
          userInfo && userInfo.companyName ? userInfo.companyName : ``,
        companyLogo:
          userInfo && userInfo.companyLogo ? userInfo.companyLogo : ``,
        companyEmail:
          userInfo && userInfo.companyEmail ? userInfo.companyEmail : ``,
        companyPhone:
          userInfo && userInfo.companyPhone ? userInfo.companyPhone : ``,
        taxRate: userInfo && userInfo.taxRate ? userInfo.taxRate : ``,
        currency: userInfo && userInfo.currency ? userInfo.currency : ``,
        timezone: `${
          userInfo && userInfo.timezone
            ? userInfo.timezone
            : `${moment.tz.guess()}`
        }`,
        addressInfo:
          userInfo && userInfo.addressInfo
            ? userInfo.addressInfo
            : {
                city: "",
                street_address: "",
                country: "United States",
                post_code: "",
              },
      })
    }
    return () => {
      mounted = false
    }
  }, [userInfo])
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">
          Business Account Info
        </h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              {fileOrimageUploading && <LoadingSpinner />}
              {userInfo && userInfo.companyLogo ? (
                <img
                  className="w-20 rounded-full"
                  src={userInfo?.companyLogo}
                  alt="user profile Logo"
                />
              ) : (
                <FontAwesomeIcon icon={faImage} />
              )}
            </div>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              readOnly
              onChange={handleFileChange}
            />
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => {
                if (inputRef && inputRef.current) {
                  inputRef.current.click()
                }
              }}
            >
              Change
            </button>
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Company Profile
          </h2>
          <div className="text-sm">
            Your company's info. You can only change company name.
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="business_name"
              >
                Company Name
              </label>
              <input
                id="business_name"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    companyName: e.target.value,
                  })
                }}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="business_email"
              >
                Company Email
              </label>
              <input
                id="business_name"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.companyEmail}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    companyEmail: e.target.value,
                  })
                }}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="business_phone"
              >
                Company Phone
              </label>
              <input
                id="business_phone"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.companyPhone}
                onChange={(e) => {
                  let check = validator.isNumeric(e.target.value)
                  if (check) {
                    setFormData({
                      ...formData,
                      companyPhone: e.target.value,
                    })
                  }
                }}
              />
            </div>
          </div>
          <div>
            {/* Street Address */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="street"
              >
                Street Address <span className="text-rose-500">*</span>
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
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="postal-code"
                >
                  Postal Code <span className="text-rose-500">*</span>
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
              </div>
            </div>

            {/* Country */}
            <div className="sm:w-1/2">
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
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="taxRate"
              >
                Tax Rate
              </label>
              <input
                id="taxRate"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.taxRate}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setFormData({
                      ...formData,
                      taxRate: e.target.value,
                    })
                  } else if (validator.isNumeric(e.target.value)) {
                    setFormData({
                      ...formData,
                      taxRate: e.target.value,
                    })
                  }
                }}
              />
            </div>
            {/* Currency */}
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="currency"
              >
                Currency <span className="text-rose-500">*</span>
              </label>
              <select
                id="country"
                className="form-select w-full"
                value={formData.currency}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    currency: e.target.value,
                  })
                }}
              >
                {CurrencySymbolArr.map((elem: string) => {
                  return (
                    <option key={elem} value={elem}>
                      {elem}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="timezone"
              >
                Your Timezone <span className="text-rose-500">*</span>
              </label>
              <select
                id="timezone"
                className="form-select w-full"
                value={formData.timezone}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    timezone: e.target.value,
                  })
                }}
              >
                {momentTimzeone.tz.names().map((elem) => {
                  return (
                    <option key={elem} value={elem}>
                      {elem}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </section>
        {/* Email */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Email
          </h2>
          <div className="text-sm">
            To change email. Contact support via live chat.
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">
                Business email
              </label>
              <input
                id="business_email"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={userInfo?.email}
                disabled
              />
            </div>
            {/* <button className="btn border-slate-200 hover:border-slate-300 shadow-sm text-indigo-500">
              Change
            </button> */}
          </div>
        </section>
        {/* Password */}
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            {isUpdatingUserInfo ? (
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
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                onClick={() => {
                  saveChanges()
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BusinessAccountPanel
