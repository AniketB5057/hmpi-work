import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Task } from "../../types/task"

const addTask = async (task: Task): Promise<Task> => {
  const { data } = await axios_instance.post("/task", task, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddTask() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addTask, {
    onSuccess: (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks"], (oldTask) =>
        addOne(oldTask, task)
      )
    },
  })

  return { isAdding: isLoading, addTask: mutateAsync }
}
