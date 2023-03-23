import React from "react"
import LineChart from "./LineChart"
// Import utilities
import { tailwindConfig, hexToRGB } from "../../../utils/Utils"
import { getDashboardData } from "../../../hooks/dashboard/useDashboardData"

export interface AnalyticsCardProps {
  data: getDashboardData
}
function OverviewAnalyticsCard(props: AnalyticsCardProps) {
  const { data } = props

  return (
    <div className="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">
          Analytics (last 30 days)
        </h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap">
          {/* Unique Visitors */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-slate-800 mr-2">
                  {data.totalCustomers}
                </div>
                <div className="text-sm font-medium text-emerald-500">+0%</div>
              </div>
              <div className="text-sm text-slate-500">Total Customers</div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-slate-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>

          {/* Bounce Rate */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-slate-800 mr-2">
                  {data.totalOrders}
                </div>
                <div className="text-sm font-medium text-amber-500">0%</div>
              </div>
              <div className="text-sm text-slate-500">New Bookings</div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-slate-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Visit Duration*/}
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-slate-800 mr-2">
                  $ 0
                </div>
                <div className="text-sm font-medium text-amber-500">+0%</div>
              </div>
              <div className="text-sm text-slate-500">Revenue Increase</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={800} height={300} /> */}
      </div>
    </div>
  )
}

export default OverviewAnalyticsCard
