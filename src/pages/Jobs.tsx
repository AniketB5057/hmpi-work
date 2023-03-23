import { useEffect, useState } from "react";

import moment from "moment";
import "moment-timezone";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Datepicker from "../components/Datepicker";
import LoadingSpinner from "../components/LoadingSpinner";
import PaginationClassic from "../components/PaginationClassic";
import { useAuth } from "../contexts/AuthProvider";
import { useSnackbar } from "../contexts/SnackbarProvider";
import { useDeleteOrders } from "../hooks/orders/useDeleteOrders";
import { fetchAllOrderStatuses, useOrders } from "../hooks/orders/useOrder";
import DeleteButton from "../partials/actions/DeleteButton";
import ActionButtons from "../partials/actions/ActionButton";
import { makeid } from "../utils/commonFunctions";
import DeleteDialogs from "./components/common/DeleteDialogs";
import OrdersTable from "./components/orders/OrdersTable";
import ModalBlank from "../components/ModalBlank";
import { axios_instance } from "../config";
import { getItem } from "../utils/localStorage";
import JobsOverview from "./components/orders/JobsOverview";

function Bookings() {
  const snackbar = useSnackbar();
  const { userInfo } = useAuth();
  const timezone =
    userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();

  const [currentPage, setCurrentPage] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchBookings, setSearchBookings] = useState("");
  const [searchBookingsFieldDelayed, setSearchBookingsFieldDelayed] =
    useState("");
  const [filterTimestamp, setFilterTimestamp] = useState<{
    start: number;
    end: number;
  }>({
    start: moment().tz(timezone).subtract(12, "months").startOf("month").unix(),
    end: moment().tz(timezone).add(1, "month").endOf("month").unix(),
  });
  const [filterStartDate, setFilterStartDate] = useState<Date>(
    moment.unix(filterTimestamp.start).toDate()
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const [filterEndDate, setFilterEndDate] = useState<Date>(
    moment.unix(filterTimestamp.end).toDate()
  );

  const navigate = useNavigate();
  const { data, isFetching, refetch } = useOrders(
    currentPage,
    limitPerPage,
    filterTimestamp.start,
    filterTimestamp.end,
    selectedStatus,
    searchBookingsFieldDelayed
  );

  const queryClient = useQueryClient();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [bulkUpdateTags, setBulkUpdateTags] = useState<string[]>([]);
  const [openConfirmBulkDialog, setOpenConfirmBulkDialog] = useState(false);
  const [isBulkUpdatingOrderTags, setIsBulkUpdatingOrderTags] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkTagsOptions, setBulkTagOptions] = useState<string[]>([]);
  const [orderDeleted, setOrderDeleted] = useState<string[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [allStatuses, setAllStatuses] = useState<
    {
      status: string;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setSearchBookingsFieldDelayed(searchBookings);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchBookings]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      refetch({ cancelRefetch: true });
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchBookingsFieldDelayed]);

  const handleBulkUpdateOrders = async () => {
    try {
      setIsBulkUpdatingOrderTags(true);
      const token = `${getItem(`authkey`)}`;
      const getData = axios_instance.put(
        "/order/bulk-tags",
        {
          ids: selected,
          tags: bulkUpdateTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBulkUpdatingOrderTags(false);
      setOpenConfirmBulkDialog(false);
      snackbar.success("updated booking tags");
      queryClient.invalidateQueries("orders");
      fetchDataForStatuses();
    } catch (err) {
      setIsBulkUpdatingOrderTags(false);
      snackbar.error("failed to update booking tags");
      console.log(err);
    }
  };

  const { deleteOrders, isDeleting } = useDeleteOrders();
  const handleSelectedItems = (selectedItems: string[]) => {
    setSelected([...selectedItems]);
  };

  const handleDeleteOrders = async () => {
    deleteOrders(orderDeleted)
      .then(() => {
        snackbar.success(`Deleted order`);
        setSelected([]);
        setOrderDeleted([]);

        setOpenConfirmDeleteDialog(false);
        queryClient.invalidateQueries("orders");
      })
      .catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message);
        } else {
          snackbar.error(`Something went wrong.`);
        }
      });
  };

  const handleDeleteConfirmation = async () => {
    setOpenConfirmDeleteDialog(true);
  };

  const fetchDataForStatuses = async () => {
    try {
      const data = await fetchAllOrderStatuses(
        filterTimestamp.start,
        filterTimestamp.end
      );

      setAllStatuses(data);
      setLoadingStatuses(false);
    } catch (err) {
      console.log(err);
      snackbar.error("failed to load statuses");
      setLoadingStatuses(false);
    }
  };
  useEffect(() => {
    fetchDataForStatuses();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (filterTimestamp && filterTimestamp.start && filterTimestamp.end) {
        refetch({ cancelRefetch: true });
      }
    }
    return () => {};
  }, [filterTimestamp, selectedStatus]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setBulkTagOptions(allStatuses.map((childElem) => childElem.status));
    }
    return () => {};
  }, [allStatuses]);

  return (
    <>
      {/**Delete dialog */}
      <DeleteDialogs
        open={openConfirmDeleteDialog}
        processing={isDeleting}
        onConfirm={() => {
          handleDeleteOrders();
        }}
        id={`Delete-dialog-for-customers`}
        setOpenModal={(val: boolean) => {
          setOpenConfirmDeleteDialog(val);
        }}
      />
      <ModalBlank
        id={`modal-for-bulk-update`}
        modalOpen={openConfirmBulkDialog}
        setModalOpen={(val: boolean) => {
          setOpenConfirmBulkDialog(val);
        }}
      >
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-rose-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">
                Are you sure you want to bulk update ?
              </div>
            </div>
            <div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
                  Apply tag
                </div>
                <ul className="mb-4">
                  {bulkTagsOptions.map((elem, index) => {
                    return (
                      <li
                        className="py-1 px-3"
                        key={`${elem}-dropdown-option-${index}`}
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={bulkUpdateTags.includes(elem)}
                            onChange={(e) => {
                              const findItem = bulkUpdateTags.find(
                                (searchElem) => searchElem === elem
                              );
                              if (findItem) {
                                setBulkUpdateTags(
                                  bulkUpdateTags.filter((val) => {
                                    return val !== elem;
                                  })
                                );
                              } else {
                                setBulkUpdateTags([...bulkUpdateTags, elem]);
                              }
                            }}
                          />
                          <span className="text-sm font-medium ml-2">
                            {elem}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                  <input
                    id="tags_input_box_for_bulk_update"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    placeholder={"Type New tag & Press enter..."}
                    value={tagsInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.keyCode === 13) {
                        // Do something

                        setBulkTagOptions([...bulkTagsOptions, tagsInput]);
                        setTagsInput("");
                      }
                    }}
                    onChange={(e) => {
                      setTagsInput(e.target.value);
                    }}
                  />
                </ul>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  setOpenConfirmBulkDialog(false);
                }}
              >
                Cancel
              </button>
              {isBulkUpdatingOrderTags ? (
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                  disabled
                >
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </button>
              ) : (
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed "
                  disabled={bulkUpdateTags.length === 0}
                  onClick={() => {
                    handleBulkUpdateOrders();
                  }}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalBlank>
      <div className="admin-theme px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto custom-bg">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0 bottom-underline">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
              Jobs
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div>
              <ActionButtons
                selectedItems={selected}
                onDelete={() => {
                  setOrderDeleted([...selected]);
                  handleDeleteConfirmation();
                }}
                onBulkUpdate={() => {
                  setOrderDeleted([...selected]);
                  setOpenConfirmBulkDialog(true);
                }}
              />
            </div>
            <button
              onClick={() => {
                navigate("/job/add");
              }}
              disabled={isFetching}
              className="py-2 px-4 text-white btn-green"
            >
              <span className="hidden xs:block">New Job</span>
            </button>
            <button
              className="btn btn-more-actions"
              onClick={() => {
                navigate("/job/add");
              }}
              disabled={isFetching}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clip-rule="evenodd"
                  d="M6 14.5C7.10445 14.5 8 13.6048 8 12.5C8 11.3951 7.10445 10.5 6 10.5C4.89556 10.5 4 11.3951 4 12.5C4 13.6048 4.89556 14.5 6 14.5ZM12 14.5C13.1044 14.5 14 13.6048 14 12.5C14 11.3951 13.1044 10.5 12 10.5C10.8955 10.5 10 11.3951 10 12.5C10 13.6048 10.8955 14.5 12 14.5ZM12 11.5C12.5522 11.5 13 11.9475 13 12.5C13 13.0524 12.5522 13.5 12 13.5C11.4477 13.5 11 13.0524 11 12.5C11 11.9475 11.4477 11.5 12 11.5ZM7 12.5C7 11.9475 6.55225 11.5 6 11.5C5.44775 11.5 5 11.9475 5 12.5C5 13.0524 5.44775 13.5 6 13.5C6.55225 13.5 7 13.0524 7 12.5ZM19 12.5C19 11.9475 18.5522 11.5 18 11.5C17.4477 11.5 17 11.9475 17 12.5C17 13.0524 17.4477 13.5 18 13.5C18.5522 13.5 19 13.0524 19 12.5ZM18 14.5C19.1044 14.5 20 13.6048 20 12.5C20 11.3951 19.1044 10.5 18 10.5C16.8955 10.5 16 11.3951 16 12.5C16 13.6048 16.8955 14.5 18 14.5Z"
                  fill="#398378"
                />
              </svg>
              <span className="hidden xs:block ml-2">More Actions</span>
            </button>
          </div>
        </div>

        <div className="sm:flex sm:justify-between sm:items-center">
          {/* {loadingStatuses ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Left side */}

          {/* <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1">
                  <li
                    className="m-1"
                    key={`all-statuses-${makeid(4)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedStatus(`All`);
                    }}
                  >
                    {selectedStatus === `All` ? (
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                        All{" "}
                        <span className="ml-1 text-indigo-200">
                          {data && data.total_count_all_status}
                        </span>
                      </button>
                    ) : (
                      <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                        All{" "}
                        <span className="ml-1 text-slate-400">
                          {data && data.total_count_all_status}
                        </span>
                      </button>
                    )}
                  </li>
                  {allStatuses.length > 0 &&
                    allStatuses.map((elem, index) => {
                      return (
                        <li
                          className="m-1"
                          key={`${index}-statuses-${makeid(4)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedStatus(`${elem.status}`);
                          }}
                        >
                          {selectedStatus === `${elem.status}` ? (
                            <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                              {elem.status}
                              <span className="ml-1 text-indigo-200">
                                {elem.count}
                              </span>
                            </button>
                          ) : (
                            <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                              {elem.status}
                              <span className="ml-1 text-slate-400">
                                {elem.count}
                              </span>
                            </button>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )} */}
          {/* Right side */}
          {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
          {/* <DeleteButton selectedItems={selectedItems} /> */}
          {/* Dropdown */}
          {/* <Datepicker
              align="right"
              start_date={filterStartDate}
              end_date={filterEndDate}
              onDateChange={(dates: Date[]) => {
                let tempSDate = dates && dates[0];
                let tempEDate = dates && dates[1];
                setFilterStartDate(tempSDate);
                setFilterEndDate(tempEDate);
                if (tempSDate && tempEDate) {
                  const tempTimestampObject = {
                    start: moment(tempSDate.toDateString()).unix(),
                    end: moment(tempEDate.toDateString()).unix(),
                  };
                  setFilterTimestamp({ ...tempTimestampObject });
                }
              }}
            />
            {/* Filter button */}
          {/* <FilterButton align="right" /> */}
          {/* </div> */}
        </div>
        {/* <div className="relative mb-2">
          <label htmlFor="action-search" className="sr-only">
            Search
          </label>
          <input
            id="search-customer-field"
            className="form-input pl-9 focus:border-slate-300 full-w"
            type="search"
            placeholder={"Search anything..."}
            value={searchBookings}
            disabled={isFetching}
            onChange={(e) => {
              setSearchBookings(e.target.value);
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
        </div> */}
        {/* Table */}
        <div className="flex mb-4">
          {/* <div className="w-5/6 mr-[24px]"> */}
          <div className="w-full">
            <div className="max-w rounded overflow-hidden shadow-lg jobs-listing-card">
              <div className="px-6 py-4 jobs-listing-search-options">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/4 px-3">
                    <label
                      className="block mb-2 search-labels"
                      htmlFor="grid-search"
                    >
                      Search
                    </label>
                    <input
                      className="w-full rounded"
                      id="grid-search"
                      placeholder="Search Jobs..."
                      type="search"
                      value={searchBookings}
                      disabled={isFetching}
                      onChange={(e) => {
                        setSearchBookings(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-3">
                    <label
                      className="block mb-2 search-labels"
                      htmlFor="grid-search"
                    >
                      Created
                    </label>
                    <select className="w-full" id="grid-state">
                      <option>All</option>
                      {/* <option>Missouri</option> */}
                      {/* <option>Texas</option> */}
                    </select>
                  </div>
                  <div className="w-full md:w-1/4 px-3">
                    <label
                      className="block mb-2 search-labels"
                      htmlFor="grid-search"
                    >
                      Sort
                    </label>
                    <select className="w-full" id="grid-state">
                      <option>Status</option>
                      {/* <option>Missouri</option> */}
                      {/* <option>Texas</option> */}
                    </select>
                  </div>
                  {/* <div className="w-full md:w-1/3 px-3 py-[30px]"> */}
                  <div className="w-full md:w-1/4 px-3">
                    <label
                      className="block mb-2 search-labels"
                      htmlFor="grid-search"
                    >
                      Type
                    </label>
                    <select className="w-full" id="grid-state">
                      <option>All</option>
                      {/* <option>Missouri</option> */}
                      {/* <option>Texas</option> */}
                    </select>
                  </div>
                </div>
              </div>
              {data?.data?.length ? (
                // <table className="min-w-full text-left text-sm font-light">
                //   <thead className="border-b font-medium dark:border-neutral-500">
                //     <tr>
                //       <th scope="col" className="px-6 py-4">
                //         Client
                //       </th>
                //       <th scope="col" className="px-6 py-4">
                //         Title / Property
                //       </th>
                //       <th scope="col" className="px-6 py-4">
                //         Next Visit / Calendar
                //       </th>
                //       <th scope="col" className="px-6 py-4">
                //         Invoicing
                //       </th>
                //       <th scope="col" className="px-6 py-4">
                //         Total
                //       </th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     <tr className="border-b dark:border-neutral-500">
                //       <td className="whitespace-nowrap px-6 py-4 font-medium">
                //         1
                //       </td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //     </tr>
                //     <tr className="border-b dark:border-neutral-500">
                //       <td className="whitespace-nowrap px-6 py-4 font-medium ">
                //         2
                //       </td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //     </tr>
                //     <tr className="border-b ">
                //       <td className="whitespace-nowrap px-6 py-4 font-medium ">
                //         3
                //       </td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //       <td className="whitespace-nowrap px-6 py-4">Cell</td>
                //     </tr>
                //   </tbody>
                // </table>
                <OrdersTable
                  orders={data?.data}
                  total_count={data?.total_count}
                  isDataLoading={isFetching}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  handleDelete={(id: string) => {
                    setSelected([id]);
                    setOrderDeleted([id]);
                    handleDeleteConfirmation();
                  }}
                  handleEdit={(id: string) => {
                    const findItem = data?.data.find((elem) => elem.id === id);
                    if (findItem) {
                      navigate(`/job/edit/${findItem.id}`);
                    }
                  }}
                />
              ) : (
                <div className="jobs-list text-center">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Let's create a Job
                  </h1>
                  <div className="my-10">
                    <button
                      onClick={() => {
                        navigate("/job/add");
                      }}
                      disabled={isFetching}
                      className="text-white btn-green small-btn px-3 py-1.5"
                    >
                      Create a Job
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className="w-2/6">
            <JobsOverview />
          </div> */}
        </div>
        {!isFetching && data && data.data.length > 0 && (
          <div className="mt-8">
            <PaginationClassic
              current_page={currentPage}
              dataSize={data.data.length}
              handleNext={() => {
                setCurrentPage((curr) => curr + 1);
              }}
              handlePrevious={() => {
                if (currentPage !== 0) {
                  setCurrentPage((curr) => curr - 1);
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
  );
}

export default Bookings;
