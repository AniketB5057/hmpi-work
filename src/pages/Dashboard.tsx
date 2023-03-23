import LoadingSpinner from "../components/LoadingSpinner"
import {
  useAnalyticsData,
  useOnboardingData,
  userActivityData,
} from "../hooks/dashboard/useDashboardData"
import OverviewAnalyticsCard from "./components/dashboard/AnalyticsCard"
import OnboardinTodoList from "./components/dashboard/OnboardinTodoList"
import RecentActivityCard from "./components/dashboard/RecentActivityCard"
import { isMobile } from "react-device-detect"
function Dashboard() {
  const analyticsDataHook = useAnalyticsData()
  const onboardingDataHook = useOnboardingData()
  const activityDataHook = userActivityData()

  return (
    <div className="intro-js-dashboard px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                Dashboard
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Datepicker built with flatpickr */}
              {/* <Datepicker align="right" /> */}
            </div>
          </div>

          {/* Cards */}

          {/* <div className="grid grid-cols-12 gap-6">
          
            {analyticsDataHook.isFetching ? (
              <LoadingSpinner />
            ) : (
              analyticsDataHook.data && (
                <OverviewAnalyticsCard data={analyticsDataHook.data} />
              )
            )}

           
          </div> */}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mt-2">
            {!isMobile && (
              <div>
                {onboardingDataHook.isFetching ? (
                  <LoadingSpinner />
                ) : (
                  onboardingDataHook.data && (
                    <OnboardinTodoList
                      heading={onboardingDataHook.data.heading}
                      sub_heading={onboardingDataHook.data.sub_heading}
                      todo_list={onboardingDataHook.data.todo_list}
                    />
                  )
                )}
              </div>
            )}

            <div>
              {activityDataHook.isFetching ? (
                <LoadingSpinner />
              ) : (
                activityDataHook.data && (
                  <RecentActivityCard activityList={activityDataHook.data} />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
