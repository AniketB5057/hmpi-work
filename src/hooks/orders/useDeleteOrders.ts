import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Order } from "../../types/order"

const deleteOrders = async (orderIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/order", {
    data: {
      ids: orderIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteOrders() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteOrders, {
    onSuccess: (orderIds: string[]) => {
      queryClient.setQueryData<any[]>(["orders"], (oldOrders) =>
        removeMany(oldOrders, orderIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteOrders: mutateAsync }
}
