import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { useMutation, useQueryClient } from "react-query"
import { getItem } from "../../utils/localStorage"

const deleteEstimates = async (EstimateIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/estimate", {
    data: {
      ids: EstimateIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteEstimates() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteEstimates, {
    onSuccess: (EstimateIds: string[]) => {
      queryClient.setQueryData<any[]>(["estimates"], (oldEstimates) =>
        removeMany(oldEstimates, EstimateIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteEstimates: mutateAsync }
}
