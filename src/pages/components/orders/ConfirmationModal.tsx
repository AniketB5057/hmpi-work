import React, { useEffect } from "react"
import ModalBlank from "../../../components/ModalBlank"
import validator from "validator"
import { useAuth } from "../../../contexts/AuthProvider"
export interface ConfirmationModalForBookingFormProps {
  id: string
  open: boolean
  setOpenModal: (val: boolean) => void
  onConfirm: any
  processing: boolean
  customer_phone_number?: string
  customer_email?: string
  custom_email: string
  customer_country_code?: string
  send_text: boolean
  send_email: boolean
  send_custom_email: boolean
  onChangeNotificationValues: (key: string, val: any) => void
}
function ConfirmationModalForBookingForm(
  props: ConfirmationModalForBookingFormProps
) {
  const {
    id,
    open,
    setOpenModal,
    onConfirm,
    processing,
    custom_email,
    customer_email,
    customer_phone_number,
    customer_country_code,
    send_custom_email,
    send_email,
    send_text,
    onChangeNotificationValues,
  } = props

  const { userInfo } = useAuth()

  const canWeProceed = () => {
    return (
      ((send_custom_email
        ? validator.isEmail(custom_email ? custom_email : ``)
        : true) &&
        (send_custom_email || send_email || send_text)) ||
      (!send_custom_email && !send_email && !send_text)
    )
  }
  return (
    <>
      {/* Start */}
      <ModalBlank
        id={id}
        modalOpen={open}
        setModalOpen={(val: boolean) => {
          setOpenModal(val)
        }}
      >
        <div className="p-2 space-x-4">
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">
                Please select notification options
              </div>
            </div>
            <div className="full-w">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  disabled={
                    !validator.isMobilePhone(
                      customer_phone_number ? customer_phone_number : ``
                    ) ||
                    (userInfo && userInfo.availableCredits <= 0)
                  }
                  checked={send_text}
                  onChange={(e) => {
                    // setShowBookingDetals(e.target.checked)
                    onChangeNotificationValues("send_text", e.target.checked)
                  }}
                />
                <span className="text-sm ml-2">
                  Notify via text at:{" "}
                  <b>
                    {customer_country_code ? `${customer_country_code}-` : ``}
                    {customer_phone_number}
                  </b>
                  {userInfo && userInfo.availableCredits <= 0 && (
                    <span className="text-rose-500">{` (Not enough credits.)`}</span>
                  )}
                </span>
              </label>
            </div>
            <div className="full-w ">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  checked={send_email}
                  disabled={
                    !validator.isEmail(customer_email ? customer_email : ``)
                  }
                  onChange={(e) => {
                    onChangeNotificationValues("send_email", e.target.checked)
                  }}
                />
                <span className="text-sm ml-2">
                  Notify via email at: <b>{customer_email}</b>
                </span>
              </label>
            </div>

            <div className="full-w">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={send_custom_email}
                  onChange={(e) => {
                    // setShowBookingDetals(e.target.checked)
                    onChangeNotificationValues(
                      "send_custom_email",
                      e.target.checked
                    )
                  }}
                />
                <span className="text-sm ml-2">
                  Notify custom email address:
                </span>
              </label>
            </div>
            <div className="full-w">
              {send_custom_email && (
                <div className="relative">
                  <span className="text-sm text-black-400 font-medium px-3">
                    Custom Email
                  </span>
                  <input
                    className="form-input pl-2"
                    value={custom_email}
                    onChange={(e) => {
                      onChangeNotificationValues("custom_email", e.target.value)
                    }}
                    type="text"
                  />
                  {!validator.isEmail(custom_email) && (
                    <span className="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {`Invalid Email`}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  setOpenModal(false)
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
                  onClick={onConfirm}
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  disabled={!canWeProceed()}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* End */}
    </>
  )
}

export default ConfirmationModalForBookingForm
