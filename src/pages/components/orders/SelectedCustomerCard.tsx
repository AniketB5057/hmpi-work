import { faMap } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import EditMenu from "../../../components/DropdownEditMenu"
import Phone from "../../../images/call.svg"
import Sms from "../../../images/sms.svg"
import { Customer } from "../../../types/customer"
import OrderExtraDetailsCard from "./OrderNotificationCard"
function SelectedCustomerCard(props: {
  customer: Partial<Customer>
  handleEdit: any
  handleRemove: any
  created_at: string
  showExtraDetails: boolean
  openNotification: () => void
  paymentStatus: boolean
  changePaymentStatus: (val: boolean) => void
  cardType: string
}) {
  const { customer } = props

  let isEstimate = props.cardType.toUpperCase() === "ESTIMATE"
  let isInvoice = props.cardType.toUpperCase() === "INVOICE"
  let isBooking = props.cardType.toUpperCase() === "BOOKING"
  return (
    <div className="w-full text-[13px] font-[500]  lg:mt-24 lg:w-[20%] lg:fixed lg:top-6 lg:right-4 flex items-center justify-center">
      <div className="w-full rounded-lg shadow-sm  p-2 bg-white gap-4 flex flex-col">
        <div className="w-full border-b border-gray-300 flex items-center justify-between p-2">
          <div className="text-textGray font-semibold">Customer Detail</div>
          {/* Menu button */}
          <div className="relative mb-8">
            <EditMenu align="right" className="absolute top-0 right-0">
              <li>
                <div
                  className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3 cursor-pointer"
                  onClick={() => {
                    props.handleEdit()
                  }}
                >
                  Edit
                </div>
              </li>
              <li>
                <div
                  className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3 cursor-pointer"
                  onClick={() => {
                    props.handleRemove()
                  }}
                >
                  Remove
                </div>
              </li>
            </EditMenu>
          </div>
        </div>
        <div className="w-full lg:flex-col  items-center flex gap-4 ">
          <div className="text-textPrimary font-semibold">
            {customer.first_name} {customer.last_name}
          </div>
          <div>
            <span className="font-semi text-xs text-slate-500">
              Created At:{" "}
            </span>
            <span className="font-semi text-xs text-slate-700">
              {props.created_at}
            </span>
          </div>
        </div>
        <div className="w-full border rounded-md border-gray-300  items-center flex gap-4 p-2">
          <img src={Sms} alt="icon" />
          <div className=" flex items-center w-[1px] h-6 justify-center bg-gray-300"></div>
          <input
            className="w-full border-none outline-none p-2 lg:text-base lg:text-[12px]"
            type="text"
            value={customer.email}
          />
        </div>
        <div className="w-full border rounded-md border-gray-300    items-center flex gap-4 p-2">
          <img src={Phone} className="w-5 h-5 text-textIcon" alt="" />
          <div className=" flex items-center w-[1px] h-6 justify-center bg-gray-300"></div>
          <input
            className="w-full border-none outline-none p-2 lg:text-[12px] lg:text-base  "
            type="text"
            value={
              customer.phone_number && customer.mobile_country_code
                ? `${customer.mobile_country_code}-${customer.phone_number}`
                : `Not added`
            }
          />
          {customer.phone_number && customer.mobile_country_code && (
            <div
              className="center m-1 px-2 py-1 rounded-full bg-green-700 text-base text-white font-sm cursor-pointer"
              onClick={() => {
                window.open(
                  `tel:${customer.mobile_country_code}${customer.phone_number}`,
                  "_blank"
                )
              }}
            >
              Call
            </div>
          )}
        </div>
        <div className="w-full border rounded-md border-gray-300    items-center flex gap-4 p-2">
          <FontAwesomeIcon
            icon={faMap}
            size="lg"
            className="fill-current text-slate-500"
          />
          <div className=" flex items-center w-[1px] h-6 justify-center bg-gray-300"></div>
          <div className="flex justify-between space-x-1">
            <div>
              <span className="font-medium text-slate-700 text-right">
                {customer.address_line_1} {customer.address_line_2}
              </span>
              <br />
              <span className="font-medium text-slate-700 text-right">
                {customer.city}
                {"-"}
                {customer.post_code}
              </span>
              <br />
              <span className="font-medium text-slate-700 text-right">
                {customer.country}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center" aria-hidden="true">
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
        {props.showExtraDetails && (
          <OrderExtraDetailsCard
            openNotification={props.openNotification}
            showPaymentStatus={isInvoice || isBooking}
            paymentStatus={props.paymentStatus}
            changePaymentStatus={props.changePaymentStatus}
          />
        )}
      </div>
    </div>
  )
}

export default SelectedCustomerCard
