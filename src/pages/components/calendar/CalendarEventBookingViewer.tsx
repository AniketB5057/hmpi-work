import moment from "moment";
import "moment-timezone";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../contexts/AuthProvider";
import { useSnackbar } from "../../../contexts/SnackbarProvider";
import { Order } from "../../../types/order";
import { Task } from "../../../types/task";
import { EventTypesEnum } from "../../Calendar";

function CalendarEventBookingViewer({
  show,
  hide,
  orderData,
  eventId,
  taskData,
  eventType,
  handleEditTask,
  handleDeleteTask,
  formSubmitting,
}: {
  show: boolean;
  hide: () => void;
  orderData: Order[] | undefined;
  eventId: string | null;
  taskData: Task[] | undefined;
  eventType: EventTypesEnum;
  handleEditTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  formSubmitting: boolean;
}) {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { userInfo } = useAuth();
  let userTimezone =
    userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();

  useEffect(() => {
    if (eventId && show && eventType === EventTypesEnum.ORDER) {
      const findItem = orderData?.find((elem) => elem.id === eventId);
      if (findItem) {
        setSelectedOrder(findItem);
        setIsLoading(false);
      } else {
        snackbar.error("Booking not found");
      }
    }
    if (eventId && show && eventType === EventTypesEnum.TASK) {
      const findItem = taskData?.find((elem) => elem.id === eventId);
      if (findItem) {
        setSelectedTask(findItem);
        setIsLoading(false);
      } else {
        snackbar.error("Task not found");
      }
    }
  }, [show, eventId]);
  if (isLoading && show) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        {/* Code block starts */}
        <div
          className={`absolute inset-0 sm:left-auto z-20 transform shadow-xl transition-transform duration-200 ease-in-out ${
            show ? "translate-x-" : "translate-x-full"
          }`}
        >
          {eventType === EventTypesEnum.ORDER ? (
            <div className="sticky top-16 bg-slate-50 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-[calc(100vh-64px)]">
              <button
                className="absolute top-0 right-0 mt-6 mr-6 group p-2"
                onClick={() => {
                  hide();
                }}
              >
                <svg
                  className="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
                </svg>
              </button>
              <div className="py-8 px-4 lg:px-8">
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <div className="text-slate-800 font-semibold text-center mb-1">
                    Booking Details
                  </div>
                  <div className="text-sm text-center italic">
                    {selectedOrder &&
                      selectedOrder.order_job_start_timestamp &&
                      moment
                        .unix(selectedOrder.order_job_start_timestamp)
                        .tz(userTimezone)
                        .format("YYYY-MM-DD HH:mm")}
                  </div>
                  {/* Details */}
                  <div className="drop-shadow-lg mt-12">
                    {/* Top */}
                    <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                      <div className="mb-3 text-center">
                        {/* <img
                      className="inline-flex w-12 h-12 rounded-full -mt-6"
                      src={Image}
                      width="48"
                      height="48"
                      alt="Transaction 04"
                    /> */}
                      </div>
                      <div className="text-2xl font-semibold text-emerald-500 mb-1">
                        {selectedOrder?.customerObject.first_name}{" "}
                        {selectedOrder?.customerObject.last_name}
                      </div>

                      {selectedOrder?.tags.map((elem, index) => {
                        return (
                          <div
                            key={`${elem}_event_viewer_tag_${index}`}
                            className="text-xs inline-flex font-medium bg-slate-100 text-slate-500 rounded-full text-center px-2.5 py-1"
                          >
                            {elem}
                          </div>
                        );
                      })}
                    </div>
                    {/* Divider */}
                    <div
                      className="flex justify-between items-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-5 h-5 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                      <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                        <div className="h-px w-full border-t border-dashed border-slate-200" />
                      </div>
                      <svg
                        className="w-5 h-5 fill-white rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                    </div>
                    {/* Bottom */}
                    <div className="bg-white rounded-b-xl p-5 pt-2.5 text-sm space-y-3">
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Email:</span>
                        <span className="font-medium text-slate-700 text-right">
                          {selectedOrder?.customerObject.email}
                        </span>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Phone:</span>
                        <span className="font-medium text-slate-700 text-right">
                          {selectedOrder?.customerObject.phone_number}
                        </span>
                      </div>

                      <div className="flex justify-between space-x-1">
                        <span className="italic">Address:</span>
                        <div>
                          <span className="font-medium text-slate-700 text-right">
                            {selectedOrder?.customerObject.address_line_1}{" "}
                            {selectedOrder?.customerObject.address_line_2}
                          </span>
                          <br />
                          <span className="font-medium text-slate-700 text-right">
                            {selectedOrder?.customerObject.city}
                            {"-"}
                            {selectedOrder?.customerObject.post_code}
                          </span>
                          <br />
                          <span className="font-medium text-slate-700 text-right">
                            {selectedOrder?.customerObject.country}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Payment Status:</span>

                        {selectedOrder?.order_payment_completed ? (
                          <span className="font-medium text-emerald-500 mb-1 text-right">
                            Paid
                          </span>
                        ) : (
                          <span className="font-medium text-red-700 text-right">
                            Not Paid
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedOrder && selectedOrder.notes ? (
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        Booking Notes
                      </div>
                      <label className="sr-only" htmlFor="notes">
                        view note
                      </label>
                      <textarea
                        disabled
                        className="form-textarea w-full focus:border-slate-300 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        rows={4}
                        placeholder="No notes"
                        value={selectedOrder.notes}
                        onChange={(e) => {}}
                      />
                    </div>
                  ) : (
                    <div className="mt-6">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        Booking Notes
                      </div>
                      <label className="sr-only" htmlFor="notes">
                        view note
                      </label>
                      <textarea
                        disabled
                        className="form-textarea w-full focus:border-slate-300 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                        rows={4}
                        placeholder="No notes"
                        value={"No notes available"}
                        onChange={(e) => {}}
                      />
                    </div>
                  )}

                  {/* Download / Report */}
                  <div className="flex items-center space-x-3 mt-6">
                    <div className="w-1/2">
                      <button
                        className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600"
                        onClick={() => {
                          if (selectedOrder && selectedOrder.id) {
                            navigate(`/job/edit/${selectedOrder.id}`);
                          } else {
                            snackbar.error("invalid id");
                          }
                        }}
                      >
                        <span className="ml-2">Edit Booking</span>
                      </button>
                    </div>
                    <div className="w-1/2">
                      <button
                        className="btn w-full border-slate-200 hover:border-slate-300 text-rose-500"
                        onClick={() => {
                          hide();
                        }}
                      >
                        <span>Close</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-16 bg-slate-50 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-[calc(100vh-64px)]">
              <button
                className="absolute top-0 right-0 mt-6 mr-6 group p-2"
                onClick={() => {
                  hide();
                }}
              >
                <svg
                  className="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
                </svg>
              </button>
              <div className="py-8 px-4 lg:px-8">
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <div className="text-slate-800 font-semibold text-center mb-1">
                    Task Details
                  </div>
                  <div className="text-sm text-center italic">
                    {selectedTask &&
                      selectedTask.task_calendar_timestamp &&
                      moment
                        .unix(selectedTask.task_calendar_timestamp)
                        .tz(userTimezone)
                        .format("YYYY-MM-DD HH:mm")}
                  </div>
                  {/* Details */}
                  <div className="drop-shadow-lg mt-12">
                    {/* Top */}
                    <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                      <div className="mb-3 text-center">
                        {/* <img
                    className="inline-flex w-12 h-12 rounded-full -mt-6"
                    src={Image}
                    width="48"
                    height="48"
                    alt="Transaction 04"
                  /> */}
                      </div>
                      <div className="text-2xl font-semibold text-emerald-500 mb-1">
                        {selectedTask?.description}
                      </div>
                    </div>
                    {/* Divider */}
                    <div
                      className="flex justify-between items-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-5 h-5 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                      <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                        <div className="h-px w-full border-t border-dashed border-slate-200" />
                      </div>
                      <svg
                        className="w-5 h-5 fill-white rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                      </svg>
                    </div>
                    {/* Bottom */}
                    <div className="bg-white rounded-b-xl p-5 pt-2.5 text-sm space-y-3">
                      <div className="flex justify-between space-x-1">
                        <span className="italic">Description:</span>
                        <span className="font-medium text-slate-700 text-right">
                          {selectedTask?.description}
                        </span>
                      </div>

                      <div className="flex justify-between space-x-1">
                        <span className="italic">Created By:</span>

                        <span className="font-medium text-emerald-500 mb-1 text-right">
                          {selectedTask?.createdByUser}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download / Report */}
                  <div className="flex items-center space-x-3 mt-6">
                    <div className="w-1/2">
                      <button
                        className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600"
                        onClick={() => {
                          if (selectedTask && selectedTask.id) {
                            handleEditTask(selectedTask.id);
                            hide();
                          } else {
                            snackbar.error("invalid id");
                          }
                        }}
                      >
                        <span className="ml-2">Edit Task</span>
                      </button>
                    </div>
                    <div className="w-1/2">
                      {formSubmitting ? (
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
                          className="btn w-full border-slate-200 hover:border-slate-300 text-rose-500"
                          onClick={() => {
                            if (selectedTask && selectedTask.id) {
                              handleDeleteTask(selectedTask.id);
                            }
                          }}
                        >
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Code block ends */}
      </>
    );
  }
}

export default CalendarEventBookingViewer;
