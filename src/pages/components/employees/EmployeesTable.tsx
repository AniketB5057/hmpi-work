import { useEffect, useState } from "react"
import { Employee } from "../../../types/employee"
import Employees from "./EmployeesTableItem"

export interface EmployeeTableProps {
  selectedItems: string[]
  employees: Employee[]
  setSelectedItems: (val: string[]) => void
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
function EmployeesTable({
  setSelectedItems,
  selectedItems,
  employees,
  handleDelete,
  handleEdit,
}: EmployeeTableProps) {
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState<string[]>([])
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    setList(employees)
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
          All Employees{" "}
          <span className="text-slate-400 font-medium">{employees.length}</span>
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
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Access Level</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Created By</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list.map((employee_item: Employee) => {
              return (
                <Employees
                  key={employee_item.id}
                  id={employee_item.id}
                  name={`${employee_item.first_name} ${employee_item.last_name}`}
                  email={employee_item.email}
                  access_level={employee_item.access_level}
                  phone={`${employee_item.phone_number}`}
                  address={`${employee_item.post_code} - ${employee_item.city} - ${employee_item.country}`}
                  handleChecked={handleClick}
                  isChecked={isCheck.includes(employee_item.id)}
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

export default EmployeesTable
