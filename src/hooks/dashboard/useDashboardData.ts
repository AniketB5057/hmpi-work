import { axios_instance } from "../../config"
import { useQuery } from "react-query"
import { getItem } from "../../utils/localStorage"
import { Activity } from "../../types/activity"

export interface getDashboardData {
  totalCustomers: number
  totalOrders: number
}
export interface todoListType {
  name: string
  completed: boolean
  cta_text: string
  cta_link?: string
}
export interface getOnboardingData {
  todo_list: todoListType[]
  heading: string
  sub_heading: string
}

const fetchAnalyticsData = async (): Promise<getDashboardData> => {
  const { data } = await axios_instance.get(`/dashboard/analytics`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

const fetchOnboardingData = async (): Promise<getOnboardingData> => {
  const { data } = await axios_instance.get(`/dashboard/onboarding`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

const fetchActivityData = async (): Promise<Activity[]> => {
  const { data } = await axios_instance.get(`/activity/all`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAnalyticsData() {
  return useQuery("dashboard-analytics-data", () => fetchAnalyticsData())
}

export function useOnboardingData() {
  return useQuery("dashboard-onboarding-data", () => fetchOnboardingData())
}

export function userActivityData() {
  return useQuery("dashboard-activity-data", () => fetchActivityData())
}
