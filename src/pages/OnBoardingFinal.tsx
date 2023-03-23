import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import OnboardingImage from "../images/onboarding-image.jpg"
import OnboardingDecoration from "../images/auth-decoration.png"
import SignInImage from "../images/signin-image.png"

import LogoImage from "../images/service_buddy_landing_page_logo.png"
import { axios_instance } from "../config"
import { getItem } from "../utils/localStorage"
import { useSnackbar } from "../contexts/SnackbarProvider"
function OnBoardingFinal() {
  const [isSubmittingFormData, setIsSubmittingFormData] = useState(false)

  const { search } = useLocation()
  const { userInfo } = useAuth()
  const snackbar = useSnackbar()
  const navigate = useNavigate()
  const updateOnboarding = async () => {
    try {
      const token = `${getItem(`authkey`)}`
      const result = axios_instance.post(
        "/user/onboarding/complete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      snackbar.success("Welcome!")
    } catch (err: any) {
      console.log(err)
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message)
      } else {
        snackbar.error(`Something went wrong.`)
      }
    }
  }
  useEffect(() => {
    updateOnboarding()
  }, [])
  return (
    <div>
      <main className="bg-white">
        <div className="relative flex">
          {/* Content */}
          <div className="w-full md:w-1/2">
            <div className="min-h-screen h-full flex flex-col after:flex-1">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                  {/* Logo */}
                  <Link className="block" to="/">
                    <img src={LogoImage} height={150} width={150} />
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="px-4 pt-12 pb-8">
                  <div className="max-w-md mx-auto w-full">
                    <div className="relative">
                      <div
                        className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                        aria-hidden="true"
                      ></div>
                      <ul className="relative flex justify-between w-full">
                        <li>
                          <button
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                            disabled
                          >
                            1
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                            disabled
                          >
                            2
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                            disabled
                          >
                            3
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                            disabled
                          >
                            4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-8">
                <div className="max-w-md mx-auto">
                  <div className="text-center">
                    <svg
                      className="inline-flex w-16 h-16 fill-current mb-6"
                      viewBox="0 0 64 64"
                    >
                      <circle
                        className="text-emerald-100"
                        cx="32"
                        cy="32"
                        r="32"
                      />
                      <path
                        className="text-emerald-500"
                        d="m28.5 41-8-8 3-3 5 5 12-12 3 3z"
                      />
                    </svg>
                    <h1 className="text-3xl text-slate-800 font-bold mb-8">
                      Nice to have you ! {userInfo?.companyName}. 🙌
                    </h1>
                    {isSubmittingFormData ? (
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                        disabled
                      >
                        <svg
                          className="animate-spin w-4 h-4 fill-current shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                        </svg>
                        <span className="ml-2">Loading</span>
                      </button>
                    ) : (
                      <span
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate("/")
                        }}
                      >
                        Go To Dashboard
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
            aria-hidden="true"
          >
            <img
              className="object-cover object-center w-full h-full"
              src={SignInImage}
              width="760"
              height="1024"
              alt="Onboarding"
            />
            <img
              className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
              src={OnboardingDecoration}
              width="218"
              height="224"
              alt="Authentication decoration"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default OnBoardingFinal
