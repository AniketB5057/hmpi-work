import { useFormik } from "formik"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import * as Yup from "yup"
import ModalBasic from "../../../components/ModalBasic"
import { useAuth } from "../../../contexts/AuthProvider"
import { Task } from "../../../types/task"
import { CalendarColorOptions } from "../../../types/userInfo"
import DropdownColorSelection from "../common/DropdownColorSelection"
export type TaskDialogProps = {
  onAdd: (task: Partial<Task>) => void
  onClose: () => void
  onUpdate: (task: Task) => void
  open: boolean
  processing: boolean
  task?: Task
  setModalOpen: (val: boolean) => void
  selectedTimestamp: number
  changeSelectedTimestamp: (val: number) => void
  timezone: string
}

function AddUpdateTaskForm(props: TaskDialogProps) {
  const {
    onAdd,
    onClose,
    onUpdate,
    open,
    processing,
    task,
    setModalOpen,
    selectedTimestamp,
    changeSelectedTimestamp,
    timezone,
  } = props

  const hour = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]
  const minutes_with_am_pm = [
    "00 AM",
    "15 AM",
    "30 AM",
    "45 AM",
    "00 PM",
    "15 PM",
    "30 PM",
    "45 PM",
  ]
  const { userInfo } = useAuth()
  const [selectedCalendarColor, setSelectedCalendarColor] =
    useState<CalendarColorOptions>({
      color: "#4ade80",
      text: "Green",
    })
  const [remindCheckbox, setRemindCheckbox] = useState(false)
  const editMode = Boolean(task && task.id)
  const taskSelectedDateRef = useRef<any>(null)
  const [selectedHour, setSelectedHour] = useState("11")
  const [selectedMinutes, setSelectedMinutes] = useState("00 AM")
  const [selectedDate, setSelectedDate] = useState(
    moment().tz(timezone).format("YYYY-MM-DD")
  )
  const handleSubmit = (values: Partial<Task>) => {
    const modifiedValue: Partial<Task> = {
      ...values,
      should_remind: remindCheckbox,
      reminder_timestamp: moment
        .unix(selectedTimestamp)
        .subtract(10, "minutes")
        .unix(),
      task_calendar_timestamp: selectedTimestamp,
      calendar_color: selectedCalendarColor.color,
    }
    if (task && task.id) {
      onUpdate({ ...modifiedValue, id: task.id } as Task)
    } else {
      onAdd(modifiedValue)
    }
  }
  useEffect(() => {
    if (open) {
      setSelectedDate(moment.unix(selectedTimestamp).format("YYYY-MM-DD"))
    }
  }, [open])
  useEffect(() => {
    let momentTimestamp = moment(
      `${selectedDate} ${selectedHour}:${selectedMinutes}`,
      "YYYY-MM-DD hh:mm A"
    )
      .tz(timezone)
      .unix()
    changeSelectedTimestamp(momentTimestamp)
  }, [selectedDate, selectedHour, selectedMinutes])
  useEffect(() => {
    if (task && task.id) {
      if (task && task.calendar_color) {
        if (userInfo && userInfo.calendarOptions) {
          let tempColor = userInfo.calendarOptions.find(
            (elem) =>
              elem.color.toLowerCase() === task.calendar_color.toLowerCase()
          )

          setSelectedCalendarColor(
            tempColor ? tempColor : selectedCalendarColor
          )
        }
      }

      formik.setValues({
        ...task,
      })
    } else {
      formik.setValues({ ...formik.initialValues })
    }
  }, [task])

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      employee_ids: task ? task.employee_ids : [],
      customer_ids: task ? task.customer_ids : [],
      location_ids: task ? task.location_ids : [],
      title: task ? task.title : ``,
      description: task ? task.description : "",
      calendar_color: task ? task.calendar_color : selectedCalendarColor.color,
      task_calendar_timestamp: task
        ? task.task_calendar_timestamp
        : moment().unix(),
      should_remind: task ? task.should_remind : false,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(400, `title`).required(`Title required`),
      description: Yup.string()
        .max(400, `description`)
        .required(`Description required`),
      should_remind: Yup.boolean().required("Should remind ?"),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <>
      <ModalBasic
        id="add-update-task-modal"
        modalOpen={open}
        setModalOpen={setModalOpen}
        title={editMode ? `Update task` : `Add task`}
        fullScreen
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(keyEvent) => {
            if (keyEvent.code === "Enter") {
              keyEvent.preventDefault()
            }
          }}
        >
          <div className="px-5 py-4">
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="first_name"
                  >
                    Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="title"
                    className="form-input w-full px-2 py-1"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.title && Boolean(formik.errors.title) && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {formik.touched.title && formik.errors.title}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 ">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="first_name"
                  >
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    className="form-input w-full px-2 py-1"
                    rows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.touched.description &&
                    Boolean(formik.errors.description) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.description &&
                          formik.errors.description}
                      </span>
                    )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex">
                  <div className="items-center gap-2 ">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="task_selected_date"
                      onClick={() => {
                        taskSelectedDateRef.current.showPicker()
                      }}
                    >
                      Task Date:{" "}
                    </label>
                    <input
                      type="date"
                      id="task_selected_date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value)
                      }}
                      onClick={() => {
                        taskSelectedDateRef.current.showPicker()
                      }}
                      ref={taskSelectedDateRef}
                      className="appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1"
                    />
                  </div>
                  <div className="items-center ml-2 gap-2 ">
                    <label className="block text-sm font-medium mb-1">
                      Task Time:{" "}
                    </label>
                    <select
                      name="time_hour"
                      value={selectedHour}
                      onChange={(e) => {
                        setSelectedHour(e.target.value)
                      }}
                      className="py-2 px-2 outline-none appearance-none  rounded-lg w-16"
                    >
                      {hour.map((elem, index) => {
                        return (
                          <option value={elem} key={`${elem}-${index}`}>
                            {elem}
                          </option>
                        )
                      })}
                    </select>
                    <select
                      name="time_minutes"
                      className="ml-2 mr-2 py-2 px-2 outline-none appearance-none  rounded-lg w-24"
                      value={selectedMinutes}
                      onChange={(e) => {
                        setSelectedMinutes(e.target.value)
                      }}
                    >
                      {minutes_with_am_pm.map((elem, index) => {
                        return (
                          <option value={elem} key={`${elem}-${index}`}>
                            {elem}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="flex">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="order_calendar_color"
                  >
                    Calendar Color <span className="text-rose-500">*</span>
                  </label>
                  <DropdownColorSelection
                    position={"top"}
                    selectedValue={selectedCalendarColor}
                    handleChange={(val: CalendarColorOptions) => {
                      setSelectedCalendarColor(val)
                    }}
                  />
                </div>
                {/* <div className="ml-2"> 
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="reminder_checkbox"
                  >
                    Set Reminder :
                    <input
                      className="form-checkbox ml-2"
                      type="checkbox"
                      checked={remindCheckbox}
                      onChange={(e) => {
                        setRemindCheckbox(e.target.checked)
                      }}
                    />
                  </label>
                  <span className="font-medium tracking-wide text-gray-500 text-xs mt-1 ml-1">{`(You will get reminder 10 minutes before via text & email)`}</span>{" "}
                </div> */}
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  //   setFeedbackModalOpen(false)
                  onClose()
                }}
              >
                Cancel
              </button>
              {processing ? (
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
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="submit"
                >
                  {editMode ? `Update Task` : `Create New Task`}
                </button>
              )}
            </div>
          </div>
        </form>
      </ModalBasic>
    </>
  )
}

export default AddUpdateTaskForm
