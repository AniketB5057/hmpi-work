import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { axios_instance } from "../config"
import { useSnackbar } from "../contexts/SnackbarProvider"
import SignInImage from "../images/new-signin-image.png"
import LogoImage from "../images/logo.png"
import { TbLock } from "react-icons/tb"
import { AiOutlineEye } from "react-icons/ai"
function ResetAndCreateNewPassword() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showGoToButton, setShowGoToButton] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [resetCode, setResetCode] = useState("")
  const snackbar = useSnackbar()
  const saveNewPassword = async () => {
    setIsLoading(true)
    try {
      const data = await axios_instance.post(
        `/user/password/change-with-link`,
        {
          code: resetCode,
          new_password: password,
        }
      )
      snackbar.success("saved new password")
      setIsLoading(false)
      setShowGoToButton(true)
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
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const getEmailCode = searchParams.get("code")
    if (getEmailCode) {
      setResetCode(getEmailCode)
    }
  }, [])
  useEffect(() => {
    if (password.length > 5 && password === repeatPassword) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, repeatPassword])

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
            <div className="w-7/12">
              <div className="px-4">
                <Link className="block pt-[20px]" to="/">
                  <img src={LogoImage} height={150} width={150} />
                </Link>
              </div>
            </div>

            <div className="px-4 py-8 xs:w-7/12">
              <h1 className=" font-['Luckiest_Guy'] text-themeColor text-2xl mb-6">
                Reset your Password{" "}
              </h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-lg font-medium mb-1"
                      htmlFor="new_password"
                    >
                      New Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <TbLock className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

                      <input
                        id="new_password"
                        className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                        type="password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                      <AiOutlineEye className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 right-3" />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-lg font-medium mb-1"
                      htmlFor="re_type_password"
                    >
                      Re-type Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <TbLock className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

                      <input
                        id="re_type_password"
                        className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                        type="password"
                        value={repeatPassword}
                        placeholder="Enter Re-Type Password"
                        onChange={(e) => {
                          setRepeatPassword(e.target.value)
                        }}
                      />
                      <AiOutlineEye className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 right-3" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  {isLoading ? (
                    <button
                      className="btn w-full bg-themeColor text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
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
                    <>
                      {showGoToButton ? (
                        <button
                          className="btn w-full bg-themeColor text-white whitespace-nowrap disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                          onClick={() => {
                            navigate("/signin")
                          }}
                        >
                          Go To Sign In
                        </button>
                      ) : (
                        <button
                          className="btn w-full bg-themeColor text-white whitespace-nowrap disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                          onClick={saveNewPassword}
                          disabled={isDisabled}
                        >
                          Save New Password
                        </button>
                      )}
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetAndCreateNewPassword
