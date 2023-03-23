import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Estimate } from "../../types/estimate"

const addEstimate = async (estimate: Estimate): Promise<Estimate> => {
  const { data } = await axios_instance.post("/estimate", estimate, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddEstimate() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addEstimate, {
    onSuccess: (estimate: Estimate) => {
      queryClient.setQueryData<Estimate[]>(["estimates"], (oldEstimate) =>
        addOne(oldEstimate, estimate)
      )
    },
  })

  return { isAddingEstimate: isLoading, addEstimate: mutateAsync }
}
