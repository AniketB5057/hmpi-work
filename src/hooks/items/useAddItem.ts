import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Item } from "../../types/item"

const addItem = async (item: Item): Promise<Item> => {
  const { data } = await axios_instance.post("/item", item, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddItem() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addItem, {
    onSuccess: (item: Item) => {
      queryClient.setQueryData<Item[]>(["items"], (oldItems) =>
        addOne(oldItems, item)
      )
    },
  })

  return { isAdding: isLoading, addItem: mutateAsync }
}
