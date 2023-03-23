import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Employee } from "../../types/employee"

const addEmployee = async (employee: Employee): Promise<Employee> => {
  const { data } = await axios_instance.post("/employee", employee, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddEmployee() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addEmployee, {
    onSuccess: (employee: Employee) => {
      queryClient.setQueryData<Employee[]>(["employees"], (oldEmployee) =>
        addOne(oldEmployee, employee)
      )
    },
  })

  return { isAdding: isLoading, addEmployee: mutateAsync }
}
