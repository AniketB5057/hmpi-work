import { axios_instance } from "../../config"
import { useQuery } from "react-query"
import { getItem } from "../../utils/localStorage"
import { Activity } from "../../types/activity"

export interface todoListType {
  name: string
  completed: boolean
  cta_text: string
  cta_link?: string
}

const fetchActivityDataForReviews = async (): Promise<Activity[]> => {
  const { data } = await axios_instance.get(`/activity/all/reviews`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useReviewActivityData() {
  return useQuery("reviews-activity-data", () => fetchActivityDataForReviews())
}
