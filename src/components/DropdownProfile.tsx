import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { useAuth } from "../contexts/AuthProvider";
import { LiveChatContext } from "../contexts/LiveChatProvider";
import { ProductTourContext } from "../contexts/ProductTourProvider";
import { setItem } from "../utils/localStorage";
import Transition from "../utils/Transition";
import UserOutline from "../icons/UserOutline";

export interface DropdownProfileProps {
  align: string;
}
function DropdownProfile({ align }: DropdownProfileProps) {
  const { userInfo } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { openLiveChat } = useContext(LiveChatContext);
  const { startTour, stopTour } = useContext(ProductTourContext);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="flex items-center truncate">
          <AiOutlineSetting className="w-[25px] h-[25px] text-themeColor" />
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 rounded shadow-lg overflow-hidden mt-1 header-dropdown-menu ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-[24px] mb-1 border-b border-slate-200 header-user-details">
            <div className="flex items-center mt-[5px]">
              <div className="mr-[20px] flex items-center header-user-initials">
                <UserOutline />
                <span className="ml-[5px]">
                  {userInfo?.firstName?.charAt(0)}
                  {userInfo?.lastName?.charAt(0)}
                </span>
              </div>
              <div>
                <div className="header-user-name">
                  {userInfo?.firstName} {userInfo?.lastName}
                </div>
                <div className="header-user-email">{userInfo?.email}</div>
              </div>
            </div>
          </div>
          <ul className="header-setting-links">
            <li>
              <Link
                to="/settings/account/user"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <span
                onClick={() => {
                  openLiveChat();
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                Live Help
              </span>
            </li>
            {/* <li>
              <span
               
                onClick={() => {
                  startTour()
                  setDropdownOpen(!dropdownOpen)
                }}
              >
                Start Tutorial
              </span>
            </li> */}
            <li>
              <span
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setItem("authkey", "");
                  window.location.href = "/";
                }}
              >
                Account and Billing
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setItem("authkey", "");
                  window.location.href = "/";
                }}
              >
                Manage Team
              </span>
            </li>
            <li>
              <span>App Marketplace</span>
            </li>
            <li>
              <span>Refer a Friend</span>
            </li>
            <li>
              <span>Product Updates</span>
            </li>
            <li>
              <span
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setItem("authkey", "");
                  window.location.href = "/";
                }}
              >
                Sign Out
              </span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
