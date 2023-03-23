import { Customer } from "./customer"
import { Item, OrderProductItem } from "./item"
import { ICreatedByUserTypes, IlastUpdatedByUserTypes } from "./allTypes"
import { AddressInfo } from "./userInfo"

export interface IGetAllInvoicesDataResponse {
  page: number
  data: getInvoiceResponse[]
  total_count: number
}
export interface ProductItem {
  type: string
  name: string
  cost: number
  cost_decimals: number
  desc: string
  id: string
  createdByUser?: string
  createdByUserId?: string
}
export interface getInvoiceResponse {
  id?: string
  createdByUserId: string

  lastUpdatedByUserId: string
  order_id: string
  createdByUser: string

  invoice_sequence_id: number

  customer_ref_id: string

  invoice_created_at_timestamp: number

  invoice_updated_at_timestamp: number

  invoice_notes_external: string

  invoice_items: Partial<ProductItem>[]

  invoice_items_additional: Partial<ProductItem>[]

  invoice_billing_details: BillingDetails
  invoice_payment_link: string

  tags: string[]

  customerObject: Partial<Customer>
  invoice_due_date: number

  invoice_payment_completed: boolean
}

export interface BillingDetails {
  total_amount: string
  tax_rate: string
  tax_amount: string
  items_total: string
  discount_total: string
}

export interface InvoiceSettings {
  companyName: string
  companyEmail: string
  companyPhone: string
  addressInfo: AddressInfo
  vatInfo: string
  footer: string
  prefix: string
  showCompanyLogo: boolean
  showVatInfo: boolean
  showDueDate: boolean
  showPaymentLink: boolean
  textTemplate: string
  emailTemplate: string
}
export interface Invoice {
  id: string
  order_id: string
  createdByUserId: string

  lastUpdatedByUserId: string
  createdByUser: string

  invoice_sequence_id: number

  customer_ref_id: string

  invoice_created_at_timestamp: number

  invoice_updated_at_timestamp: number

  invoice_notes_external: string

  invoice_items: OrderProductItem[]

  invoice_items_additional: OrderProductItem[]

  invoice_billing_details: BillingDetails

  invoice_due_date: number

  invoice_payment_completed: boolean
  invoice_payment_link: string

  tags: string[]

  customerObject: Partial<Customer>
}

export interface getInvoiceResponseForPublic {
  id?: string
  createdByUserId: string

  lastUpdatedByUserId: string
  createdByUser: string

  invoice_sequence_id: number

  customer_ref_id: string

  invoice_created_at_timestamp: number

  invoice_updated_at_timestamp: number

  invoice_notes_external: string

  invoice_items: Partial<OrderProductItem>[]

  invoice_items_additional: Partial<OrderProductItem>[]

  invoice_billing_details: BillingDetails
  show_vat_info: boolean
  vat_info: string
  showDueDate: boolean
  invoice_prefix: string

  tags: string[]

  customerObject: Partial<Customer>
  invoice_due_date: number

  invoice_payment_completed: boolean
  invoice_payment_link: string
  userInfo: {
    companyLogo: string
    companyName: string
    companyPhone: string
    companyEmail: string
    currency: string
    paymentSetupCompleted: boolean
    addressInfo: AddressInfo
  }
}
