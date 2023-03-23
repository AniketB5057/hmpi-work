import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient, useQuery } from "react-query"
import { Order } from "../../types/order"

export interface IGetAllOrderDataResponse {
  page: number
  data: Order[]
  total_count: number
  total_count_all_status: number
}

export interface IGetAllOrderDataResponseForCalendar {
  data: Order[]
  total_count: number
}

export interface iKanbanOrdersData {
  _id: string
  total_count: number
  orders: Order[]
}

export const fetchSpecificOrder = async (order_id: string): Promise<Order> => {
  const { data } = await axios_instance.get(`/order?order_id=${order_id}`, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })

  return data
}

export const fetchAllOrderStatuses = async (
  start_date: number,
  end_date: number
): Promise<
  {
    status: string
    count: number
  }[]
> => {
  const { data } = await axios_instance.get(
    `/order/get-statuses?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )
  return data
}
export const fetchOrdersByCalendar = async (
  start_date: number,
  end_date: number
): Promise<IGetAllOrderDataResponseForCalendar> => {
  const { data } = await axios_instance.get(
    `/order/for-calendar?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )
  return data
}

export const fetchOrders = async (
  page: number,
  limit: number,
  start_date: number,
  end_date: number,
  order_status: string,
  search_term: string
): Promise<IGetAllOrderDataResponse> => {
  const { data } = await axios_instance.get(
    `/order/all?page=${page}&limit=${limit}&start_date=${start_date}&end_date=${end_date}&status=${encodeURIComponent(
      order_status
    )}&search_term=${encodeURIComponent(search_term)}`,
    {
      headers: {
        Authorization: `Bearer ${getItem(`authkey`)}`,
      },
    }
  )
  return data
}

export function useOrders(
  page: number,
  limit: number,
  start_date: number,
  end_date: number,
  order_status: string,
  search_terms: string
) {
  return useQuery(
    ["orders", page, limit, start_date, end_date, order_status],
    () =>
      fetchOrders(
        page,
        limit,
        start_date,
        end_date,
        order_status,
        search_terms
      ),
    {
      keepPreviousData: true,
    }
  )
}

export function useOrdersByCalendar(start_date: number, end_date: number) {
  return useQuery(
    ["orders_calendar", start_date, end_date],
    () => fetchOrdersByCalendar(start_date, end_date),
    {
      keepPreviousData: true,
    }
  )
}
