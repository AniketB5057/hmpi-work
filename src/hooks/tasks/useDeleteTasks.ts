import { useMutation, useQueryClient } from "react-query"
import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"

const deleteTasks = async (taskIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/task", {
    data: {
      ids: taskIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteTasks() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteTasks, {
    onSuccess: (taskIds: string[]) => {
      queryClient.setQueryData<any[]>(["tasks"], (oldTasks) =>
        removeMany(oldTasks, taskIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteTasks: mutateAsync }
}
