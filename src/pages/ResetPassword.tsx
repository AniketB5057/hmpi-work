import { Link } from "react-router-dom";

import AuthDecoration from "../images/auth-decoration.png";

import LogoImage from "../images/logo.png";

import SignInImage from "../images/new-signin-image.png";
import { BiMailSend } from "react-icons/bi";

import { axios_instance } from "../config";
import { useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarProvider";
import validator from "validator";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const snackbar = useSnackbar();
  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      const data = await axios_instance.get(
        `/user/password/reset-link?email=${email}`
      );
      snackbar.success("request sent on email");
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        snackbar.error(err.response.data.message);
      } else {
        snackbar.error(`Something went wrong.`);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("email11", email);
    if (email && validator.isEmail(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);
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
                Reset your Password
              </h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-lg font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <BiMailSend className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
                      <input
                        id="email"
                        className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
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
                    <button
                      className="btn w-full bg-themeColor text-white whitespace-nowrap disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                      onClick={handlePasswordReset}
                      disabled={isDisabled}
                    >
                      Send Reset Link
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
