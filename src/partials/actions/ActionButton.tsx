import React from "react"

function ActionButtons({
  selectedItems,
  onBulkUpdate,
  onDelete,
}: {
  selectedItems: any[]
  onDelete: () => void
  onBulkUpdate: () => void
}) {
  return (
    <div className={`${selectedItems.length < 1 && "hidden"}`}>
      <div className="flex items-center">
        <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
          <span>{selectedItems.length}</span> items selected
        </div>
        <button
          className="mr-1 mr-1 btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
          onClick={() => {
            onBulkUpdate()
          }}
        >
          Bulk Update Tags
        </button>
        <button
          className="ml-1 mr-1 btn bg-white border-slate-200 hover:border-slate-300 text-rose-500 hover:text-rose-600"
          onClick={() => {
            onDelete()
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ActionButtons
