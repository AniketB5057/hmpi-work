import { axios_instance } from "../../config"
import { useMutation, useQueryClient } from "react-query"
import { updateOne } from "../../utils/crudUtils"
import { Item } from "../../types/item"
import { getItem } from "../../utils/localStorage"

const updateItem = async (item: Item): Promise<Item> => {
  const { data } = await axios_instance.put("/item", item, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateItem, {
    onSuccess: (item: Item) => {
      queryClient.setQueryData<Item[]>(["items"], (oldItems) =>
        updateOne(oldItems, item)
      )
    },
  })

  return { isUpdating: isLoading, updateItem: mutateAsync }
}
