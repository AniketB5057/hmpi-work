import { axios_instance } from "../../config"
import { useMutation } from "react-query"
import { getItem } from "../../utils/localStorage"

const updatePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) => {
  const { data } = await axios_instance.post(
    "/user/password/change",
    {
      oldPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )
  return data
}

export function useUpdatePassword() {
  const { isLoading, mutateAsync } = useMutation(updatePassword)
  return { isUpdating: isLoading, updatePassword: mutateAsync }
}
