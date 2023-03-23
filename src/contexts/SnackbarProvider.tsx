import React, { createContext, useContext, useState } from "react"
import SnackbarToast from "../components/SnackbarToast"
interface SnackbarContextInterface {
  error: (newMessage: string) => void
  success: (newMessage: string) => void
}

export const SnackbarContext = createContext({} as SnackbarContextInterface)

type SnackbarProviderProps = {
  children: React.ReactNode
}

export enum ToastTypes {
  warning = "warning",
  error = "error",
  success = "success",
}
export enum ToastPositionTypes {
  top_right = "top_right",
}
const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<ToastTypes | undefined>(undefined)

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const autoHide = (time: number) => {
    setTimeout(() => {
      setOpen(false)
    }, time * 1000)
  }
  const error = (newMessage: string) => {
    setMessage(newMessage)
    setSeverity(ToastTypes.error)
    setOpen(true)
    autoHide(5)
  }

  const success = (newMessage: string) => {
    setMessage(newMessage)
    setSeverity(ToastTypes.success)
    setOpen(true)
    autoHide(5)
  }

  return (
    <SnackbarContext.Provider value={{ error, success }}>
      {children}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "25px",
        }}
      >
        <SnackbarToast
          className={"z-20"}
          type={severity}
          open={open}
          setOpen={setOpen}
        >
          {message}
        </SnackbarToast>
      </div>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  return useContext(SnackbarContext)
}

export default SnackbarProvider
