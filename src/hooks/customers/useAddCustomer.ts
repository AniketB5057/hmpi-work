import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Customer } from "../../types/customer"

const addCustomer = async (customer: Customer): Promise<Customer> => {
  const { data } = await axios_instance.post("/customer", customer, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddCustomer() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addCustomer, {
    onSuccess: (customer: Customer) => {
      queryClient.setQueryData<Customer[]>(["customers"], (oldCustomer) =>
        addOne(oldCustomer, customer)
      )
    },
  })

  return { isAdding: isLoading, addCustomer: mutateAsync }
}
