import moment from "moment"
import "moment-timezone"
import { useAuth } from "../../../contexts/AuthProvider"
import { Invoice } from "../../../types/invoice"

export interface InvoiceTableItemProps {
  key: string
  id: string
  invoice_id: number
  customer_name: string
  customer_email: string
  invoice_due_date?: number
  invoice_created_date?: number
  amount: string
  payment_status: boolean
  createdAt: number
  customer_address: {
    address_line_1: string
    address_line_2: string
    city: string
    post_code: string
    country: string
  }
  isChecked: boolean
  handleChecked: any
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
function InvoicesTableItem(props: InvoiceTableItemProps) {
  const { userInfo } = useAuth()
  let userTimezone =
    userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess()
  let formattedInvoiceDueDate = moment
    .unix(parseInt(`${props.invoice_due_date}`))
    .tz(userTimezone)
    .format("DD-MM-YYYY HH:mm A")

  if (props.invoice_due_date) {
  } else {
    formattedInvoiceDueDate = "NA"
  }

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={props.id}
                className="form-checkbox"
                type="checkbox"
                onChange={props.handleChecked}
                checked={props.isChecked}
              />
            </label>
          </div>
        </td>
        <td
          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault()
            props.handleEdit(props.id)
          }}
        >
          <div className="text-blue-700 hover:underline hover:cursor-pointer">
            {props.invoice_id}
            {" (View)"}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-slate-800">
            {props.customer_name}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-emerald-500">
            {props.customer_email}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-slate-800">
            {props.customer_address.address_line_1}{" "}
            {props.customer_address.address_line_2} <br />
            {props.customer_address.city}
            <br />
            {props.customer_address.post_code}
            <br />
            {props.customer_address.country}
            <br />
          </div>
        </td>
        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(props.status)}`}>{props.status}</div>
        </td> */}

        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">
            {userInfo?.currency} {props.amount}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div
            className={`text-center font-medium rounded-full text-center px-2.5  ${
              props.payment_status
                ? `bg-emerald-100 text-emerald-600`
                : `bg-amber-100 text-amber-600`
            }`}
          >
            {" "}
            {props.payment_status ? `Paid` : `Not Paid`}
          </div>
        </td>

        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">{formattedInvoiceDueDate}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <div className="m-1.5">
              {/* Start */}
              <button
                className="btn binvoice-slate-200 hover:binvoice-slate-300"
                onClick={() => {
                  props.handleEdit(props.id)
                }}
              >
                <svg
                  className="w-4 h-4 fill-current text-slate-500 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>
              </button>
              {/* End */}
            </div>
            <div className="m-1.5">
              {/* Start */}
              <button
                className="btn binvoice-slate-200 hover:binvoice-slate-300"
                onClick={() => {
                  props.handleDelete(props.id)
                }}
              >
                <svg
                  className="w-4 h-4 fill-current text-rose-500 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                </svg>
              </button>
              {/* End */}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

export default InvoicesTableItem
