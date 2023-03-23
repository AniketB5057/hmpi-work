import React, { useState } from "react"
import { Link } from "react-router-dom"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"

import NotFoundImage from "../images/404-illustration.svg"
import { userInfo } from "os"
import { useAuth } from "../contexts/AuthProvider"

function PaymentSuccess() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { userInfo } = useAuth()

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="max-w-2xl m-auto mt-16">
          <div className="text-center px-4">
            <div className="inline-flex mb-8">
              <img
                src={NotFoundImage}
                width="176"
                height="176"
                alt="404 illustration"
              />
            </div>
            <div className="mb-6">
              Thanks for your payment. You will recieve an email about the same.
            </div>
            {/* <Link
                to="/signin"
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Back To Signin
              </Link> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentSuccess
