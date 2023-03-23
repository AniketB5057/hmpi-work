import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Banner from "../components/Banner"
import LoadingSpinner from "../components/LoadingSpinner"
import { useAuth } from "../contexts/AuthProvider"
import AuthDecoration from "../images/auth-decoration.png"
import SignInImage from "../images/new-signin-image.png"
import LogoImage from "../images/logo.png"
import { getItem, setItem } from "../utils/localStorage"
import { axios_instance } from "../config"
import { useSnackbar } from "../contexts/SnackbarProvider"
function VerifyEmailPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const snackbar = useSnackbar()
  const [searchParams, setSearchParams] = useSearchParams()

  const verifyCode = async () => {
    const getEmailCode = searchParams.get("code")
    if (getEmailCode) {
      try {
        const result = await axios_instance.post("/user/email/verify-request", {
          code: `${getEmailCode}`,
        })
        snackbar.success("Email verfied!")
        setIsLoading(false)
      } catch (err: any) {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message)
        } else {
          snackbar.error("Failed to verify email link.")
        }
        setIsLoading(false)
        setIsError(true)
      }
    } else {
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    verifyCode()
  }, [])
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* images */}
        <div
          className="hidden md:flex bg-themeColor top-0 bottom-0 left-0 md:w-1/2 flex-col items-center justify-center px-20"
          aria-hidden="true"
        >
          <h1 className=" font-['Luckiest_Guy'] xl:text-4xl lg:text-3xl sm:text-2xl font-normal pb-7 text-white text-center">
            We can get rid of "24x7 Support & everything to get you started"
          </h1>
          <div className="text-center">
            <img
              className="text-center h-auto"
              src={SignInImage}
              alt="Authentication"
            />
          </div>
        </div>
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col justify-center items-center">
            {/* Header */}
            <div className="w-3/12">
              <div className="px-4">
                <Link className="block pt-[20px]" to="/">
                  <img src={LogoImage} height={150} width={150} />
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <>
                <h1 className=" font-['Luckiest_Guy'] text-themeColor text-2xl mb-6">
                  {isError ? `Invalid link` : `Email Verified !`}
                </h1>
              </>
              {/* footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  <button
                    className="btn w-full bg-themeColor text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                    // to="/"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = "/signin"
                    }}
                    type="button"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerifyEmailPage
