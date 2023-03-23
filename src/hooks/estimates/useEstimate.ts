import { axios_instance, cancelTokenSource } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient, useQuery } from "react-query"
import { Estimate, getEstimateResponseForPublic } from "../../types/estimate"

export interface IGetAllEstimateResponse {
  page: number
  data: Estimate[]
  total_count: number
}
const fetchSearchEstimates = async (
  page: number,
  limit: number,
  search_term: string
): Promise<IGetAllEstimateResponse> => {
  const { data } = await axios_instance.post(
    `/estimate/search?page=${page}&limit=${limit}`,
    { term: search_term },
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}
const fetchAllEstimates = async (
  page: number,
  limit: number
): Promise<IGetAllEstimateResponse> => {
  cancelTokenSource.cancel("Request cancelled for previous")
  const { data } = await axios_instance.get(
    `/estimate/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}
export const fetchSpecificEstimate = async (
  estimate_id: string
): Promise<Estimate> => {
  const { data } = await axios_instance.get(
    `/estimate?estimate_id=${estimate_id}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return data
}

export const fetchSpecificEstimateForPublic = async (
  estimate_id: string
): Promise<getEstimateResponseForPublic> => {
  const { data } = await axios_instance.get(
    `/estimate/public?estimate_id=${estimate_id}`
  )

  return data
}

export function useSearchEstimates(
  page: number,
  limit: number,
  search_term: string
) {
  return useQuery(
    ["estimates", page, limit, search_term],
    () => fetchSearchEstimates(page, limit, search_term),
    { keepPreviousData: true }
  )
}

export function useEstimate(page: number, limit: number) {
  return useQuery(
    ["estimates", page, limit],
    () => fetchAllEstimates(page, limit),
    { keepPreviousData: true }
  )
}
