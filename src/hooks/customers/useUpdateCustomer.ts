import { useMutation, useQueryClient } from "react-query"
import { Customer } from "../../types/customer"
import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"

const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const { data } = await axios_instance.put("/customer", customer, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateCustomer, {
    onSuccess: (customer: Customer) => {
      queryClient.setQueryData<any[]>(["customers"], (oldCustomers) =>
        updateOne(oldCustomers, customer)
      )
    },
  })

  return { isUpdating: isLoading, updateCustomer: mutateAsync }
}
