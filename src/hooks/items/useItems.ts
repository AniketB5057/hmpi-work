import { axios_instance } from "../../config"
import { useQuery } from "react-query"
import { Item } from "../../types/item"
import { getItem } from "../../utils/localStorage"

const fetchItems = async (): Promise<Item[]> => {
  const { data } = await axios_instance.get(`/item/all`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useItems() {
  return useQuery("items", () => fetchItems())
}
