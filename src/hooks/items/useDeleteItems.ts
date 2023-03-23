import { axios_instance } from "../../config"
import { useMutation, useQueryClient } from "react-query"
import { removeMany } from "../../utils/crudUtils"
import { Item } from "../../types/item"
import { getItem } from "../../utils/localStorage"

const deleteItems = async (itemIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/item", {
    data: {
      ids: itemIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteItems() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteItems, {
    onSuccess: (itemIds: string[]) => {
      queryClient.setQueryData<Item[]>(["items"], (oldItems) =>
        removeMany(oldItems, itemIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteItems: mutateAsync }
}
