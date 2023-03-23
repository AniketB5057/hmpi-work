import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Help from "../components/DropdownHelp";
import Notifications from "../components/DropdownNotifications";
import UserMenu from "../components/DropdownProfile";
import SearchModal from "../components/ModalSearch";
import Tooltip from "../components/Tooltip";
import { useAuth } from "../contexts/AuthProvider";
import { makeid } from "../utils/commonFunctions";
import {
  AiOutlineSearch,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";

export interface breadcrumbProps {
  label: string;
  link: string;
}
export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  breadcrumbs?: breadcrumbProps[];
}
function Header({ sidebarOpen, setSidebarOpen, breadcrumbs }: HeaderProps) {
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600"
              aria-controls="sidebar"
              id="header-button-hamburger-ref"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>

              <BiMenuAltLeft
                className="w-[25px] h-[25px] text-themeColor mr-2"
                id="header-button-hamburger-ref-svg"
              />
            </button>

            {userInfo?.domain}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-10">
            {/* <button
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-slate-200"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setSearchModalOpen(true)
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-slate-500"
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                />
                <path
                  className="fill-current text-slate-400"
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                />
              </svg>
            </button> */}
            {/* <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            /> */}
            {/* <div>  
              <Tooltip
                position="bottom"
                size="sm"
                credits={
                  userInfo && userInfo.availableCredits
                    ? `${userInfo.availableCredits}`
                    : `0`
                }
              >
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    navigate("/settings/plans");
                  }}
                >  
                  Buy
                </button>
              </Tooltip>
            </div> */}
            {/* <Notifications align="right" notifications={[]} />
            <Help align="right" /> */}
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-slate-200 mx-3" /> */}
            {/* <UserMenu align="right" /> */}
            <div className="relative">
              <AiOutlineSearch className="text-[#828282] pointer-events-none h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

              <input
                id="search"
                className="form-input header-search-input w-full pl-10"
                type="search"
                // disabled={isLoggingIn}
                // value={formik.values.password}
                // onChange={formik.handleChange}

                autoComplete="on"
                placeholder="Search..."
              />
            </div>
            <div className="flex justify-between header-right-menu">
              <IoMdNotificationsOutline className="w-[25px] h-[25px] text-themeColor md:mr-5 sm:mr-5 mr-2" />
              <AiOutlineQuestionCircle className="w-[25px] h-[25px] text-themeColor md:mr-5 sm:mr-5 mr-2" />
              <UserMenu align="right" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
