import { useEffect, useState } from "react"

import { useQueryClient } from "react-query"
import LoadingSpinner from "../components/LoadingSpinner"
import PaginationClassic from "../components/PaginationClassic"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { useAddCustomer } from "../hooks/customers/useAddCustomer"
import { useSearchCustomer } from "../hooks/customers/useCustomer"
import { useDeleteCustomers } from "../hooks/customers/useDeleteCustomers"
import { useUpdateCustomer } from "../hooks/customers/useUpdateCustomer"
import DeleteButton from "../partials/actions/DeleteButton"
import { Customer } from "../types/customer"
import DeleteDialogs from "./components/common/DeleteDialogs"
import AddUpdateCustomerForm from "./components/customers/AddUpdateCustomerForm"
import CustomersTable from "./components/customers/CustomersTable"
function Customers() {
  const snackbar = useSnackbar()
  const [currentPage, setCurrentPage] = useState(0)
  const [limitPerPage, setLimitPerPage] = useState(10)
  // const { data, isFetching } = useCustomers(currentPage, limitPerPage)

  const [searchCustomerField, setSearchCustomerField] = useState("")
  const [searchCustomerFieldDelayed, setSearchCustomerFieldDelayed] =
    useState("")
  const { data, isFetching } = useSearchCustomer(
    currentPage,
    limitPerPage,
    searchCustomerFieldDelayed
  )
  const queryClient = useQueryClient()
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false)

  const [selected, setSelected] = useState<string[]>([])
  const [customerDeleted, setCustomerDeleted] = useState<string[]>([])
  const [customerUpdated, setCustomerUpdated] = useState<Customer | undefined>(
    undefined
  )

  const { addCustomer, isAdding } = useAddCustomer()
  const { deleteCustomers, isDeleting } = useDeleteCustomers()
  const { isUpdating, updateCustomer } = useUpdateCustomer()

  const processing = isAdding || isDeleting || isUpdating
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setSearchCustomerFieldDelayed(searchCustomerField)
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchCustomerField])

  const handleSelectedItems = (selectedItems: string[]) => {
    setSelected([...selectedItems])
  }
  const handleAddCustomer = async (customer: Partial<Customer>) => {
    addCustomer(customer as Customer)
      .then(() => {
        snackbar.success(`Added customer`)
        setOpenCustomerDialog(false)
        queryClient.invalidateQueries("customers")
      })
      .catch((err) => {
        console.log(err)
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          setOpenCustomerDialog(false)
          snackbar.error(err.response.data.message)
        } else {
          setOpenCustomerDialog(false)
          snackbar.error(`Error while adding`)
        }
      })
  }

  const handleDeleteCustomers = async () => {
    deleteCustomers(customerDeleted)
      .then(() => {
        snackbar.success(`Deleted customer`)
        setSelected([])
        setCustomerDeleted([])

        setOpenConfirmDeleteDialog(false)
        queryClient.invalidateQueries("customers")
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
        setOpenCustomerDialog(false)
      })
  }

  const handleUpdateCustomer = async (customer: Customer) => {
    updateCustomer(customer)
      .then(() => {
        snackbar.success(`Updated customer`)
        setOpenCustomerDialog(false)
        queryClient.invalidateQueries("customers")
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
        setOpenCustomerDialog(false)
      })
  }

  const handleDeleteConfirmation = async () => {
    setOpenConfirmDeleteDialog(true)
  }

  return (
    <>
      {" "}
      {/**Delete dialog */}
      <DeleteDialogs
        open={openConfirmDeleteDialog}
        processing={isDeleting}
        onConfirm={() => {
          handleDeleteCustomers()
        }}
        id={`Delete-dialog-for-customers`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val)
        }}
      />{" "}
      <AddUpdateCustomerForm
        customer={customerUpdated}
        setModalOpen={(val: boolean) => {
          setOpenCustomerDialog(val)
        }}
        onAdd={handleAddCustomer}
        onUpdate={handleUpdateCustomer}
        onClose={() => {
          setCustomerUpdated(undefined)
          setOpenCustomerDialog(false)
        }}
        open={openCustomerDialog}
        processing={isAdding || isUpdating}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Customers
            </h1>
          </div>

          {/* Right: Actions */}

          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div
              onClick={() => {
                setCustomerDeleted([...selected])
                handleDeleteConfirmation()
              }}
            >
              {" "}
              <DeleteButton selectedItems={selected} />
            </div>

            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => {
                setCustomerUpdated(undefined)
                setOpenCustomerDialog(true)
              }}
              disabled={isFetching}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Customer</span>
            </button>
          </div>
        </div>

        <div className="relative mb-2">
          <label htmlFor="action-search" className="sr-only">
            Search
          </label>
          <input
            id="search-customer-field"
            className="form-input pl-9 focus:border-slate-300 full-w"
            type="search"
            placeholder={"Search customers"}
            value={searchCustomerField}
            disabled={isFetching}
            onChange={(e) => {
              setSearchCustomerField(e.target.value)
            }}
          />
          <button
            className="absolute inset-0 right-auto group"
            type="submit"
            aria-label="Search"
          >
            <svg
              className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        </div>
        {/* Table */}
        {isFetching ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            {data && data.data && data.data.length > 0 ? (
              <>
                <CustomersTable
                  customers={data.data}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  total_customers={data.total_count}
                  handleDelete={(id: string) => {
                    setSelected([id])
                    setCustomerDeleted([id])
                    handleDeleteConfirmation()
                  }}
                  handleEdit={(id: string) => {
                    const findItem = data.data.find((elem) => elem.id === id)
                    if (findItem) {
                      setCustomerUpdated({ ...findItem })
                      setOpenCustomerDialog(true)
                    }
                  }}
                />
              </>
            ) : (
              <>
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
                          No customers found
                        </h2>
                        <button
                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={() => {
                            setCustomerUpdated(undefined)
                            setOpenCustomerDialog(true)
                          }}
                        >
                          <svg
                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                          </svg>
                          <span className="ml-2">Add customer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!isFetching && data && data.data.length > 0 && (
          <div className="mt-8">
            <PaginationClassic
              current_page={currentPage}
              dataSize={data.data.length}
              handleNext={() => {
                setCurrentPage((curr) => curr + 1)
              }}
              handlePrevious={() => {
                if (currentPage !== 0) {
                  setCurrentPage((curr) => curr - 1)
                }
              }}
              total_count={data.total_count}
              next_disabled={
                currentPage * limitPerPage + limitPerPage > data.total_count
              }
              prev_disabled={currentPage === 0}
              showingFrom={`${currentPage * limitPerPage + 1}`}
              showingTo={
                currentPage * limitPerPage + limitPerPage > data.total_count
                  ? `${data.total_count}`
                  : `${currentPage * limitPerPage + limitPerPage}`
              }
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Customers
