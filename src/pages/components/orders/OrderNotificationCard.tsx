import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function OrderExtraDetailsCard(props: {
  openNotification: () => void
  paymentStatus: boolean
  changePaymentStatus: (val: boolean) => void
  showPaymentStatus: boolean
}) {
  return (
    <div className="w-full rounded-lg shadow-sm  bg-white gap-2 flex flex-col">
      {props.showPaymentStatus && (
        <div className="flex items-center">
          <div>
            {" "}
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="companyPhone"
            >
              Payment Status: <span className="text-rose-500">*</span>
            </label>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <select
                id="country_code_for_mobile"
                className="form-select w-full"
                value={props.paymentStatus ? "PAID" : "UNPAID"}
                onChange={(e) => {
                  props.changePaymentStatus(e.target.value === "PAID")
                }}
              >
                <option value={`PAID`}>Paid</option>
                <option value={`UNPAID`}>Un-paid</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-4 btn-sm bg-green-500 hover:bg-green-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.preventDefault()
          props.openNotification()
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        <span className="ml-2">Notify Customer</span>
      </button>
    </div>
  )
}

export default OrderExtraDetailsCard
