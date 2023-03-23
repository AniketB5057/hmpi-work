import React, { useEffect, useState } from "react"
import Transition from "../utils/Transition"

function Tooltip({
  children,
  className,
  bg,
  size,
  position,
  credits = `0`,
}: {
  children: any
  className?: string
  bg?: string
  size: string
  position: string
  credits?: string
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const positionOuterClasses = (position: string) => {
    switch (position) {
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2"
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2"
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2"
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2"
    }
  }

  const sizeClasses = (size: string) => {
    switch (size) {
      case "lg":
        return "min-w-72  p-3"
      case "md":
        return "min-w-56 p-3"
      case "sm":
        return "min-w-44 p-2"
      default:
        return "p-2"
    }
  }

  const positionInnerClasses = (position: string) => {
    switch (position) {
      case "right":
        return "ml-2"
      case "left":
        return "mr-2"
      case "bottom":
        return "mt-2"
      default:
        return "mb-2"
    }
  }

  return (
    <div
      className={`relative ${className} invisible md:visible`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      <div
        className="text-xs inline-flex font-medium bg-sky-100 text-sky-600 rounded-full text-center px-2.5 py-1"
        aria-expanded={tooltipOpen}
        onClick={(e) => e.preventDefault()}
      >
        Current Credits: {credits}
      </div>

      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        <Transition
          show={tooltipOpen}
          tag="div"
          className={`rounded overflow-hidden ${positionInnerClasses(
            position
          )}`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </div>
  )
}

export default Tooltip
