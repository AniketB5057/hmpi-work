import { useState } from "react"

import { useQueryClient } from "react-query"
import LoadingSpinner from "../components/LoadingSpinner"
import PaginationClassic from "../components/PaginationClassic"
import { useSnackbar } from "../contexts/SnackbarProvider"
import { useAddLocation } from "../hooks/locations/useAddLocations"
import { useDeleteLocations } from "../hooks/locations/useDeleteLocations"
import { useLocations } from "../hooks/locations/useLocations"
import { useUpdateLocation } from "../hooks/locations/useUpdateLocations"
import DeleteButton from "../partials/actions/DeleteButton"
import { Location } from "../types/location"
import DeleteDialogs from "./components/common/DeleteDialogs"
import AddUpdateLocationForm from "./components/locations/AddUpdateLocationForm"
import LocationsTable from "./components/locations/LocationsTable"
function Locations() {
  const snackbar = useSnackbar()
  const [currentPage, setCurrentPage] = useState(0)
  const [limitPerPage, setLimitPerPage] = useState(10)
  // const { data, isFetching } = useCustomers(currentPage, limitPerPage)

  const { data, isFetching } = useLocations()
  const queryClient = useQueryClient()
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
  const [openLocationDialog, setOpenLocationDialog] = useState(false)

  const [selected, setSelected] = useState<string[]>([])
  const [locationDeleted, setLocationDeleted] = useState<string[]>([])
  const [locationUpdated, setLocationUpdated] = useState<Location | undefined>(
    undefined
  )

  const { addLocation, isAdding } = useAddLocation()
  const { deleteLocations, isDeleting } = useDeleteLocations()
  const { isUpdating, updateLocation } = useUpdateLocation()

  const processing = isAdding || isDeleting || isUpdating

  const handleSelectedItems = (selectedItems: string[]) => {
    setSelected([...selectedItems])
  }
  const handleAddLocation = async (location: Partial<Location>) => {
    addLocation(location as Location)
      .then(() => {
        snackbar.success(`Added location`)
        setOpenLocationDialog(false)
        queryClient.invalidateQueries("locationss")
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
        setOpenLocationDialog(false)
      })
  }

  const handleDeleteLocations = async () => {
    deleteLocations(locationDeleted)
      .then(() => {
        snackbar.success(`Deleted location`)
        setSelected([])
        setLocationDeleted([])

        setOpenConfirmDeleteDialog(false)
        queryClient.invalidateQueries("locations")
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
        setOpenLocationDialog(false)
      })
  }

  const handleUpdateLocation = async (location: Location) => {
    updateLocation(location)
      .then(() => {
        snackbar.success(`Updated location`)
        setOpenLocationDialog(false)
        queryClient.invalidateQueries("locations")
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
        setOpenLocationDialog(false)
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
          handleDeleteLocations()
        }}
        id={`Delete-dialog-for-locations`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val)
        }}
      />{" "}
      <AddUpdateLocationForm
        location={locationUpdated}
        setModalOpen={(val: boolean) => {
          setOpenLocationDialog(val)
        }}
        onAdd={handleAddLocation}
        onUpdate={handleUpdateLocation}
        onClose={() => {
          setLocationUpdated(undefined)
          setOpenLocationDialog(false)
        }}
        open={openLocationDialog}
        processing={isAdding || isUpdating}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Locations
            </h1>
          </div>

          {/* Right: Actions */}

          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div
              onClick={() => {
                setLocationDeleted([...selected])
                handleDeleteConfirmation()
              }}
            >
              {" "}
              <DeleteButton selectedItems={selected} />
            </div>

            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => {
                setLocationUpdated(undefined)
                setOpenLocationDialog(true)
              }}
              disabled={isFetching}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Location</span>
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
                <LocationsTable
                  locations={data}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  handleDelete={(id: string) => {
                    setSelected([id])
                    setLocationDeleted([id])
                    handleDeleteConfirmation()
                  }}
                  handleEdit={(id: string) => {
                    const findItem = data.find((elem) => elem.id === id)

                    if (findItem) {
                      setLocationUpdated({ ...findItem })
                      setOpenLocationDialog(true)
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
                          No Locations found
                        </h2>
                        <button
                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={() => {
                            setLocationUpdated(undefined)
                            setOpenLocationDialog(true)
                          }}
                        >
                          <svg
                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                          </svg>
                          <span className="ml-2">Add Location</span>
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

export default Locations
