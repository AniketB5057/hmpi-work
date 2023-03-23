import { useQuery } from "react-query"
import { Employee } from "../../types/employee"
import { axios_instance } from "../../config"

import { getItem } from "../../utils/localStorage"

const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios_instance.get(`/employee/all`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })

  return data
}

export function useEmployees() {
  return useQuery(["employees"], () => fetchEmployees(), {
    keepPreviousData: true,
  })
}
