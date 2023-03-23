import { useMutation, useQueryClient } from "react-query"
import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"

const deleteEmployees = async (employeeIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/employee", {
    data: {
      ids: employeeIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteEmployees() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteEmployees, {
    onSuccess: (employeeIds: string[]) => {
      queryClient.setQueryData<any[]>(["employees"], (oldEmployees) =>
        removeMany(oldEmployees, employeeIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteEmployees: mutateAsync }
}
