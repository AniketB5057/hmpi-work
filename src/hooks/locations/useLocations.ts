import { axios_instance } from "../../config"
import { useQuery } from "react-query"
import { Location } from "../../types/location"
import { getItem } from "../../utils/localStorage"

const fetchLocations = async (): Promise<Location[]> => {
  const { data } = await axios_instance.get(`/location/all`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useLocations() {
  return useQuery("locations", () => fetchLocations())
}
