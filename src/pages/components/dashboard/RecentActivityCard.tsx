import React, { useEffect, useState } from "react"
import { Activity } from "../../../types/activity"
import moment from "moment"
import "moment-timezone"
import { useAuth } from "../../../contexts/AuthProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightLeft, faUser } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
export interface RecentActivityCardProps {
  activityList: Activity[]
}
function RecentActivityCard(props: RecentActivityCardProps) {
  const { activityList } = props
  const { userInfo } = useAuth()
  const [timezone, setTimezone] = useState<string>(moment.tz.guess())
  const navigate = useNavigate()
  useEffect(() => {
    let userTimeZone =
      userInfo && userInfo.timezone ? userInfo.timezone : moment.tz.guess()
    setTimezone(userTimeZone)
  }, [userInfo])

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Activity</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            {activityList && activityList.length > 0 ? `List` : `No activities`}
          </header>
          <ul className="my-1">
            {activityList &&
              activityList.length > 0 &&
              activityList.map((elem: Activity) => {
                return (
                  <li className="flex px-2">
                    <div className="w-9 h-9 rounded-full shrink-0 bg-emerald-500 my-2 mr-3">
                      <FontAwesomeIcon
                        icon={faRightLeft}
                        color="white"
                        className="pl-2.5 pt-2.5"
                      />
                    </div>
                    <div className="grow flex items-center text-sm py-2">
                      <div className="grow flex justify-between">
                        <div className="self-center">
                          <span className="font-medium text-slate-800 hover:text-slate-900">
                            {elem.desc}
                          </span>{" "}
                          at{" "}
                          <span>{`${moment
                            .unix(elem.created_at)
                            .tz(timezone)
                            .format("dddd, MMMM Do YYYY, HH:mm:ss")}`}</span>
                        </div>
                        <div className="shrink-0 self-end ml-2">
                          {elem.action_link && elem.action_link.length > 0 && (
                            <button
                              className="font-medium text-indigo-500 hover:text-indigo-600"
                              onClick={() => {
                                navigate(`${elem.action_link}`)
                              }}
                            >
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecentActivityCard
