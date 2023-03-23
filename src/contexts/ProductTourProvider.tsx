import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

import { Steps, Hints, Step } from "intro.js-react"
import "intro.js/introjs.css"

interface ProductTourContextInterface {
  startTour: () => void
  stopTour: () => void
}

export const ProductTourContext = createContext(
  {} as ProductTourContextInterface
)

type ProductTourProviderProps = {
  children?: React.ReactNode
}

const ProductTourProvider = ({ children }: ProductTourProviderProps) => {
  const { userInfo } = useAuth()

  const [steps, setSteps] = useState<Step[]>([
    {
      element: ".intro-js-dashboard",
      intro: (
        <p>This is your dashboard. You will view your entire data here.</p>
      ),
      position: "right",
    },
    {
      element: ".intro-js-dashboard-menu",
      intro: <p>This your menu.</p>,
      position: "right",
    },
    {
      element: ".intro-js-bookings",
      intro: <p>Your bookings will be available here.</p>,
      position: "right",
    },
    {
      element: ".intro-js-calendar",
      intro: (
        <p>
          You can add bookings and tasks in calendar.
          <br /> Google Calendar Sync is coming soon.
        </p>
      ),
      position: "right",
    },
    {
      element: ".intro-js-invoices",
      intro: (
        <p>
          You can create invoice and send it to customer.
          <br /> You will have to complete & add payment method to accept
          digital payments from your customer.
        </p>
      ),
      position: "right",
    },
  ])
  const [productTourStatus, setProductTourStatus] = useState(false)
  const startTour = () => {
    setProductTourStatus(true)
  }
  const stopTour = () => {
    setProductTourStatus(false)
  }

  return (
    <ProductTourContext.Provider
      value={{
        startTour,
        stopTour,
      }}
    >
      <Steps
        enabled={productTourStatus}
        steps={steps}
        initialStep={0}
        options={{
          doneLabel: "Finish",
          hideNext: false,
        }}
        onExit={(val: number) => {
          setProductTourStatus(false)
        }}
      />
      {children}
    </ProductTourContext.Provider>
  )
}

export function useProductTour() {
  return useContext(ProductTourContext)
}

export default ProductTourProvider
