import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Order } from "../../types/order"

const updateOrder = async (order: Order): Promise<Order> => {
  const { data } = await axios_instance.put("/order", order, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateOrder() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateOrder, {
    onSuccess: (order: Order) => {
      queryClient.setQueryData<any[]>(["orders"], (oldOrders) =>
        updateOne(oldOrders, order)
      )
    },
  })

  return { isUpdating: isLoading, updateOrder: mutateAsync }
}
