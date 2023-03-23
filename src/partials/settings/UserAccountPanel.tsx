import React, { useEffect, useRef, useState } from "react"
import ModalBasic from "../../components/ModalBasic"
import { useAuth } from "../../contexts/AuthProvider"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { useUpdatePassword } from "../../hooks/auth/useUpdatePassword"
import {
  getPresignURLToUpload,
  singleImageUpload,
} from "../../hooks/useFileUploadToS3"
import { updateUser } from "../../hooks/auth/useUpdateUserInfo"
import Image from "../../images/user-avatar-80.png"
import { makeid } from "../../utils/commonFunctions"
import { getItem } from "../../utils/localStorage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import LoadingSpinner from "../../components/LoadingSpinner"

function UserAccountPanel() {
  const { userInfo, handleRefetch } = useAuth()
  const [sync, setSync] = useState(false)
  const inputRef = useRef<any>(null)
  const [fileOrimageUploading, setFileOrImageUploading] = useState(false)

  const snackbar = useSnackbar()
  const { isUpdating, updatePassword } = useUpdatePassword()
  const [isUpdatingUserInfo, setIsUpdatingUserInfo] = useState(false)
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false)
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)
  const [formData, setFormData] = useState<{
    firstName: string
    lastName: string
    user_profile_logo: string
  }>({
    firstName: "",
    lastName: "",
    user_profile_logo: "",
  })
  const [passwordChangeForm, setPasswordChangeForm] = useState<{
    oldPassword: string
    newPassword: string
    repeatPassword: string
  }>({
    oldPassword: "",

    newPassword: "",
    repeatPassword: "",
  })

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
        user_profile_logo: getImageURLtoUpload.downloadURL,
      })
      setFormData({
        ...formData,
        user_profile_logo: getImageURLtoUpload.downloadURL,
      })
      handleRefetch()
      snackbar.success("Uploaded File!")
    } catch (e) {
      console.log(e)
      snackbar.error("failed to upload!")
    }

    setFileOrImageUploading(false)
  }
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setFormData({
        firstName: userInfo && userInfo.firstName ? userInfo.firstName : ``,
        lastName: userInfo && userInfo.lastName ? userInfo.lastName : ``,
        user_profile_logo:
          userInfo && userInfo.user_profile_logo
            ? userInfo.user_profile_logo
            : ``,
      })
    }
    return () => {
      mounted = false
    }
  }, [userInfo])
  useEffect(() => {
    let mounted = true
    if (mounted) {
      setIsInvalidPassword(
        passwordChangeForm.newPassword !== passwordChangeForm.repeatPassword
      )
    }
    return () => {
      mounted = false
    }
  }, [passwordChangeForm])
  const handleSubmitPasswordChangeForm = async () => {
    try {
      const result = await updatePassword({
        oldPassword: passwordChangeForm.oldPassword,
        newPassword: passwordChangeForm.newPassword,
      })
      if (result) {
        snackbar.success("Password Updated!")
        setOpenPasswordChangeModal(false)
      }
    } catch (e) {
      console.log(e)
      snackbar.error("Failed to update pw")
    }
  }
  return (
    <div className="grow">
      <ModalBasic
        modalOpen={openPasswordChangeModal}
        setModalOpen={(val: boolean) => {
          setOpenPasswordChangeModal(val)
        }}
        title="Password Change"
        id={`${makeid(4)}-pw-change-modal`}
      >
        <div className="px-5 py-4">
          {isInvalidPassword && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Password do not match
            </span>
          )}
          <div className="full-w">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Old password
            </label>
            <input
              id="old_password"
              className="form-input w-full"
              type="password"
              value={passwordChangeForm.oldPassword}
              onChange={(e) => {
                setPasswordChangeForm({
                  ...passwordChangeForm,
                  oldPassword: e.target.value,
                })
              }}
            />
          </div>
          <div className="full-w">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              New Password
            </label>
            <input
              id="new_password"
              className="form-input w-full"
              type="password"
              value={passwordChangeForm.newPassword}
              onChange={(e) => {
                setPasswordChangeForm({
                  ...passwordChangeForm,
                  newPassword: e.target.value,
                })
              }}
            />
          </div>
          <div className="full-w">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Repeat New Password
            </label>
            <input
              id="repeat_password"
              className="form-input w-full"
              type="password"
              value={passwordChangeForm.repeatPassword}
              onChange={(e) => {
                setPasswordChangeForm({
                  ...passwordChangeForm,
                  repeatPassword: e.target.value,
                })
              }}
            />
          </div>
          <footer>
            <div className="flex flex-col px-6 py-5 border-t border-slate-200">
              <div className="flex self-end">
                <button
                  className="btn border-slate-200 hover:border-slate-300 text-slate-600"
                  onClick={(e) => {
                    e.preventDefault()
                    setPasswordChangeForm({
                      oldPassword: "",

                      newPassword: "",
                      repeatPassword: "",
                    })
                    setOpenPasswordChangeModal(false)
                  }}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                {isUpdating ? (
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
                    onClick={handleSubmitPasswordChangeForm}
                    disabled={isUpdating}
                  >
                    Update Password
                  </button>
                )}
              </div>
            </div>
          </footer>
        </div>
      </ModalBasic>
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">
          My Account Info
        </h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              {fileOrimageUploading && <LoadingSpinner />}
              {formData && formData.user_profile_logo ? (
                <img
                  className="w-20 h-20 rounded-full"
                  src={formData.user_profile_logo}
                  width="80"
                  height="80"
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
            My Profile
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
                First Name
              </label>
              <input
                id="last_name"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                id="last_name"
                className="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }}
              />
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
        <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Password
          </h2>
          <div className="text-sm">You can change password below.</div>
          <div className="mt-5">
            <button
              className="btn border-slate-200 shadow-sm text-indigo-500"
              onClick={() => {
                setOpenPasswordChangeModal(true)
              }}
            >
              Set New Password
            </button>
          </div>
        </section>
        {/* Smart Sync */}
        {/* <section>
          <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Smart Sync update for Mac
          </h2>
          <div className="text-sm">
            With this update, online-only files will no longer appear to take up
            hard drive space.
          </div>
          <div className="flex items-center mt-5">
            <div className="form-switch">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={sync}
                onChange={() => setSync(!sync)}
              />
              <label className="bg-slate-400" htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">
              {sync ? "On" : "Off"}
            </div>
          </div>
        </section> */}
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

export default UserAccountPanel
