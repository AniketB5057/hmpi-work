import { useCallback, useEffect, useRef, useState } from "react";

import moment from "moment";
import "moment-timezone";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthProvider";
import { useSnackbar } from "../contexts/SnackbarProvider";
import { useQueryClient } from "react-query";
import { useOrdersByCalendar } from "../hooks/orders/useOrder";
import DropdownOnDayClick from "./components/calendar/DropdownOnDayClick";
import { makeid } from "../utils/commonFunctions";
import AddUpdateTaskForm from "./components/tasks/AddTasksForm";
import { useAddTask } from "../hooks/tasks/useAddTask";
import { useTasks } from "../hooks/tasks/useTask";
import { useDeleteTasks } from "../hooks/tasks/useDeleteTasks";
import { useUpdateTask } from "../hooks/tasks/useUpdateTask";
import { Task } from "../types/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalCalendarSettings from "./components/calendar/ModalCalendarSettings";
import tinycolor from "tinycolor2";
import CalendarEventBookingViewer from "./components/calendar/CalendarEventBookingViewer";
import { Popover } from "./components/Popover";
export enum EventTypesEnum {
  ORDER = "ORDER",
  TASK = "TASK",
}
export interface CalendarEventTypes {
  id: string;
  eventStart: Date;
  eventName: string;
  eventColor: string;
  eventType: EventTypesEnum;
  eventEnd: Date;
}
function Calendar() {
  const today = new Date();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = useAuth();
  const snackbar = useSnackbar();
  const [taskDeleted, setTaskDeleted] = useState<string[]>([]);
  const getTasksHook = useTasks();
  const [showCalendarSettings, setShowCalendarSettings] = useState(false);
  const [timestampForTask, setTimestampForTask] = useState(moment().unix());
  const [taskUpdated, setTaskUpdated] = useState<Task | undefined>(undefined);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const { addTask, isAdding } = useAddTask();
  const { deleteTasks, isDeleting } = useDeleteTasks();
  const { isUpdating, updateTask } = useUpdateTask();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventTypeToView, setSelectedEventTypeToView] = useState<{
    id: string | null;
    eventType: EventTypesEnum;
  }>({
    id: null,
    eventType: EventTypesEnum.ORDER,
  });
  const [anchorEl, setAnchorEl] = useState<DOMRect | null>(null);

  const onOpen = (rect: DOMRect) => {
    setAnchorEl(rect);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const processing = isAdding || isDeleting || isUpdating;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [month, setMonth] = useState(today.getMonth());
  const [orderListEvent, setOrderListEvent] = useState<CalendarEventTypes[]>(
    []
  );
  const [combinedList, setCombinedList] = useState<CalendarEventTypes[]>([]);

  // eslint-disable-next-line no-unused-vars
  const [year, setYear] = useState(today.getFullYear());
  const timezone =
    userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess();

  const calendarsDataHook = useOrdersByCalendar(
    moment(`${month + 1}-${year}`, "MM-YYYY")
      .startOf("month")
      .unix(),
    moment(`${month + 1}-${year}`, "MM-YYYY")
      .endOf("month")
      .unix()
  );
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [startingBlankDays, setStartingBlankDays] = useState<number[]>([]);
  const [endingBlankDays, setEndingBlankDays] = useState<number[]>([]);

  const [tasksList, setTasksList] = useState<CalendarEventTypes[]>([]);

  const getTextColor = (eventColor: string) => {
    var eventBackgroundColorBrightness = tinycolor(eventColor);

    return eventBackgroundColorBrightness.isDark() ? `#ffffff` : `#000000`;
  };
  const handleAddTask = async (task: Partial<Task>) => {
    addTask(task as Task)
      .then(() => {
        snackbar.success(`Added task`);
        setOpenTaskDialog(false);
        queryClient.invalidateQueries("tasks");
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
        setOpenTaskDialog(false);
      });
  };

  const handleDeleteTasks = async (ids: string[]) => {
    deleteTasks(ids)
      .then(() => {
        queryClient.invalidateQueries("tasks");
        snackbar.success(`Deleted task`);

        setTaskDeleted([]);

        setOpenConfirmDeleteDialog(false);
        setIsOpen(false);
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
        setOpenTaskDialog(false);
      });
  };

  const handleUpdateTask = async (task: Task) => {
    updateTask(task)
      .then(() => {
        snackbar.success(`Updated task`);
        setOpenTaskDialog(false);
        setTaskUpdated(undefined);
        queryClient.invalidateQueries("tasks");
        queryClient.refetchQueries("tasks");
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
        setOpenTaskDialog(false);
      });
  };

  const isToday = (date: number) => {
    const day = new Date(year, month, date);
    return today.toDateString() === day.toDateString() ? true : false;
  };

  const getDays = () => {
    const days = new Date(year, month + 1, 0).getDate();

    // starting empty cells (previous month)
    const startingDayOfWeek = new Date(year, month).getDay();
    let startingBlankDaysArray = [];
    for (let i = 1; i <= startingDayOfWeek; i++) {
      startingBlankDaysArray.push(i);
    }

    // ending empty cells (next month)
    const endingDayOfWeek = new Date(year, month + 1, 0).getDay();
    let endingBlankDaysArray = [];
    for (let i = 1; i < 7 - endingDayOfWeek; i++) {
      endingBlankDaysArray.push(i);
    }

    // current month cells
    let daysArray = [];
    for (let i = 1; i <= days; i++) {
      daysArray.push(i);
    }

    setStartingBlankDays(startingBlankDaysArray);
    setEndingBlankDays(endingBlankDaysArray);
    setDaysInMonth(daysArray);
  };

  useEffect(() => {
    getDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  useEffect(() => {
    let mounted = true;

    if (mounted && userInfo) {
      if (calendarsDataHook.data && calendarsDataHook.data.data) {
        const eventData: CalendarEventTypes[] = calendarsDataHook.data.data.map(
          (elem) => {
            const stringParse = userInfo.eventStringFormat;
            const replacements: any = {
              first_name: elem.customerObject.first_name,
              seq_id: elem.order_sequence_id,
              last_name: elem.customerObject.last_name,
              zip_code: elem.customerObject.post_code,
              country: elem.customerObject.country,
              city: elem.customerObject.city,
              email: elem.customerObject.email,
              phone: elem.customerObject.phone_number,
            };

            const textFormatterFroEvents = stringParse.replace(
              /{{(\w+)}}/g,
              (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
                replacements.hasOwnProperty(placeholderWithoutDelimiters)
                  ? replacements[placeholderWithoutDelimiters]
                  : placeholderWithDelimiters
            );
            if (
              elem.order_job_start_timestamp &&
              elem.order_job_end_timestamp
            ) {
              return {
                id: `${elem.id}`,
                eventName: `${textFormatterFroEvents}`,
                eventColor: `${elem.calendar_color}`,
                eventType: EventTypesEnum.ORDER,
                eventStart: moment
                  .unix(elem.order_job_start_timestamp)
                  .tz(timezone)
                  .toDate(),
                eventEnd: moment
                  .unix(elem.order_job_end_timestamp)
                  .tz(timezone)
                  .toDate(),
              };
            } else {
              return {
                id: `${elem.id}`,
                eventName: `Booking without date #${elem.order_sequence_id}`,
                eventColor: `${elem.calendar_color}`,
                eventStart: moment().tz(timezone).toDate(),
                eventType: EventTypesEnum.ORDER,
                eventEnd: moment().tz(timezone).toDate(),
              };
            }
          }
        );

        setOrderListEvent([...eventData]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [userInfo, calendarsDataHook.data]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (getTasksHook.data) {
        const eventData: CalendarEventTypes[] = getTasksHook.data.map(
          (elem) => {
            return {
              id: `${elem.id}`,
              eventName: `#:${elem.title}`,
              eventColor: `${elem.calendar_color}`,
              eventType: EventTypesEnum.TASK,
              eventStart: moment
                .unix(elem.task_calendar_timestamp)
                .tz(timezone)
                .toDate(),
              eventEnd: moment
                .unix(elem.task_calendar_timestamp)
                .add(10, "minutes")
                .tz(timezone)
                .toDate(),
            };
          }
        );

        setTasksList([...eventData]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [getTasksHook.data]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setCombinedList([...orderListEvent, ...tasksList]);
    }
    return () => {
      mounted = false;
    };
  }, [orderListEvent, tasksList]);
  return (
    <>
      <AddUpdateTaskForm
        task={taskUpdated}
        setModalOpen={(val: boolean) => {
          setOpenTaskDialog(val);
        }}
        selectedTimestamp={timestampForTask}
        changeSelectedTimestamp={(val: number) => {
          setTimestampForTask(val);
        }}
        timezone={timezone}
        onAdd={handleAddTask}
        onUpdate={handleUpdateTask}
        onClose={() => {
          setTaskUpdated(undefined);
          setOpenTaskDialog(false);
        }}
        open={openTaskDialog}
        processing={isAdding || isUpdating}
      />
      {calendarsDataHook.isFetching && getTasksHook.isFetching ? (
        <LoadingSpinner />
      ) : (
        <></>
      )}
      <ModalCalendarSettings
        show={showCalendarSettings}
        setShow={setShowCalendarSettings}
      />
      <>
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <CalendarEventBookingViewer
            orderData={calendarsDataHook?.data?.data}
            taskData={getTasksHook.data}
            show={isOpen}
            eventType={selectedEventTypeToView.eventType}
            eventId={selectedEventTypeToView.id}
            handleDeleteTask={(id) => {
              const findTask = getTasksHook.data?.find((elem) => {
                return elem.id === id;
              });
              if (findTask) {
                handleDeleteTasks([findTask.id]);
              }
            }}
            handleEditTask={(id) => {
              const findTask = getTasksHook.data?.find((elem) => {
                return elem.id === id;
              });
              if (findTask) {
                setTaskUpdated(findTask);
                setOpenTaskDialog(true);
              }
            }}
            formSubmitting={processing}
            hide={() => {
              setIsOpen(false);
            }}
          />
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-4">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                <span>{`${monthNames[month]} ${year}`}</span>
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Settings Icon */}

              <button
                className="btn px-2.5 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                onClick={() => {
                  setShowCalendarSettings((val) => !val);
                }}
              >
                <span className="text-md mr-2">Calendar Settings</span>

                <wbr />
                <FontAwesomeIcon
                  icon={faGear}
                  className="fill-current text-slate-500"
                />
              </button>
              {/* Previous month button */}
              <button
                className="btn px-2.5 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                onClick={() => {
                  if (month === 0) {
                    setYear(year - 1);
                    setMonth(month - 1);
                  } else {
                    setMonth(month - 1);
                  }
                }}
              >
                <span className="sr-only">Previous month</span>
                <wbr />
                <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                  <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                </svg>
              </button>

              {/* Next month button */}
              <button
                className="btn px-2.5 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                onClick={() => {
                  if (month === 11) {
                    setYear(year + 1);
                    setMonth(0);
                  } else {
                    setMonth(month + 1);
                  }
                }}
              >
                <span className="sr-only">Next month</span>
                <wbr />
                <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
              </button>

              <hr className="w-px h-full bg-slate-200 mx-1" />

              {/* Create event button */}
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => {
                  navigate("/job/add");
                }}
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Create Booking</span>
              </button>
            </div>
          </div>

          {/* Filters and view buttons */}
          <div className="sm:flex sm:justify-between sm:items-center mb-4">
            {/* Filters  */}
            <div className="mb-4 sm:mb-0 mr-2">
              <ul className="flex flex-wrap items-center -m-1">
                {userInfo &&
                  userInfo.calendarOptions &&
                  userInfo.calendarOptions.map((calendar_color, index_c) => {
                    return (
                      <li
                        className="m-1"
                        key={`calendaroption-${calendar_color.text}-${index_c}`}
                        onClick={() => {
                          setShowCalendarSettings((val) => !val);
                        }}
                      >
                        <button className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-slate-500">
                          <div
                            className="w-1 h-3.5 shrink-0"
                            style={{
                              backgroundColor: `${calendar_color.color}`,
                            }}
                          ></div>
                          <span className="ml-1.5">{calendar_color.text}</span>
                        </button>
                      </li>
                    );
                  })}

                <li className="m-1">
                  <button
                    className="btn-sm bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
                    onClick={() => {
                      setShowCalendarSettings((val) => !val);
                    }}
                  >
                    +Add New
                  </button>
                </li>
              </ul>
            </div>

            {/* View buttons (requires custom integration) */}
            {/* <div className="flex flex-nowrap -space-x-px">
              <button className="btn bg-slate-50 border-slate-200 hover:bg-slate-50 text-indigo-500 rounded-none first:rounded-l last:rounded-r">
                Month
              </button>
              <button className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">
                Week
              </button>
              <button className="btn bg-white border-slate-200 hover:bg-slate-50 text-slate-600 rounded-none first:rounded-l last:rounded-r">
                Day
              </button>
            </div> */}
          </div>

          {/* <Popover anchorRect={anchorEl} isOpen={isOpen} onClose={onClose}>
            <CalendarEventViewer />
          </Popover> */}
          {/* Calendar table */}
          <div className="bg-white rounded-sm shadow overflow-hidden">
            {/* Days of the week */}
            <div className="grid grid-cols-7 gap-px border-b border-slate-200">
              {dayNames.map((day) => {
                return (
                  <div className="px-1 py-3" key={day}>
                    <div className="text-slate-500 text-sm font-medium text-center lg:hidden">
                      {day.substring(0, 3)}
                    </div>
                    <div className="text-slate-500 text-sm font-medium text-center hidden lg:block">
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-px bg-slate-200">
              {/* Diagonal stripes pattern */}
              <div
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2`}
              ></div>
              <svg className="sr-only">
                <defs>
                  <pattern
                    id="stripes"
                    patternUnits="userSpaceOnUse"
                    width="5"
                    height="5"
                    patternTransform="rotate(135)"
                  >
                    <line
                      className="stroke-current text-slate-200 opacity-50"
                      x1="0"
                      y="0"
                      x2="0"
                      y2="5"
                      strokeWidth="2"
                    />
                  </pattern>
                </defs>
              </svg>
              {/* Empty cells (previous month) */}
              {startingBlankDays.map((blankday) => {
                return (
                  <div
                    className="bg-slate-50 h-20 sm:h-28 lg:h-36"
                    key={blankday}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                    >
                      <rect width="100%" height="100%" fill="url(#stripes)" />
                    </svg>
                  </div>
                );
              })}
              {/* Days of the current month */}

              {daysInMonth.map((day) => {
                return (
                  <div className={`relative bg-white h-full `} key={day}>
                    <div className="h-full flex flex-col justify-between">
                      {/* Events */}
                      <div
                        className={`grow flex flex-col relative p-0.5 sm:p-1.5`}
                      >
                        <button
                          className={`inline-flex ml-auto w-6 h-6 items-center justify-center text-xs sm:text-sm font-medium text-center rounded-full hover:bg-indigo-100 ${
                            isToday(day) && "text-indigo-500"
                          }`}
                        >
                          {day}
                        </button>
                        {combinedList
                          .filter(
                            (e) =>
                              new Date(e.eventStart).toDateString() ===
                              new Date(year, month, day).toDateString()
                          )
                          .map((event, index) => {
                            return (
                              <button
                                className=" w-full text-left mb-1"
                                key={`${event.eventName}-${makeid(3)}`}
                              >
                                <div
                                  className={`px-2 py-0.5 rounded overflow-hidden`}
                                  style={{
                                    backgroundColor: `${event.eventColor}`,
                                    color: `${getTextColor(event.eventColor)}`,
                                  }}
                                  id={`${index}_node_popover_id_box`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedEventTypeToView({
                                      id: event.id,
                                      eventType: event.eventType,
                                    });
                                    setIsOpen(true);
                                  }}
                                >
                                  {/* Event name */}
                                  <div className="text-xs font-semibold truncate">
                                    {event.eventName}
                                  </div>
                                  {/* Event time */}
                                  <div className="text-xs uppercase truncate hidden sm:block">
                                    {/* Start date */}
                                    {event.eventStart && (
                                      <span>
                                        {event.eventStart.toLocaleTimeString(
                                          [],
                                          {
                                            hour12: true,
                                            hour: "numeric",
                                            minute: "numeric",
                                          }
                                        )}
                                      </span>
                                    )}
                                    {/* End date */}
                                    {event.eventEnd && (
                                      <span>
                                        -{" "}
                                        <span>
                                          {(
                                            event.eventEnd as Date
                                          ).toLocaleTimeString([], {
                                            hour12: true,
                                            hour: "numeric",
                                            minute: "numeric",
                                          })}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"
                          aria-hidden="true"
                        ></div>
                      </div>
                      {/* Cell footer */}
                      <div className="flex justify-between items-center p-0.5 sm:p-1.5">
                        {/* {getEvents(day).length > 2 && (
                        <button className="text-xs text-slate-500 font-medium whitespace-nowrap text-center sm:py-0.5 px-0.5 sm:px-2 border border-slate-200 rounded">
                          <span className="md:hidden">+ </span>
                          <span>{getEvents(day).length - 2}</span>
                          <span className="hidden md:inline">more</span>
                        </button>
                      )} */}

                        <div>
                          <DropdownOnDayClick className="relative inline-flex">
                            <li>
                              <button
                                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                                onClick={(e) => {
                                  setTimestampForTask(
                                    moment()
                                      .tz(timezone)
                                      .date(day)
                                      .month(month)
                                      .year(year)
                                      .unix()
                                  );
                                  setTaskUpdated(undefined);
                                  setOpenTaskDialog(true);
                                }}
                              >
                                + Add Task
                              </button>
                            </li>
                            {/* <li>
                              <button className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3">
                                + Add Reminder
                              </button>
                            </li> */}
                            <li>
                              <button
                                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(
                                    `/job/add?show_booking_time=1&day=${day}&month=${month}&year=${year}`
                                  );
                                }}
                              >
                                + Add Booking
                              </button>
                            </li>
                          </DropdownOnDayClick>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Empty cells (next month) */}
              {endingBlankDays.map((blankday) => {
                return (
                  <div
                    className="bg-slate-50 h-20 sm:h-28 lg:h-36"
                    key={blankday}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                    >
                      <rect width="100%" height="100%" fill="url(#stripes)" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Calendar;
