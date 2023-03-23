import React, { useState, useRef, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthProvider"
import { CalendarColorOptions } from "../../../types/userInfo"
import Transition from "../../../utils/Transition"

export interface DropdownColorSelectionProps {
  handleChange: (val: CalendarColorOptions) => void
  selectedValue: CalendarColorOptions
  position: string
}
export const getColorDiv = (color: string) => {
  return (
    <div
      className={`w-5 h-3.5 shrink-0 py-2 px-2`}
      style={{
        backgroundColor: `${color}`,
      }}
    ></div>
  )
}
function DropdownColorSelection(props: DropdownColorSelectionProps) {
  const { handleChange, selectedValue, position } = props
  const { userInfo } = useAuth()
  const [options, setOptions] = useState<{ color: string; text: string }[]>([])

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const trigger = useRef<any>(null)
  const dropdown = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (userInfo && userInfo.calendarOptions) {
        setOptions(userInfo.calendarOptions)
      }
    }
    return () => {
      mounted = false
    }
  }, [userInfo])
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn justify-between min-w-44 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-label="Select date range"
        aria-haspopup="true"
        onClick={(e) => {
          e.preventDefault()
          setDropdownOpen(!dropdownOpen)
        }}
        aria-expanded={dropdownOpen}
      >
        <span className="flex items-center">
          {getColorDiv(selectedValue.color)}
          <span>{selectedValue.text}</span>
        </span>
        <svg
          className="shrink-0 ml-1 fill-current text-slate-400"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`z-10 absolute ${
          position === "top" ? `bottom-full` : `top-full`
        } left-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1`}
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-sm text-slate-600"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {options.map((option) => {
            return (
              <button
                key={option.text}
                className={`flex items-center w-full hover:bg-slate-50 py-1 px-3 cursor-pointer ${
                  option.text === selectedValue.text && "text-indigo-500"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleChange(option)
                  setDropdownOpen(false)
                }}
              >
                <svg
                  className={`shrink-0 mr-2 fill-current text-indigo-500 ${
                    option.text !== selectedValue.text && "invisible"
                  }`}
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                </svg>
                {getColorDiv(option.color)}
                <span className="text-center">{option.text}</span>
              </button>
            )
          })}
        </div>
      </Transition>
    </div>
  )
}

export default DropdownColorSelection
