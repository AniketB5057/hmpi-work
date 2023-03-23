import { useEffect, useState } from "react"
import { getEstimateResponse, Estimate } from "../../../types/estimate"
import Estimates from "./EstimateTableItem"

export interface EstimateTableProps {
  selectedItems: string[]
  estimates: getEstimateResponse[]
  setSelectedItems: (val: string[]) => void
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
function EstimatesTable({
  setSelectedItems,
  selectedItems,
  estimates,
  handleDelete,
  handleEdit,
}: EstimateTableProps) {
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState<string[]>([])
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    setList(estimates)
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
          All Estimates{" "}
          <span className="text-slate-400 font-medium">{estimates.length}</span>
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
                  <div className="font-semibold text-left">Amount</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Estimate Status</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list.map((estimate_item: Estimate) => {
              return (
                <Estimates
                  key={estimate_item.id}
                  id={estimate_item.id}
                  estimate_id={estimate_item.estimate_sequence_id}
                  customer_name={`${estimate_item.customerObject.first_name} ${estimate_item.customerObject.last_name}`}
                  customer_email={`${estimate_item.customerObject.email}`}
                  amount={estimate_item.estimate_billing_details.total_amount}
                  //   createdBy={`${estimate_item.createdByUser}`}
                  createdAt={estimate_item.estimate_created_at_timestamp}
                  estimate_created_date={
                    estimate_item.estimate_created_at_timestamp
                  }
                  handleChecked={handleClick}
                  isChecked={isCheck.includes(estimate_item.id)}
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

export default EstimatesTable
