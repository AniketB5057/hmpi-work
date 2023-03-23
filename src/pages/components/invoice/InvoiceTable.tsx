import { useEffect, useState } from "react"
import { getInvoiceResponse, Invoice } from "../../../types/invoice"
import Invoices from "./InvoiceTableItem"

export interface InvoiceTableProps {
  selectedItems: string[]
  invoices: getInvoiceResponse[]
  setSelectedItems: (val: string[]) => void
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
function InvoicesTable({
  setSelectedItems,
  selectedItems,
  invoices,
  handleDelete,
  handleEdit,
}: InvoiceTableProps) {
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState<string[]>([])
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    setList(invoices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setIsCheck(list.map((li) => li.id))
    if (selectAll) {
      setIsCheck([])
    }
  }

  const handleClick = (e: any) => {
    const { id, checked } = e.target
    setSelectAll(false)
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }

  useEffect(() => {
    setSelectedItems([...isCheck])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck])

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          All Invoices{" "}
          <span className="text-slate-400 font-medium">{invoices.length}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-slate-200">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Payment Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Due Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list.map((invoice_item: Invoice) => {
              return (
                <Invoices
                  key={invoice_item.id}
                  id={invoice_item.id}
                  invoice_id={invoice_item.invoice_sequence_id}
                  customer_name={`${invoice_item.customerObject.first_name} ${invoice_item.customerObject.last_name}`}
                  customer_email={
                    invoice_item.customerObject.email
                      ? invoice_item.customerObject.email
                      : ``
                  }
                  amount={invoice_item.invoice_billing_details.total_amount}
                  //   createdBy={`${invoice_item.createdByUser}`}
                  payment_status={invoice_item.invoice_payment_completed}
                  createdAt={invoice_item.invoice_created_at_timestamp}
                  invoice_due_date={invoice_item.invoice_due_date}
                  invoice_created_date={
                    invoice_item.invoice_created_at_timestamp
                  }
                  customer_address={{
                    address_line_1: invoice_item.customerObject.address_line_1
                      ? invoice_item.customerObject.address_line_1
                      : ``,
                    city: invoice_item.customerObject.city
                      ? invoice_item.customerObject.city
                      : ``,
                    address_line_2: invoice_item.customerObject.address_line_2
                      ? invoice_item.customerObject.address_line_2
                      : ``,
                    country: invoice_item.customerObject.country
                      ? invoice_item.customerObject.country
                      : ``,
                    post_code: invoice_item.customerObject.post_code
                      ? invoice_item.customerObject.post_code
                      : ``,
                  }}
                  handleChecked={handleClick}
                  isChecked={isCheck.includes(invoice_item.id)}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )
            })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default InvoicesTable
