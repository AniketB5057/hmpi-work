import { Customer } from "./customer"
import { Item } from "./item"
import { ICreatedByUserTypes, IlastUpdatedByUserTypes } from "./allTypes"

export interface BillingDetails {
  total_amount: string
  tax_rate: string
  tax_amount: string
  items_total: string
  discount_total: string
}
export interface Order {
  createdByUser: ICreatedByUserTypes
  id: string
  order_sequence_id: number
  lastUpdatedByUserId: IlastUpdatedByUserTypes
  domain: string
  customer_ref_id: string
  estimate_id?: string
  invoice_id?: string
  order_created_at_timestamp: number
  order_job_start_timestamp?: number
  order_job_end_timestamp?: number
  calendar_color: string
  order_updated_at_timestamp: number
  notes: string
  order_items: Item[]
  order_items_additional: Item[]
  order_payment_completed: boolean
  order_billing_details: BillingDetails
  tags: string[]
  is_deleted: boolean
  order_no: string
  customerObject: Customer
  show_job_time_checkbox: boolean
}
