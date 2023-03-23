import React, { useEffect, useState } from "react"
import { useSnackbar } from "../../contexts/SnackbarProvider"
import { getStripeLinkForOnboarding } from "../../hooks/useStripeBilling"
import { getItem } from "../../utils/localStorage"

function AppsPanel() {
  const snackbar = useSnackbar()
  const [isLoadingSetup, setIsLoadingSetup] = useState(false)
  const getOnboardToStripeLink = async () => {
    setIsLoadingSetup(true)
    try {
      const getLink = await getStripeLinkForOnboarding(getItem("authkey"))
      snackbar.success("Redirecting you to payment")
      window.location.href = `${getLink}`
      setIsLoadingSetup(false)
    } catch (err) {
      console.log(err)
      snackbar.error("failed to load payment onboarding")
      setIsLoadingSetup(false)
    }
  }
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">
          Connected Apps
        </h2>

        {/* General */}
        <div className="mb-6">
          {/* Filters */}
          <div className="mb-4 border-b border-slate-200">
            <ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
              <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a className="text-indigo-500 whitespace-nowrap" href="#0">
                  All apps
                </a>
              </li>
              {/* <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a
                  className="text-slate-500 hover:text-slate-600 whitespace-nowrap"
                  href="#0"
                >
                  Payments
                </a>
              </li>
              <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a
                  className="text-slate-500 hover:text-slate-600 whitespace-nowrap"
                  href="#0"
                >
                  Marketing
                </a>
              </li>
              <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
                <a
                  className="text-slate-500 hover:text-slate-600 whitespace-nowrap"
                  href="#0"
                >
                  Sales
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Connected Apps cards */}
        <section className="pb-6 border-b border-slate-200">
          <div className="grid grid-cols-12 gap-6">
            {/* Card 1 */}
            <div className="col-span-full xl:col-span-6 2xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200">
              {/* Card content */}
              <div className="flex flex-col h-full p-5">
                <div className="grow">
                  <header className="flex items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 468 222.5"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M414 113.4c0-25.6-12.4-45.8-36.1-45.8-23.8 0-38.2 20.2-38.2 45.6 0 30.1 17 45.3 41.4 45.3 11.9 0 20.9-2.7 27.7-6.5v-20c-6.8 3.4-14.6 5.5-24.5 5.5-9.7 0-18.3-3.4-19.4-15.2h48.9c0-1.3.2-6.5.2-8.9zm-49.4-9.5c0-11.3 6.9-16 13.2-16 6.1 0 12.6 4.7 12.6 16h-25.8zm-63.5-36.3c-9.8 0-16.1 4.6-19.6 7.8l-1.3-6.2h-22v116.6l25-5.3.1-28.3c3.6 2.6 8.9 6.3 17.7 6.3 17.9 0 34.2-14.4 34.2-46.1-.1-29-16.6-44.8-34.1-44.8zm-6 68.9c-5.9 0-9.4-2.1-11.8-4.7l-.1-37.1c2.6-2.9 6.2-4.9 11.9-4.9 9.1 0 15.4 10.2 15.4 23.3 0 13.4-6.2 23.4-15.4 23.4zm-71.3-74.8 25.1-5.4V36l-25.1 5.3zm0 7.6h25.1v87.5h-25.1zm-26.9 7.4-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7 15.9-6.3 19-5.2v-23c-3.2-1.2-14.9-3.4-20.8 7.4zm-50-29.1-24.4 5.2-.1 80.1c0 14.8 11.1 25.7 25.9 25.7 8.2 0 14.2-1.5 17.5-3.3V135c-3.2 1.3-19 5.9-19-8.9V90.6h19V69.3h-19l.1-21.7zM79.3 94.7c0-3.9 3.2-5.4 8.5-5.4 7.6 0 17.2 2.3 24.8 6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5 67.6 54 78.2 54 95.9c0 27.6 38 23.2 38 35.1 0 4.6-4 6.1-9.6 6.1-8.3 0-18.9-3.4-27.3-8v23.8c9.3 4 18.7 5.7 27.3 5.7 20.8 0 35.1-10.3 35.1-28.2-.1-29.8-38.2-24.5-38.2-35.7z"
                        style={{
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                          fill: "#635bff",
                        }}
                      />
                    </svg>
                  </header>
                  <div className="text-sm">
                    Connect your stripe account to accept payments.
                  </div>
                </div>
                {/* Card footer */}
                <footer className="mt-4">
                  <div className="flex flex-wrap justify-between items-center">
                    {/* Left side */}
                    <div className="flex space-x-3">
                      <div className="flex items-center text-slate-400">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                        </svg>
                        <div className="text-sm text-slate-500">
                          15+ accounts connected
                        </div>
                      </div>
                    </div>
                    {/* Right side */}
                    <button
                      className="btn-sm border-slate-200 
                      hover:border-slate-300 
                      shadow-sm flex items-center
                      disabled:border-slate-200 
                      disabled:bg-slate-100 
                      disabled:text-slate-400 
                      disabled:cursor-not-allowed
                      "
                      disabled={isLoadingSetup}
                      onClick={() => {
                        getOnboardToStripeLink()
                      }}
                    >
                      {/* <svg
                        className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg> */}
                      <span>Connect Now</span>
                    </button>
                  </div>
                </footer>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-span-full xl:col-span-6 2xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200">
              {/* Card content */}
              <div className="flex flex-col h-full p-5">
                <div className="grow">
                  <header className="flex items-center mb-4">
                    <img
                      src={`https://content.hostgator.com/img/ads_logo.png`}
                    />
                  </header>
                  <div className="text-sm">Google Ads Integration.</div>
                </div>
                {/* Card footer */}
                <footer className="mt-4">
                  <div className="flex flex-wrap justify-between items-center">
                    {/* Left side */}
                    {/* <div className="flex space-x-3">
                      <div className="flex items-center text-slate-400">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                        </svg>
                        <div className="text-sm text-slate-500">4K+</div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                        </svg>
                        <div className="text-sm text-amber-600">4.7</div>
                      </div>
                    </div> */}
                    {/* Right side */}
                    <button
                      className="btn-sm border-slate-200 hover:border-slate-300 shadow-sm flex items-center"
                      disabled
                    >
                      {/* <svg
                        className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg> */}
                      <span className="text-slate-400">Coming Soon</span>
                    </button>
                  </div>
                </footer>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-span-full xl:col-span-6 2xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200">
              {/* Card content */}
              <div className="flex flex-col h-full p-5">
                <div className="grow">
                  <header className="flex items-center mb-4">
                    <img
                      src={`https://miro.medium.com/max/1400/1*-ExxDAPl4rciaENKd8QSBw.png`}
                    />
                  </header>
                  <div className="text-sm">Google Analytics Integration.</div>
                </div>
                {/* Card footer */}
                <footer className="mt-4">
                  <div className="flex flex-wrap justify-between items-center">
                    {/* Left side */}
                    {/* <div className="flex space-x-3">
                      <div className="flex items-center text-slate-400">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                        </svg>
                        <div className="text-sm text-slate-500">4K+</div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                        </svg>
                        <div className="text-sm text-amber-600">4.7</div>
                      </div>
                    </div> */}
                    {/* Right side */}
                    <button
                      className="btn-sm border-slate-200 hover:border-slate-300 shadow-sm flex items-center"
                      disabled
                    >
                      {/* <svg
                        className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                        viewBox="0 0 12 12"
                      >
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg> */}
                      <span className="text-slate-400">Coming Soon</span>
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AppsPanel
