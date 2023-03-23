import { axios_instance } from "../config"
import { useQuery } from "react-query"
import { UserInfo } from "../types/userInfo"

const fetchUserInfo = async (key?: string): Promise<UserInfo> => {
  const { data } = await axios_instance.get(`/user/token/verify`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })

  return data
}

export function useUserInfo(key?: string) {
  return useQuery(["user-info"], () => fetchUserInfo(key), {
    enabled: !!key,
    keepPreviousData: true,
  })
}
