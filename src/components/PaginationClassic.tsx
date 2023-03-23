import React from "react"

export interface PaginationClassicProps {
  total_count: number
  prev_disabled: boolean
  next_disabled: boolean
  current_page: number
  dataSize: number
  handleNext: any
  handlePrevious: any
  showingFrom: string
  showingTo: string
}
function PaginationClassic(props: PaginationClassicProps) {
  const {
    total_count,
    prev_disabled,
    next_disabled,
    current_page,
    dataSize,
    handleNext,
    handlePrevious,
    showingFrom,
    showingTo,
  } = props
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            {prev_disabled ? (
              <button
                className="btn bg-white border-slate-200 text-slate-300 
            cursor-not-allowed"
                disabled={prev_disabled}
              >
                Previous
              </button>
            ) : (
              <button
                className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
                disabled={prev_disabled}
                onClick={() => {
                  handlePrevious()
                }}
              >
                Previous
              </button>
            )}
          </li>
          <li className="ml-3 first:ml-0">
            {next_disabled ? (
              <button
                className="btn bg-white border-slate-200 text-slate-300 
            cursor-not-allowed"
                disabled={next_disabled}
              >
                Next
              </button>
            ) : (
              <button
                className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
                disabled={next_disabled}
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </button>
            )}
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600">{showingFrom}</span> to{" "}
        <span className="font-medium text-slate-600">{showingTo}</span> of{" "}
        <span className="font-medium text-slate-600">{total_count}</span>{" "}
        results
      </div>
    </div>
  )
}

export default PaginationClassic
