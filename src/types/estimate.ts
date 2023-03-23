import { Customer } from "./customer"
import { Item, OrderProductItem } from "./item"
import { ICreatedByUserTypes, IlastUpdatedByUserTypes } from "./allTypes"
import { AddressInfo } from "./userInfo"

export interface BillingDetails {
  total_amount: string
  tax_rate: string
  tax_amount: string
  items_total: string
  discount_total: string
}

export interface getEstimateResponse {
  estimate_sequence_id: number

  estimate_created_at_timestamp: number

  estimate_updated_at_timestamp: number

  estimate_items: Partial<OrderProductItem>[]

  estimate_items_additional: Partial<OrderProductItem>[]

  estimate_billing_details: BillingDetails
  id?: string
  createdByUserId: string

  lastUpdatedByUserId: string
  order_id: string
  createdByUser: string

  customer_ref_id: string

  tags: string[]

  customerObject: Partial<Customer>
}
export interface getEstimateResponseForPublic {
  id?: string
  createdByUserId: string

  lastUpdatedByUserId: string
  createdByUser: string

  estimate_sequence_id: number

  customer_ref_id: string

  estimate_created_at_timestamp: number

  estimate_updated_at_timestamp: number

  estimate_notes_external: string

  estimate_items: Partial<OrderProductItem>[]

  estimate_items_additional: Partial<OrderProductItem>[]

  estimate_billing_details: BillingDetails
  vatInfo: string
  prefix: string
  showCompanyLogo: boolean
  showVatInfo: boolean
  showValidityDate: boolean

  tags: string[]

  customerObject: Partial<Customer>

  userInfo: {
    companyLogo: string
    companyName: string
    companyPhone: string
    companyEmail: string
    currency: string
    paymentSetupCompleted: boolean
    paymentLink: string
    addressInfo: AddressInfo
  }
}

export interface EstimateSettings {
  companyName: string
  companyEmail: string
  companyPhone: string
  addressInfo: AddressInfo
  vatInfo: string
  footer: string
  prefix: string
  showCompanyLogo: boolean
  showVatInfo: boolean
  showValidityDate: boolean
  textTemplate: string
  emailTemplate: string
}
export interface Estimate {
  id: string
  order_id: string
  createdByUserId: string

  lastUpdatedByUserId: string
  createdByUser: string

  estimate_sequence_id: number

  customer_ref_id: string

  estimate_created_at_timestamp: number

  estimate_updated_at_timestamp: number

  estimate_notes_external: string

  estimate_items: OrderProductItem[]

  estimate_items_additional: OrderProductItem[]

  estimate_billing_details: BillingDetails

  tags: string[]

  customerObject: Partial<Customer>
}
