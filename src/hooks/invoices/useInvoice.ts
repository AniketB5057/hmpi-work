import { axios_instance, cancelTokenSource } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient, useQuery } from "react-query"
import {
  getInvoiceResponseForPublic,
  IGetAllInvoicesDataResponse,
  Invoice,
} from "../../types/invoice"

export interface IGetAllOrderDataResponse {
  page: number
  data: Invoice[]
  total_count: number
}

const fetchAllInvoices = async (
  page: number,
  limit: number
): Promise<IGetAllInvoicesDataResponse> => {
  cancelTokenSource.cancel("Request cancelled for previous")
  const { data } = await axios_instance.get(
    `/invoice/all?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}
export const fetchSpecificInvoice = async (
  invoice_id: string
): Promise<Invoice> => {
  const { data } = await axios_instance.get(
    `/invoice?invoice_id=${invoice_id}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return data
}
const fetchSearchInvoices = async (
  page: number,
  limit: number,
  search_term: string
): Promise<IGetAllInvoicesDataResponse> => {
  const { data } = await axios_instance.post(
    `/invoice/search?page=${page}&limit=${limit}`,
    { term: search_term },
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )

  return { data: data.data, total_count: data.total_count, page: data.page }
}

export const fetchSpecificInvoiceForPublic = async (
  invoice_id: string
): Promise<getInvoiceResponseForPublic> => {
  const { data } = await axios_instance.get(
    `/invoice/public?invoice_id=${invoice_id}`
  )

  return data
}
export function useSearchInvoices(
  page: number,
  limit: number,
  search_term: string
) {
  return useQuery(
    ["invoices", page, limit, search_term],
    () => fetchSearchInvoices(page, limit, search_term),
    { keepPreviousData: true }
  )
}

export function useInvoices(page: number, limit: number) {
  return useQuery(
    ["invoices", page, limit],
    () => fetchAllInvoices(page, limit),
    { keepPreviousData: true }
  )
}
