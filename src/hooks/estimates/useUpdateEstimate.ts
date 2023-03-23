import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Estimate } from "../../types/estimate"

const updateEstimate = async (estimate: Estimate): Promise<Estimate> => {
  const { data } = await axios_instance.put("/estimate", estimate, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateEstimate() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateEstimate, {
    onSuccess: (estimate: Estimate) => {
      queryClient.setQueryData<any[]>(["estimates"], (oldEstimates) =>
        updateOne(oldEstimates, estimate)
      )
    },
  })

  return { isUpdatingEstimate: isLoading, updateEstimate: mutateAsync }
}
