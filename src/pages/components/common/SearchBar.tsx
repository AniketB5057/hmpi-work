import Downshift from "downshift"
import { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"
export interface iItemType {
  title: string
  sub_title: string
  key: any
}
export interface SearchBarProps {
  showError: boolean
  value: any
  onChange: any
  data?: iItemType[]
  isLoading: boolean
  label: string
  id: string
  showAddNewButton?: boolean
  addNewButtonText?: string
  onHandleSelect: any
  onHandleAddNew: any
}
export default function SearchBar(props: SearchBarProps) {
  const {
    showError,
    value,
    onChange,
    label,
    data,
    id,
    onHandleSelect,
    isLoading,
    onHandleAddNew,
    showAddNewButton = false,
    addNewButtonText = "",
  } = props
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false)

  const refForHook = useRef(null)

  const handleClickOutside = () => {
    // Your custom logic here
    setIsOpenSearchBar(false)
  }

  const handleClickInside = () => {
    // Your custom logic here
  }
  useOnClickOutside(refForHook, handleClickOutside)
  // Hook

  useEffect(() => {
    if (value && value.length > 0) {
      setIsOpenSearchBar(true)
    }
  }, [value])
  return (
    <div ref={refForHook}>
      <Downshift
        onChange={(selection) => {}}
        itemToString={(item) => (item ? item : "")}
        inputValue={value}
        isOpen={isOpenSearchBar}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          setHighlightedIndex,
          selectedItem,
        }) => {
          return (
            <div>
              <label
                {...getLabelProps()}
                className="block text-sm font-medium mb-1"
                htmlFor={id}
              >
                {label}
                <span className="text-rose-500">
                  {isLoading && (
                    <svg
                      role="status"
                      className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                </span>
              </label>
              <div className="relative">
                <input
                  {...getInputProps()}
                  id={id}
                  className="pl-9 w-1/2 border-slate-200 rounded outline-none p-2 text-[14px] font-[400]  text-textGray"
                  type="search"
                  value={value}
                  onChange={onChange}
                  placeholder="Search here..."
                  onClick={() => {
                    setIsOpenSearchBar(true)
                  }}
                  onFocus={() => {
                    setIsOpenSearchBar(true)
                  }}
                />
                <button
                  className="absolute inset-0 right-auto group"
                  type="button"
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
              </div>

              {showError && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"></span>
              )}

              <ul
                className={`rounded 
            absolute w-100 bg-white border mt-2 ${
              !isOpen ? "hidden" : ""
            } z-30`}
                {...getMenuProps()}
              >
                {showAddNewButton && (
                  <div className="px-2 py-2">
                    <button
                      className="btn border-slate-200 hover:border-slate-300 text-slate-600"
                      onClick={(e) => {
                        e.preventDefault()
                        onHandleAddNew()
                      }}
                    >
                      <svg
                        className="w-2 h-2 fill-current opacity-50 shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="ml-2">
                        {" "}
                        {inputValue && inputValue.length > 0
                          ? `Add new ${addNewButtonText}: ${inputValue}`
                          : `Add new ${addNewButtonText}`}
                      </span>
                    </button>
                  </div>
                )}

                {data && data.length > 0 && (
                  <div className="p-2 font-bold">{"Results:"}</div>
                )}
                {isLoading ? (
                  //   <LoadingSpinner />
                  <></>
                ) : (
                  <>
                    {isOpen && data && data.length > 0
                      ? data
                          .filter(
                            (item) =>
                              !inputValue ||
                              item.title
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) ||
                              item.sub_title
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                          )
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.key,
                                index,
                                item,
                                className: `py-2 px-2 ${
                                  highlightedIndex === index
                                    ? "bg-indigo-500 text-white font-normal"
                                    : "bg-white font-normal"
                                }`,
                              })}
                              onClick={(e) => {
                                e.preventDefault()
                                onHandleSelect(item)
                                setIsOpenSearchBar(false)
                              }}
                            >
                              {item.title} {` `}
                              <span className="font-light">
                                {item.sub_title}
                              </span>
                            </li>
                          ))
                      : null}
                  </>
                )}
              </ul>
            </div>
          )
        }}
      </Downshift>
    </div>
  )
}
