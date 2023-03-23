import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Order } from "../../types/order"

const addOrder = async (customer: Order): Promise<Order> => {
  const { data } = await axios_instance.post("/order", customer, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddOrder() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addOrder, {
    onSuccess: (order: Order) => {
      queryClient.setQueryData<Order[]>(["orders"], (oldOrder) =>
        addOne(oldOrder, order)
      )
    },
  })

  return { isAdding: isLoading, addOrder: mutateAsync }
}
