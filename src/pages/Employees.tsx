import { useState } from "react"

import { useQueryClient } from "react-query"
import LoadingSpinner from "../components/LoadingSpinner"
import PaginationClassic from "../components/PaginationClassic"
import { useAuth } from "../contexts/AuthProvider"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { useAddEmployee } from "../hooks/employees/useAddEmployee"
import { useDeleteEmployees } from "../hooks/employees/useDeleteEmployees"
import { useEmployees } from "../hooks/employees/useEmployee"
import { useUpdateEmployee } from "../hooks/employees/useUpdateEmployee"
import DeleteButton from "../partials/actions/DeleteButton"
import { Employee } from "../types/employee"
import DeleteDialogs from "./components/common/DeleteDialogs"
import AddUpdateEmployeeForm from "./components/employees/AddUpdateEmployeeForm"
import EmployeesTable from "./components/employees/EmployeesTable"
function Employees() {
  const snackbar = useSnackbar()
  const [currentPage, setCurrentPage] = useState(0)
  const [limitPerPage, setLimitPerPage] = useState(10)
  // const { data, isFetching } = useCustomers(currentPage, limitPerPage)

  const { userInfo } = useAuth()
  const { data, isFetching } = useEmployees()
  const queryClient = useQueryClient()
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openEmployeeDialog, setOpenEmployeeDialog] = useState(false)

  const [selected, setSelected] = useState<string[]>([])
  const [employeeDeleted, setEmployeeDeleted] = useState<string[]>([])
  const [employeeUpdated, setEmployeeUpdated] = useState<Employee | undefined>(
    undefined
  )

  const { addEmployee, isAdding } = useAddEmployee()
  const { deleteEmployees, isDeleting } = useDeleteEmployees()
  const { isUpdating, updateEmployee } = useUpdateEmployee()

  const processing = isAdding || isDeleting || isUpdating

  const handleSelectedItems = (selectedItems: string[]) => {
    setSelected([...selectedItems])
  }
  const handleAddEmployee = async (employee: Partial<Employee>) => {
    addEmployee(employee as Employee)
      .then(() => {
        snackbar.success(`Added employee`)
        setOpenEmployeeDialog(false)
        queryClient.invalidateQueries("employees")
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
        setOpenEmployeeDialog(false)
      })
  }

  const handleDeleteEmployees = async () => {
    deleteEmployees(employeeDeleted)
      .then(() => {
        snackbar.success(`Deleted employee`)
        setSelected([])
        setEmployeeDeleted([])

        setOpenConfirmDeleteDialog(false)
        queryClient.invalidateQueries("employees")
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
        setOpenEmployeeDialog(false)
      })
  }

  const handleUpdateEmployee = async (employee: Employee) => {
    updateEmployee(employee)
      .then(() => {
        snackbar.success(`Updated employee`)
        setOpenEmployeeDialog(false)
        queryClient.invalidateQueries("employees")
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
        setOpenEmployeeDialog(false)
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
          handleDeleteEmployees()
        }}
        id={`Delete-dialog-for-employees`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val)
        }}
      />{" "}
      <AddUpdateEmployeeForm
        employee={employeeUpdated}
        setModalOpen={(val: boolean) => {
          setOpenEmployeeDialog(val)
        }}
        onAdd={handleAddEmployee}
        onUpdate={handleUpdateEmployee}
        onClose={() => {
          setEmployeeUpdated(undefined)
          setOpenEmployeeDialog(false)
        }}
        open={openEmployeeDialog}
        processing={isAdding || isUpdating}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Employees
            </h1>
          </div>

          {/* Right: Actions */}

          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div
              onClick={() => {
                setEmployeeDeleted([...selected])
                handleDeleteConfirmation()
              }}
            >
              {" "}
              <DeleteButton selectedItems={selected} />
            </div>

            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
              disabled={
                isFetching || (userInfo && userInfo.availableCredits < 100)
              }
              onClick={() => {
                setEmployeeUpdated(undefined)
                setOpenEmployeeDialog(true)
              }}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Employee </span>
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
                <EmployeesTable
                  employees={data}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  handleDelete={(id: string) => {
                    setSelected([id])
                    setEmployeeDeleted([id])
                    handleDeleteConfirmation()
                  }}
                  handleEdit={(id: string) => {
                    const findItem = data.find((elem) => elem.id === id)
                    if (findItem) {
                      setEmployeeUpdated({ ...findItem })
                      setOpenEmployeeDialog(true)
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
                          No Employees found
                        </h2>
                        {userInfo && userInfo.availableCredits < 100 && (
                          <div>
                            <span className="text-rose-500">{`(Not enough credits. Required 100+)`}</span>
                          </div>
                        )}
                        <button
                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                          disabled={userInfo && userInfo.availableCredits < 100}
                          onClick={() => {
                            setEmployeeUpdated(undefined)
                            setOpenEmployeeDialog(true)
                          }}
                        >
                          <svg
                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                          </svg>
                          <span className="ml-2">Add Employee</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!isFetching && data && data.length > 0 && (
          <div className="mt-8">
            <PaginationClassic
              current_page={currentPage}
              dataSize={data.length}
              handleNext={() => {
                setCurrentPage((curr) => curr + 1)
              }}
              handlePrevious={() => {
                if (currentPage !== 0) {
                  setCurrentPage((curr) => curr - 1)
                }
              }}
              total_count={data.length}
              next_disabled={true}
              prev_disabled={currentPage === 0}
              showingFrom={`${currentPage}`}
              showingTo={`${currentPage}`}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Employees
