import {
  ICreatedByUserTypes,
  IlastUpdatedByUserTypes,
  UserRoleTypes,
} from "./allTypes"

export interface Employee {
  id: string
  domain: string
  suffix: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  phone_number_alt: string
  access_level: UserRoleTypes[]
  locationIds: string[]
  employeeGroupIds: string[]
  notes: string
  address_line_1: string
  address_line_2: string
  city: string
  country: string
  post_code: string
  tags: string[]
}
