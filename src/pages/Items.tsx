import { useState } from "react"

import { useQueryClient } from "react-query"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { useAddItem } from "../hooks/items/useAddItem"
import { useDeleteItems } from "../hooks/items/useDeleteItems"
import { useItems } from "../hooks/items/useItems"
import { useUpdateItem } from "../hooks/items/useUpdateItem"
import DeleteButton from "../partials/actions/DeleteButton"
import { Item } from "../types/item"
import DeleteDialogs from "./components/common/DeleteDialogs"
import AddUpdateItemForm from "./components/items/AddUpdateItemForm"
import ItemsTable from "./components/items/ItemsTable"

function Items() {
  const { data, isFetching } = useItems()
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

  const [itemDeleted, setItemDeleted] = useState<string[]>([])

  const { addItem, isAdding } = useAddItem()
  const { deleteItems, isDeleting } = useDeleteItems()
  const { isUpdating, updateItem } = useUpdateItem()

  const snackbar = useSnackbar()
  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<string[]>([])
  const [openAddItemModal, setOpenAddItemModal] = useState(false)
  const [formDataForItem, setFormDataForItem] = useState<Item | undefined>()
  const handleSelectedItems = (selectedItems: string[]) => {
    setSelected([...selectedItems])
  }
  const handleAddItem = async (item: Partial<Item>) => {
    addItem(item as Item)
      .then(() => {
        snackbar.success(`Item added succesfully: ${item.name}`)
        setOpenAddItemModal(false)
        queryClient.invalidateQueries("items")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message)
        } else {
          snackbar.error(`Something went wrong.`)
        }
        setOpenAddItemModal(false)
      })
  }
  const handleDeleteConfirmation = async () => {
    setOpenConfirmDeleteDialog(true)
  }
  const handleDeleteItems = async () => {
    deleteItems(itemDeleted)
      .then(() => {
        snackbar.success(`deleted`)
        setSelected([])
        setItemDeleted([])

        setOpenConfirmDeleteDialog(false)
        queryClient.invalidateQueries("items")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message)
        } else {
          snackbar.error(`Something went wrong.`)
        }
        setOpenAddItemModal(false)
      })
  }
  const handleUpdateItem = async (item: Item) => {
    updateItem(item)
      .then(() => {
        snackbar.success(`Updated items: ${item.name}`)
        setOpenAddItemModal(false)
        queryClient.invalidateQueries("items")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message)
        } else {
          snackbar.error(`Something went wrong.`)
        }
        setOpenAddItemModal(false)
      })
  }
  return (
    <>
      <DeleteDialogs
        open={openConfirmDeleteDialog}
        processing={isDeleting}
        onConfirm={() => {
          handleDeleteItems()
        }}
        id={`Delete-dialog-for-items`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val)
        }}
      />
      <AddUpdateItemForm
        item={formDataForItem}
        setModalOpen={(val: boolean) => {
          setOpenAddItemModal(val)
        }}
        onAdd={handleAddItem}
        onUpdate={handleUpdateItem}
        onClose={() => {
          setFormDataForItem(undefined)
          setOpenAddItemModal(false)
        }}
        open={openAddItemModal}
        processing={isAdding || isUpdating}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Items
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div
              onClick={() => {
                setItemDeleted([...selected])
                handleDeleteConfirmation()
              }}
            >
              {" "}
              <DeleteButton selectedItems={selected} />
            </div>

            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => {
                setFormDataForItem(undefined)
                setOpenAddItemModal(true)
              }}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Item</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {isFetching ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            {data && data.length > 0 ? (
              <>
                <ItemsTable
                  items={data}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  handleDelete={(id: string) => {
                    setSelected([id])
                    setItemDeleted([id])
                    handleDeleteConfirmation()
                  }}
                  handleEdit={(id: string) => {
                    const findItem = data.find((elem) => elem.id === id)
                    if (findItem) {
                      setFormDataForItem({ ...findItem })
                      setOpenAddItemModal(true)
                    }
                  }}
                />
              </>
            ) : (
              <>
                <main>
                  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    {/* Page header */}
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                      {/* Left: Title */}
                    </div>

                    <div className="border-t border-slate-200">
                      <div className="max-w-2xl m-auto mt-16">
                        <div className="text-center px-4">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4">
                            <svg
                              className="w-5 h-6 fill-current"
                              viewBox="0 0 20 24"
                            >
                              <path
                                className="text-slate-500"
                                d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z"
                              />
                              <path
                                className="text-slate-300"
                                d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z"
                              />
                              <path
                                className="text-slate-400"
                                d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z"
                              />
                            </svg>
                          </div>
                          <h2 className="text-2xl text-slate-800 font-bold mb-2">
                            No Items found
                          </h2>
                          <button
                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            onClick={() => {
                              setFormDataForItem(undefined)
                              setOpenAddItemModal(true)
                            }}
                          >
                            <svg
                              className="w-4 h-4 fill-current opacity-50 shrink-0"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                            <span className="ml-2">Add Items</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </>
            )}
          </>
        )}

        {/* Pagination
          <div className="mt-8">
            <PaginationClassic />
          </div> */}
      </div>
    </>
  )
}

export default Items
