import { FieldTypes } from "./fieldTypes"

export interface OrderProductItem extends Item {
  total_cost?: string
  sub_total_cost?: string
  notes?: string
  before_images?: string[]
  after_images?: string[]
  quantity?: number
}

export interface Item {
  type: string
  name: string
  cost: number
  cost_decimals: number
  desc: string
  fields: ICustomFields[]
  id: string
  createdByUser?: string
  createdByUserId?: string
}

export interface ICustomFields {
  type: FieldTypes
  prefillValue: string | string[]
  required: boolean
  label: string
  dropdown_options?: string[]
  radio_options?: string[]
}
