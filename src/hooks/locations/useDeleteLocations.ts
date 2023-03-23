import { axios_instance } from "../../config"
import { useMutation, useQueryClient } from "react-query"
import { removeMany } from "../../utils/crudUtils"
import { Location } from "../../types/location"
import { getItem } from "../../utils/localStorage"

const deleteLocations = async (locationIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/location", {
    data: {
      ids: locationIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteLocations() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteLocations, {
    onSuccess: (itemIds: string[]) => {
      queryClient.setQueryData<Location[]>(["locations"], (oldItems) =>
        removeMany(oldItems, itemIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteLocations: mutateAsync }
}
