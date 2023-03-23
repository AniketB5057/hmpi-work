import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Banner from "../components/Banner"
import LoadingSpinner from "../components/LoadingSpinner"
import { useAuth } from "../contexts/AuthProvider"
import SignInImage from "../images/new-signin-image.png"
import LogoImage from "../images/logo.png"
import { getItem, setItem } from "../utils/localStorage"
import { axios_instance } from "../config"
import { useSnackbar } from "../contexts/SnackbarProvider"
function SignupThanks() {
  const navigate = useNavigate()
  const { userInfo, isFetchingUserInfo } = useAuth()
  const [sendingEmail, setSendingEmail] = useState(false)
  const snackbar = useSnackbar()
  const requestEmailLink = async () => {
    try {
      setSendingEmail(true)
      const token = `${getItem(`authkey`)}`
      const result = await axios_instance.get("/user/email/verify-request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      snackbar.success("Email sent!")
      setSendingEmail(false)
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message)
      } else {
        snackbar.error("Something went wrong")
      }
      setSendingEmail(false)
    }
  }
  // useEffect(() => {
  //   if (userInfo && userInfo.email_verified) {
  //     navigate(`/`, { replace: true })
  //   }
  // }, [isFetchingUserInfo])

  if (isFetchingUserInfo) {
    return (
      <>
        <LoadingSpinner />
      </>
    )
  }
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Image */}

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
            <div className=" w-7/12">
              <div className="px-4 sm:px-6 lg:px-4">
                {/* Logo */}
                <Link className="block" to="/">
                  <img src={LogoImage} height={150} width={150} />
                </Link>
              </div>
            </div>

            <div className="max-w-md w-3/4 px-4">
              <>
                <h1 className=" font-['Luckiest_Guy'] text-themeColor text-2xl mt-4 mb-6">
                  So Close! Check inbox.
                </h1>
                <Banner
                  open={true}
                  setOpen={(val: boolean) => {}}
                  type="success"
                >
                  Please verify your email: {userInfo?.email} to continue.
                </Banner>
              </>
              {/* footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Need link again ?{" "}
                  {sendingEmail ? (
                    <button
                      className="btn md:w-2/12 mt-8 bg-themeColor text-white disabled:border-slate-200 disabled:bg-themeColor disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
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
                    <button
                      // className="btn w-3/12 ml-5 h-14 mt-8 bg-themeColor text-white disabled:border-slate-200 disabled:bg-themeColor disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                      // to="/"
                      className="btn bg-themeColor text-white whitespace-nowrap ml-2"
                      onClick={(e) => {
                        e.preventDefault()
                        requestEmailLink()
                      }}
                      type="button"
                    >
                      Send Link
                    </button>
                  )}
                  <button
                    // className="btn w-3/12 ml-5 h-14 mt-8 bg-themeColor text-white disabled:border-slate-200 disabled:bg-themeColor disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                    className="btn bg-themeColor text-white float-right"
                    onClick={(e) => {
                      e.preventDefault()
                      setItem("authkey", "")
                      window.location.href = "/"
                    }}
                    type="button"
                  >
                    Log out
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

export default SignupThanks
