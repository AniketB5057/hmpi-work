import { useQuery } from "react-query"
import { Customer } from "../../types/customer"
import { axios_instance, cancelTokenSource } from "../../config"

import { getItem } from "../../utils/localStorage"
export interface IGetAllCustomerDataResponse {
  page: number
  data: Customer[]
  total_count: number
}

const fetchSearchCustomers = async (
  page: number,
  limit: number,
  search_term: string
): Promise<IGetAllCustomerDataResponse> => {
  const { data } = await axios_instance.post(
    `/customer/search?page=${page}&limit=${limit}`,
    { term: search_term },
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}
const fetchCustomers = async (
  page: number,
  limit: number
): Promise<IGetAllCustomerDataResponse> => {
  cancelTokenSource.cancel("Request cancelled for previous")
  const { data } = await axios_instance.get(
    `/customer/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}
export function useSearchCustomer(
  page: number,
  limit: number,
  search_term: string
) {
  return useQuery(
    ["customers", page, limit, search_term],
    () => fetchSearchCustomers(page, limit, search_term),
    { keepPreviousData: true }
  )
}
export function useCustomers(page: number, limit: number) {
  return useQuery(
    ["customers", page, limit],
    () => fetchCustomers(page, limit),
    { keepPreviousData: true }
  )
}
