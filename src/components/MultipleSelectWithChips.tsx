import React, { useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"

export interface MultipleSelectChips {
  allOptions: string[]
  onSelect: (val: string) => void
  selectedOptions: string[]
  onRemove: (val: string) => void
  inputVal: string
  setInputVal: (val: string) => void
  addNewVal: () => void
}
function MultipleSelectWithChips(props: MultipleSelectChips) {
  const {
    allOptions,
    onSelect,
    onRemove,
    selectedOptions,
    inputVal,
    setInputVal,
    addNewVal,
  } = props
  const [showSelectOptions, setShowSelectOptions] = useState(false)
  const refForHook = useRef<any>(null)
  const handleClickOutside = () => {
    // Your custom logic here
    setShowSelectOptions(false)
  }

  const handleClickInside = () => {
    // Your custom logic here
  }
  useOnClickOutside(refForHook, handleClickOutside)
  return (
    <div ref={refForHook} className="w-full flex flex-col items-center mx-auto">
      <div className="w-full">
        <div className="text-left">
          <label className="block text-sm font-bold mb-1">
            Booking Tags
            <span className="text-xs font-semi text-rose-500">
              {` (Select from list`}
            </span>
            <span className="text-xs">{` or `} </span>
            <span className="text-xs text-indigo-500">
              Press enter to create new tags{`)`}
            </span>
          </label>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="w-full  svelte-1l8159u">
            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
              <div className="flex flex-auto flex-wrap">
                {selectedOptions.map((elem_tag_selected) => {
                  return (
                    <div
                      key={elem_tag_selected}
                      className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                    >
                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                        {elem_tag_selected}
                      </div>
                      <div className="flex flex-auto flex-row-reverse">
                        <div
                          onClick={() => {
                            onRemove(elem_tag_selected)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                          >
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="flex-1">
                  <input
                    onClick={(e) => {
                      e.preventDefault()
                      setShowSelectOptions((elem) => !elem)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.keyCode === 13) {
                        // Do something

                        addNewVal()
                        setShowSelectOptions(false)
                      }
                    }}
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value)
                    }}
                    placeholder="Search or add tags here..."
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </div>
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                <button
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-up w-4 h-4"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {showSelectOptions && (
            <div
              className="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
              style={{
                top: "100%",
                maxHeight: "300px",
              }}
            >
              <div className="flex flex-col w-full">
                {allOptions.map((elem_val) => {
                  return (
                    <div
                      className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-indigo-400 hover:text-white"
                      key={`${elem_val}_key_options`}
                      onClick={() => {
                        onSelect(elem_val)
                        setShowSelectOptions(false)
                      }}
                    >
                      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-indigo-100">
                        <div className="w-full items-center flex">
                          <div className="mx-2 leading-6  ">{elem_val} </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MultipleSelectWithChips
