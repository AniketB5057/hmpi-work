import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import moment from "moment";
import * as momentTimezone from "moment-timezone";
import { useCountdown } from "usehooks-ts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthProvider";
import { useSnackbar } from "../contexts/SnackbarProvider";
import { useRegister, useRegisterWithGoogle } from "../hooks/useRegister";
import AuthDecoration from "../images/auth-decoration.png";
import LogoImage from "../images/logo.png";
import SignInImage from "../images/new-signin-image.png";
import { UserInfoForRegister } from "../types/userInfo";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { TbLock } from "react-icons/tb";
import { WiTime9 } from "react-icons/wi";

import {
  useAnalyticsEventTracker,
  trackSignUpForGoogleAnalyticsAndAds,
} from "../App";

function Signup() {
  const navigate = useNavigate();
  const gaEventTracker = useAnalyticsEventTracker("User Signup");
  const snackbar = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isRegistering, register } = useRegister();
  const { isRegisteringWithGoogle, registerWithGoogle } =
    useRegisterWithGoogle();
  const { userInfo, isFetchingUserInfo } = useAuth();

  const handleSuccess = (response: CredentialResponse) => {
    if (response && response.credential) {
      const accessToken = response.credential;

      handleRegisterWithGoogle(accessToken);
      trackSignUpForGoogleAnalyticsAndAds();
    }
  };
  useEffect(() => {
    if (searchParams.get("source")) {
      gaEventTracker("arrived_from_landing_page", "arrived_from_landing_page");
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      navigate(`/`, { replace: true });
    }
  }, [isFetchingUserInfo]);

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      email: "",

      firstName: "",
      lastName: "",
      password: "",
      timezone: momentTimezone.tz.guess(),
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("email required"),
      firstName: Yup.string()
        .max(20, "first name required")
        .required("first name required"),
      lastName: Yup.string()
        .max(30, "last name required")
        .required("last name required"),
      password: Yup.string()
        .optional()
        .min(5, "Minimum password length is 6")
        .max(20, "Maximum password length is 20")
        .required("Length should be between 6 & 20"),
      timezone: Yup.string().required("Timezone required"),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const emailVal = searchParams.get("email");
      if (emailVal) {
        formik.values = {
          ...formik.values,
          email: emailVal,
        };
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    formik.values = {
      ...formik.values,
      timezone: momentTimezone.tz.guess(),
    };
  }, []);

  const handleRegisterWithGoogle = async (token: string) => {
    registerWithGoogle({
      token,
      timezone: formik.values.timezone,
    })
      .then(() => {
        snackbar.success("signed up with google");
        navigate(`/signin`);
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message);
        } else {
          snackbar.error("Something went wrong");
        }
      });
  };
  const handleRegister = async (values: UserInfoForRegister) => {
    register({
      ...values,
    })
      .then(() => {
        snackbar.success("signed up");
        trackSignUpForGoogleAnalyticsAndAds();
        navigate(`/signin`);
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          snackbar.error(err.response.data.message);
        } else {
          snackbar.error("Something went wrong");
        }
      });
  };
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
          <div className="min-h-screen h-full">
            {/* Header */}
            <div className="h-16 m-auto xs:w-7/12">
              <div className="px-4 sm:px-6 lg:px-4">
                <Link className="block pt-[20px]" to="/">
                  <img src={LogoImage} height={90} width={90} />
                </Link>
              </div>
            </div>

            <div className="m-auto px-4 py-8 xs:w-7/12">
              <>
                <h1 className=" font-['Luckiest_Guy'] text-themeColor text-3xl mb-6">
                  SIGN UP
                </h1>
                {/* <div className="text-center mt-2">
                  <div className="mt-2">
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      text="signup_with"
                      onError={() => {
                        snackbar.error("Failed to Signup!")
                      }}
                    />
                  </div>
                  <div className=" mt-2">or</div>
                </div> */}

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-base font-medium mb-1"
                        htmlFor="name"
                      >
                        First Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <FaRegUser className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                        <input
                          id="firstName"
                          className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                          type="text"
                          disabled={isRegistering || isRegisteringWithGoogle}
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          placeholder="Enter First Name"
                        />
                      </div>

                      {formik.touched.firstName &&
                        Boolean(formik.errors.firstName) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.firstName &&
                              formik.errors.firstName}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-base font-medium mb-1"
                        htmlFor="name"
                      >
                        Last Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <FaRegUser className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                        <input
                          id="lastName"
                          className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                          type="text"
                          disabled={isRegistering}
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          placeholder="Enter Last Name"
                        />
                      </div>

                      {formik.touched.lastName &&
                        Boolean(formik.errors.lastName) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.lastName && formik.errors.lastName}
                          </span>
                        )}
                    </div>

                    <div>
                      <label
                        className="block text-base font-medium mb-1"
                        htmlFor="email"
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <BiMailSend className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                        <input
                          id="email"
                          className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                          type="email"
                          disabled={isRegistering}
                          value={formik.values.email}
                          onChange={formik.handleChange}
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
                        className="block text-base font-medium mb-1"
                        htmlFor="password"
                      >
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <TbLock className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                        <input
                          id="password"
                          className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                          type="password"
                          autoComplete="on"
                          disabled={isRegistering}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          placeholder="Enter Password"
                        />
                        <AiOutlineEye className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-3" />
                      </div>
                      {formik.touched.password &&
                        Boolean(formik.errors.password) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.password && formik.errors.password}
                          </span>
                        )}
                    </div>
                    <div>
                      <label
                        className="block text-base font-medium mb-1"
                        htmlFor="timezone"
                      >
                        Your Timezone <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <WiTime9 className="text-themeColor pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />

                        <select
                          id="timezone"
                          className="form-input border-2 font-medium border-themeColor py-2 px-4 bg-white text-sm placeholder-placeholderGray appearance-none w-full block pl-14 hover:border-themeColor focus:outline-none focus:border-themeColor"
                          disabled={isRegistering}
                          value={formik.values.timezone}
                          onChange={formik.handleChange}
                        >
                          {momentTimezone.tz.names().map((elem) => {
                            return (
                              <option key={elem} value={elem}>
                                {elem}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {formik.touched.timezone &&
                        Boolean(formik.errors.timezone) && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {formik.touched.timezone && formik.errors.timezone}
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

                  {isRegistering || isRegisteringWithGoogle ? (
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
                    <button
                      className="btn w-full bg-themeColor h-14 mt-8 text-white font-bold text-base"
                      // to="/"
                      // onClick={(e) => {
                      //   e.preventDefault()
                      //   const data = formik.validateForm(formik.values)

                      //   handleRegister(formik.values)
                      // }}
                      type="submit"
                    >
                      Sign Up
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
                    have an account ?{" "}
                    <Link
                      className="text-themeColor font-medium cursor-pointer"
                      to="/signin"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
