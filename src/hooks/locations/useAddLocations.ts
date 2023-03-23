import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Location } from "../../types/location"

const addLocation = async (location: Location): Promise<Location> => {
  const { data } = await axios_instance.post("/location", location, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddLocation() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addLocation, {
    onSuccess: (location: Location) => {
      queryClient.setQueryData<Location[]>(["locations"], (oldLocations) =>
        addOne(oldLocations, location)
      )
    },
  })

  return { isAdding: isLoading, addLocation: mutateAsync }
}
