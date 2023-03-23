import { useMutation, useQueryClient } from "react-query"
import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { Employee } from "../../types/employee"

const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const { data } = await axios_instance.put("/employee", employee, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateEmployee, {
    onSuccess: (employee: Employee) => {
      queryClient.setQueryData<any[]>(["employees"], (oldEmployees) =>
        updateOne(oldEmployees, employee)
      )
    },
  })

  return { isUpdating: isLoading, updateEmployee: mutateAsync }
}
