import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoImage from "../images/service_buddy_dashboard_white_logo.png";
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineSetting,
} from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CgQuoteO } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiFileList3Line } from "react-icons/ri";
import { UserRoleTypes } from "../types/allTypes";
import { useAuth } from "../contexts/AuthProvider";
import { availableMenu } from "../AllRestrictedPaths";
export const allowedSidebarMenu = (
  userRoles: UserRoleTypes[],
  link: string
) => {
  for (let i = 0; i < userRoles.length; i++) {
    let tempLinks = availableMenu(userRoles[i]);
    if (tempLinks.includes(link)) {
      return true;
    }
  }

  return false;
};
function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<any>(null);
  const { userInfo } = useAuth();
  const sidebar = useRef<any>(null);

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }: any) => {
  //     if (!sidebar.current || !trigger.current) return;
  //     if (
  //       !sidebarOpen ||
  //       sidebar.current.contains(target) ||
  //       trigger.current.contains(target)
  //     )
  //       return;
  //     if (
  //       target &&
  //       target.id &&
  //       (target.id === "header-button-hamburger-ref-svg" ||
  //         target.id === "header-button-hamburger-ref" ||
  //         target.id === "header-button-hamburger-ref-svg-rect-1" ||
  //         target.id === "header-button-hamburger-ref-svg-rect-2" ||
  //         target.id === "header-button-hamburger-ref-svg-rect-3")
  //     ) {
  //       return;
  //     }

  //     setSidebarOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", `${sidebarOpen}`);
    if (sidebarOpen) {
      document?.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document?.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarOpen]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`px-0 flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-themeColor p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 sm:px-2 pb-11">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={LogoImage} width={108} />
          </NavLink>
        </div>
        {/* Links */}
        {userInfo && userInfo.roles && (
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <ul className="mt-3">
                {/* dashboard */}
                {allowedSidebarMenu(userInfo.roles, "/dashboard") && (
                  <li
                    className={`intro-js-dashboard-menu px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("dashboard") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/dashboard"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("dashboard")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <AiOutlineHome className="text-lg" />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Home
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Calendar */}
                {allowedSidebarMenu(userInfo.roles, "/calendar") && (
                  <li
                    className={`intro-js-calendar px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("calendar") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/calendar"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("calendar")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <SlCalender className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Calendar
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Clients */}
                {allowedSidebarMenu(userInfo.roles, "/clients") && (
                  <li
                    className={`intro-js-bookings px-4 py-3.5 rounded-sm mb-0.5 last:mb-0 ${
                      (pathname.includes("clients") ||
                        pathname.includes("client")) &&
                      "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/clients"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("clients") ||
                        pathname.includes("client")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <HiOutlineUserGroup className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Clients
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Estimates */}
                {allowedSidebarMenu(userInfo.roles, "/estimates") && (
                  <li
                    className={`intro-js-estimates px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("estimates") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/estimates"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("estimates")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <CgQuoteO className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Quotes
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Jobs */}
                {allowedSidebarMenu(userInfo.roles, "/jobs") && (
                  <li
                    className={`intro-js-bookings px-4 py-3.5 rounded-sm mb-0.5 last:mb-0 ${
                      (pathname.includes("jobs") || pathname.includes("job")) &&
                      "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/jobs"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("jobs") || pathname.includes("job")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <CgQuoteO />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Jobs
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Invoices */}
                {allowedSidebarMenu(userInfo.roles, "/invoices") && (
                  <li
                    className={`intro-js-invoices px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("invoices") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/invoices"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("invoices")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <RiFileList3Line className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Invoices
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Payments */}
                {allowedSidebarMenu(userInfo.roles, "/customers") && (
                  <li
                    className={`intro-js-customers px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("customers") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/customers"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("customers")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <AiOutlineCreditCard className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Payments
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Reports */}
                {allowedSidebarMenu(userInfo.roles, "/reports") && (
                  <li
                    className={`intro-js-reports px-4 py-3.5 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("reports") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/reports"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("reports")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <HiOutlineDocumentReport className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Reports
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Settings */}
                {allowedSidebarMenu(userInfo.roles, "/settings") && (
                  <li
                    className={`intro-js-customers px-4 py-3.5 mb-0.5 last:mb-0 ${
                      pathname.includes("settings") && "bg-white"
                    }`}
                  >
                    <NavLink
                      end
                      to="/settings"
                      className={`block truncate transition duration-150 ${
                        pathname.includes("settings")
                          ? "text-themeColor"
                          : "text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <AiOutlineSetting className="text-lg" />

                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Settings
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

                {/* Messages */}
                {/* <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("messages") && "bg-slate-900"
              }`}
            >
              <NavLink
                end
                to="/messages"
                className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                  pathname.includes("messages") && "hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="grow flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("messages") && "text-indigo-500"
                        }`}
                        d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("messages") && "text-indigo-300"
                        }`}
                        d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Messages
                    </span>
                  </div>
                
                  <div className="flex flex-shrink-0 ml-2">
                    <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">
                      4
                    </span>
                  </div>
                </div>
              </NavLink>
            </li> */}
                {/*  Company Settings */}

                {/* {allowedSidebarMenu(userInfo.roles, "/business") && (
                  <div className="intro-js-business-settings">
                    <SidebarLinkGroup
                      activecondition={pathname.startsWith("/business")}
                    >
                      {(handleClick: any, open: any) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                                pathname.includes("business") &&
                                "hover:text-slate-200"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarOpen
                                  ? handleClick()
                                  : setsidebarOpen(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faToolbox} />
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Manage
                                  </span>
                                </div>
                               
                                <div className="flex shrink-0 ml-2">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "transform rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/business/employees"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/business/employees"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon
                                          icon={faChalkboardUser}
                                        />

                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          Employees
                                        </span>
                                      </div>
                                    </NavLink>
                                  </li>
                                )}

                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/business/locations"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/business/locations"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon icon={faMapLocation} />

                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          Locations
                                        </span>
                                      </div>
                                    </NavLink>
                                  </li>
                                )}
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/business/items"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/business/items"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <div className="flex items-center">
                                        <FontAwesomeIcon
                                          icon={faCartFlatbedSuitcase}
                                        />
                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          Services/Products
                                        </span>
                                      </div>
                                    </NavLink>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  </div>
                )} */}

                {/* Settings */}
                {/* {allowedSidebarMenu(userInfo.roles, "/settings") && (
                  <div className="intro-js-account-settings">
                    <SidebarLinkGroup
                      activecondition={pathname.includes("settings")}
                    >
                      {(handleClick: any, open: any) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                                pathname.includes("settings") &&
                                "hover:text-slate-200"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarOpen
                                  ? handleClick()
                                  : setsidebarOpen(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faGears} />
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Settings
                                  </span>
                                </div>
                                
                                <div className="flex shrink-0 ml-2">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                      open && "transform rotate-180"
                                    }`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/account/user"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/account/user"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        My Account
                                      </span>
                                    </NavLink>
                                  </li>
                                )}
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/account/business"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/account/business"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Business Account
                                      </span>
                                    </NavLink>
                                  </li>
                                )}
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/preferrences"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/preferrences"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Preferrences
                                      </span>
                                    </NavLink>
                                  </li>
                                )}
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/apps"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/apps"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Connected Apps
                                      </span>
                                    </NavLink>
                                  </li>
                                )}

                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/plans"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/plans"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Plans & Usage
                                      </span>
                                    </NavLink>
                                  </li>
                                )}
                                {allowedSidebarMenu(
                                  userInfo.roles,
                                  "/settings/billing"
                                ) && (
                                  <li className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to="/settings/billing"
                                      className={({ isActive }) =>
                                        "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                                        (isActive ? "!text-indigo-500" : "")
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        Billing & Invoices
                                      </span>
                                    </NavLink>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  </div>
                )} */}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
