import { useMutation, useQueryClient } from "react-query"
import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { Task } from "../../types/task"

const updateTask = async (task: Task): Promise<Task> => {
  const { data } = await axios_instance.put("/task", task, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateTask, {
    onSuccess: (task: Task) => {
      queryClient.setQueryData<any[]>(["tasks"], (oldTasks) =>
        updateOne(oldTasks, task)
      )
    },
  })

  return { isUpdating: isLoading, updateTask: mutateAsync }
}
