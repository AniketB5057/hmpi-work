import { ICreatedByUserTypes, IlastUpdatedByUserTypes } from "./allTypes"

export interface Lead {
  createdByUser: ICreatedByUserTypes
  lastUpdatedByUser: IlastUpdatedByUserTypes
  id: string
  domain: string
  suffix: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  phone_number_alt: string
  notes: string
  address_line_1: string
  address_line_2: string
  city: string
  country: string
  post_code: string
  google_address_id: string
  linkedin_profile: string
  instagram_profile: string
  facebook_profile: string
  channel: string
  tags: string[]
}
