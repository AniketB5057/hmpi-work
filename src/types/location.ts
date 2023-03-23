import { ICreatedByUserTypes, IlastUpdatedByUserTypes } from "./allTypes"

export interface Location {
  id: string
  business_email?: string

  location_name?: string

  address_line_1?: string

  address_line_2?: string

  phone_number?: string

  phone_number_alt?: string

  city?: string

  country?: string

  post_code?: string

  channel?: string

  tags?: string[]

  google_address_id?: string

  google_my_business_id?: string

  instagram_profile?: string

  facebook_profile?: string

  notes?: string
}
