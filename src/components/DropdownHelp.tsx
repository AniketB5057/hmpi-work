import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { LiveChatContext } from "../contexts/LiveChatProvider"
import Transition from "../utils/Transition"

function DropdownHelp({ align }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { openLiveChat } = useContext(LiveChatContext)
  const trigger = useRef<any>(null)
  const dropdown = useRef<any>(null)

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
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={(e) => {
          e.preventDefault()
          openLiveChat()
          // setDropdownOpen(false)
          // setDropdownOpen(true)
        }}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Live Help?</span>
        <FontAwesomeIcon
          icon={faHeadset}
          className="fill-current text-slate-500"
        />
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            Need help?
          </div>
          <ul>
            <li>
              <span
                className="cursor-pointer font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={(e) => {
                  e.preventDefault()

                  setDropdownOpen(!dropdownOpen)
                }}
              >
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="fill-current text-indigo-300 mr-2"
                />
                <span>Contact Support</span>
              </span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownHelp
