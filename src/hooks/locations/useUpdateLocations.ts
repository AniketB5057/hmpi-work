import { axios_instance } from "../../config"
import { useMutation, useQueryClient } from "react-query"
import { updateOne } from "../../utils/crudUtils"
import { Location } from "../../types/location"
import { getItem } from "../../utils/localStorage"

const updateLocation = async (location: Location): Promise<Location> => {
  const { data } = await axios_instance.put("/location", location, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateLocation() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateLocation, {
    onSuccess: (location: Location) => {
      queryClient.setQueryData<Location[]>(["locations"], (oldLocations) =>
        updateOne(oldLocations, location)
      )
    },
  })

  return { isUpdating: isLoading, updateLocation: mutateAsync }
}
