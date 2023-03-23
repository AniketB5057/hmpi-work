import { axios_instance } from "../config"
import { useQuery } from "react-query"
import { UserInfo } from "../types/userInfo"

export const buyCredits = async (
  key: string,
  amount: string,
  credits: number
): Promise<string> => {
  const { data } = await axios_instance.post(
    `/stripe-connector/buy-credits`,
    {
      amount,
      credits,
    },
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  )
  return data
}

export const getStripeLinkForOnboarding = async (
  key: string
): Promise<string> => {
  const { data } = await axios_instance.get(
    `/stripe-connector/onboarding/connect-account`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  )
  return data
}
