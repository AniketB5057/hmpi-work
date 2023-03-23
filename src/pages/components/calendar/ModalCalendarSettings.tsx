import React, { useEffect, useState } from "react";
import ModalBasic from "../../../components/ModalBasic";
import { useAuth } from "../../../contexts/AuthProvider";
import { useSnackbar } from "../../../contexts/SnackbarProvider";
import { updateUser } from "../../../hooks/auth/useUpdateUserInfo";
import { CalendarColorOptions } from "../../../types/userInfo";
import { makeid } from "../../../utils/commonFunctions";
import { getItem } from "../../../utils/localStorage";
import DropdownColorSelection, {
  getColorDiv,
} from "../common/DropdownColorSelection";

export interface ModalCalendarSettingsProps {
  show: boolean;
  setShow: (val: boolean) => void;
}
function ModalCalendarSettings(props: ModalCalendarSettingsProps) {
  const { show, setShow } = props;
  const { userInfo, handleRefetch } = useAuth();
  const [newCalendarItemOption, setNewCalendarItemOption] =
    useState<CalendarColorOptions>({
      color: "",
      text: "",
    });
  const [calendarColorOptions, setCalendarColorOptions] = useState<
    CalendarColorOptions[]
  >([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const snackbar = useSnackbar();
  useEffect(() => {
    if (userInfo && userInfo.calendarOptions) {
      setCalendarColorOptions(userInfo.calendarOptions);
      setNewCalendarItemOption({
        color: "",
        text: "",
      });
    }
  }, [show]);

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      const colorsToSave = calendarColorOptions;
      newCalendarItemOption.color.length > 0 &&
        newCalendarItemOption.text.length > 0 &&
        colorsToSave.push(newCalendarItemOption);
      const data = await updateUser(getItem("authkey"), {
        calendarOptions: colorsToSave,
        eventStringFormat: userInfo?.eventStringFormat,
      });
      handleRefetch();
      setIsUpdating(false);
      setNewCalendarItemOption({
        color: "",
        text: "",
      });
      setShow(false);
    } catch (err: any) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message);
      } else {
        snackbar.error("Failed to save.");
      }
      setIsUpdating(false);
    }
  };
  return (
    <ModalBasic
      id="show-calendar-event-color-change"
      modalOpen={show}
      setModalOpen={setShow}
      title={`Calendar Settings`}
      size={"lg"}
    >
      {/* Modal content */}
      <div className="p-4">
        {calendarColorOptions.map((elem, index) => {
          return (
            <div
              className="flex gap-2 mt-2"
              key={`color-calendar-event-${index}`}
            >
              <span className="flex items-center">
                {getColorDiv(elem.color)}
              </span>
              <input
                value={elem.color}
                onChange={(e) => {
                  let tempColor = calendarColorOptions;
                  tempColor[index] = {
                    ...tempColor[index],
                    color: e.target.value,
                  };
                  setCalendarColorOptions([...tempColor]);
                }}
                className="form-input px-2 py-1"
                placeholder="New Color in Hex"
                type="text"
              />
              <input
                value={elem.text}
                onChange={(e) => {
                  let tempColor = calendarColorOptions;
                  tempColor[index] = {
                    ...tempColor[index],
                    text: e.target.value,
                  };
                  setCalendarColorOptions([...tempColor]);
                }}
                className="form-input px-2 py-1"
                type="text"
              />
              <button
                className="text-rose-500 hover:text-rose-600 rounded-full"
                onClick={() => {
                  let tempColor = calendarColorOptions;
                  tempColor.splice(index, 1);
                  setCalendarColorOptions([...tempColor]);
                }}
              >
                <span className="sr-only">Delete</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                  <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                </svg>
              </button>
            </div>
          );
        })}
        <div className="flex gap-2 mt-2">
          <span className="flex items-center">
            {getColorDiv(newCalendarItemOption.color)}
          </span>
          <input
            value={newCalendarItemOption.color}
            onChange={(e) => {
              setNewCalendarItemOption({
                ...newCalendarItemOption,
                color: e.target.value,
              });
            }}
            className="form-input px-2 py-1"
            placeholder="New Color in Hex"
            type="text"
          />
          <input
            value={newCalendarItemOption.text}
            onChange={(e) => {
              setNewCalendarItemOption({
                ...newCalendarItemOption,
                text: e.target.value,
              });
            }}
            placeholder="Name for Color"
            className="form-input px-2 py-1"
            type="text"
          />
          <button
            className="text-rose-500 hover:text-rose-600 rounded-full"
            onClick={() => {
              setNewCalendarItemOption({
                color: "",
                text: "",
              });
            }}
          >
            <span className="sr-only">Delete</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Modal footer */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          >
            Close
          </button>
          {isUpdating ? (
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
              <span className="ml-2">Saving</span>
            </button>
          ) : (
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </ModalBasic>
  );
}

export default ModalCalendarSettings;
