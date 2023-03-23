import { useRef, useEffect, useState, useCallback } from "react"
import { Portal } from "./Portal"

const debounce = (func: any, wait = 100, immediate = false) => {
  let timeout: any
  return function () {
    // @ts-ignore
    const context = this
    const args = arguments
    let later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

const getOffsetTop = (rect: DOMRect, vertical: string) => {
  if (vertical === "bottom") {
    return rect.height
  }

  if (vertical === "center") {
    return rect.height / 2
  }

  //top
  return 0
}

const getOffsetLeft = (rect: DOMRect, horizontal: string) => {
  if (horizontal === "right") {
    return rect.width
  }
  if (horizontal === "center") {
    return rect.width / 2
  }
  //left
  return 0
}

export const Popover = ({
  isOpen = true,
  onClose,
  anchorRect,
  anchorOrigin = { vertical: "center", horizontal: "left" },
  marginThreshold = 16,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  anchorRect: DOMRect | null
  anchorOrigin?: { vertical: string horizontal: string }
  marginThreshold?: number
  children: any
}) => {
  const [contentEl, setContentEl] = useState<HTMLElement>()

  const onCloseHandler = (e: any) => {
    e.stopPropagation()

    if (e.target !== e.currentTarget) {
      return
    }

    if (onClose) {
      onClose()
    }
  }

  const contentRef = useCallback((node: any) => {
    if (node) {
      setContentEl(node)
    }
  }, [])

  const getAnchorOffset = () => {
    if (anchorRect) {
      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
        left:
          anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      }
    } else
      return {
        top: 0,
        left: 0,
      }
  }

  const getPositioningStyle = () => {
    const anchorOffset = getAnchorOffset()

    let top = anchorOffset.top
    let left = anchorOffset.left
    const bottom = top + (contentEl as HTMLElement).offsetHeight
    const right = left + (contentEl as HTMLElement).offsetWidth

    const heightThreshold = window.innerHeight - marginThreshold
    const widthThreshold = window.innerWidth - marginThreshold

    if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold
      top = top - diff
    }

    if (right > widthThreshold) {
      const diff = right - widthThreshold
      left = left - diff
    }

    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
    }
  }

  const setPositionStyles = () => {
    if (!contentEl) {
      return
    }
    const styles = getPositioningStyle()
    contentEl.style.top = styles.top
    contentEl.style.left = styles.left
  }

  useEffect(() => {
    setPositionStyles()
    const onResize = debounce(() => {
      setPositionStyles()
    })

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [setPositionStyles])

  return (
    <Portal>
      {(isOpen && (
        <div
          onClick={onCloseHandler}
          className="w-full fixed top-0 left-0 bottom-0 right-0"
        >
          <div
            ref={contentRef}
            className="bg-white min-w-fit border rounded rounded-sm shadow-xl absolute"
          >
            {children}
          </div>
        </div>
      )) ||
        null}
    </Portal>
  )
}
