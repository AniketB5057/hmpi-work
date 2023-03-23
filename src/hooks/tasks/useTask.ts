import { useQuery } from "react-query"
import { Task } from "../../types/task"
import { axios_instance } from "../../config"

import { getItem } from "../../utils/localStorage"

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axios_instance.get(`/task/all`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })

  return data
}

export function useTasks() {
  return useQuery(["tasks"], () => fetchTasks(), {
    keepPreviousData: true,
  })
}
