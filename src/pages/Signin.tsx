import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInImage from "../images/new-signin-image.png";
import AuthDecoration from "../images/auth-decoration.png";
import { useSnackbar } from "../contexts/SnackbarProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";
import LogoImage from "../images/logo.png";
import { BiMailSend } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { TbLock } from "react-icons/tb";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

function Signin() {
  const {
    isLoggingIn,
    login,
    hasRole,
    userInfo,
    isFetchingUserInfo,
    loginWithGoogle,
  } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const clientId = process.env.VITE__APP_GOOGLE_AUTH_CLIENT_ID as string;

  const handleSuccess = (response: CredentialResponse) => {
    console.log(response);
    if (response && response.credential) {
      const accessToken = response.credential;

      handleLoginWithGoogle(accessToken);
    }
  };

  const handleLoginWithGoogle = (token: string) => {
    loginWithGoogle(token)
      .then(() => navigate(`/`, { replace: true }))
      .catch((err) => {
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
      });
  };

  const handleLogin = (email: string, password: string) => {
    login(email, password)
      .then(() => navigate(`/`, { replace: true }))
      .catch((err) => {
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
      });
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/`, { replace: true });
    }
  }, [isFetchingUserInfo]);

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email required").required("email required"),
      password: Yup.string()
        .min(6, "Min password length is 6")
        .required("Password required"),
    }),
    onSubmit: (values) => handleLogin(values.email, values.password),
  });
  if (isFetchingUserInfo) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
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
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Logo */}
              <Link className="block" to="/">
                <img src={LogoImage} height={150} width={150} />
              </Link>
            </div>
            <div className="max-w-md w-3/4 px-4">
              <h1 className=" font-['Luckiest_Guy'] text-themeColor text-2xl mb-6">
                SIGN IN
              </h1>

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-lg font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <BiMailSend className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

                      <input
                        id="email"
                        className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                        disabled={isLoggingIn}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="Enter Email"
                      />
                    </div>

                    {formik.touched.email && Boolean(formik.errors.email) && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {formik.touched.email && formik.errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-lg font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <TbLock className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

                      <input
                        id="password"
                        className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white placeholder-placeholderGray appearance-none w-full block pl-14 text-sm hover:border-themeColor focus:outline-none focus:border-themeColor"
                        type="password"
                        disabled={isLoggingIn}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="on"
                        placeholder="Enter Password"
                      />
                      <AiOutlineEye className="text-themeColor pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 right-3" />
                    </div>

                    {formik.touched.password &&
                      Boolean(formik.errors.password) && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formik.touched.password && formik.errors.password}
                        </span>
                      )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <input
                      className="form-checkbox mr-3 border border-themeColor w-4 text-themeColor focus:shadow-none`"
                      type="checkbox"
                    />
                    <span className="font-normal text-sm">Remember me</span>
                  </div>
                  <div>
                    <Link
                      className="text-base text-themeColor font-medium hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                </div>
                {isLoggingIn ? (
                  <button
                    className="btn w-full h-14 mt-8 bg-themeColor text-white disabled:border-slate-200 disabled:bg-themeColor disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
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
                    className="btn w-full bg-themeColor h-14 mt-8 text-white font-bold text-base"
                    type="submit"
                  >
                    Sign In
                  </button>
                )}
                <div className="text-center mt-2">
                  <div className="mt-6 text-sm font-normal">
                    Or continue with
                  </div>
                  <div className="mt-8">
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={() => {
                        snackbar.error("Failed to signin!");
                      }}
                    />
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className=" mt-6 text-center font-normal">
                <div className="text-sm">
                  Don’t you have an account ?{" "}
                  <span
                    className="text-themeColor font-medium cursor-pointer"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </span>
                </div>
                {/* Warning */}
                {/* <div className="mt-5">
                  <div className="bg-amber-100 text-amber-600 px-3 py-2 rounded">
                    <svg
                      className="inline w-3 h-3 shrink-0 fill-current mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      To support you during the pandemic super pro features are
                      free until March 31st.
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
