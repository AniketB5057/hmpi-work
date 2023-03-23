import { axios_instance } from "../../config"
import { useQuery } from "react-query"
import { UserInfo } from "../../types/userInfo"

export const updateUser = async (
  key: string,
  user: Partial<UserInfo>
): Promise<UserInfo> => {
  const { data } = await axios_instance.patch(
    `/user/profile/info`,
    {
      ...user,
    },
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    }
  )
  return data
}

export function useUpdateUser(key: string, user: Partial<UserInfo>) {
  return useQuery(["user-info-update", key], () => updateUser(key, user), {
    enabled: !!key,
  })
}
