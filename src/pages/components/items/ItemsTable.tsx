import React, { useState, useEffect } from "react"
import { Item } from "../../../types/item"
import Items from "./ItemsTableItem"

export interface ItemTableProps {
  selectedItems: string[]
  items: Item[]
  setSelectedItems: (val: string[]) => void
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}
function ItemsTable({
  setSelectedItems,
  selectedItems,
  items,
  handleDelete,
  handleEdit,
}: ItemTableProps) {
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState<string[]>([])
  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    setList(items)
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
          All Items{" "}
          <span className="text-slate-400 font-medium">{items.length}</span>
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
                  <div className="font-semibold text-left">Description</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Cost</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Created By</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Type</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {list.map((product_item: Item) => {
              return (
                <Items
                  key={product_item.id}
                  id={product_item.id}
                  name={product_item.name}
                  desc={product_item.desc}
                  createdBy={product_item.createdByUser}
                  type={product_item.type}
                  cost={`${product_item.cost}.${product_item.cost_decimals}`}
                  Industry={`Carpet Cleaning`}
                  handleChecked={handleClick}
                  isChecked={isCheck.includes(product_item.id)}
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

export default ItemsTable
