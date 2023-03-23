import { useMutation, useQueryClient } from "react-query"
import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"

const deleteCustomers = async (customerIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/customer", {
    data: {
      ids: customerIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteCustomers() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteCustomers, {
    onSuccess: (customerIds: string[]) => {
      queryClient.setQueryData<any[]>(["customers"], (oldCustomers) =>
        removeMany(oldCustomers, customerIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteCustomers: mutateAsync }
}
