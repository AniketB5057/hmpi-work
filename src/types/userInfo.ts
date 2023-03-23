import { UserRoleTypes } from "./allTypes"
import { EstimateSettings } from "./estimate"
import { InvoiceSettings } from "./invoice"

export interface AddressInfo {
  street_address: string
  country: string
  city: string
  post_code: string
}
export interface CalendarColorOptions {
  color: string
  text: string
}
export interface UserInfo {
  email: string
  firstName: string
  lastName: string
  companyName: string
  companyLogo: string
  companyEmail: string
  companyPhone: string
  domain: string
  email_verified: boolean
  onboardingCompleted: boolean
  paymentSetupCompleted: boolean
  roles: UserRoleTypes[]
  currency: string
  timezone: string
  addressInfo: AddressInfo
  user_profile_logo: string
  taxRate: string
  calendarOptions: CalendarColorOptions[]
  accountOwner: boolean
  availableCredits: number
  eventStringFormat: string
  invoiceSettings: InvoiceSettings
  estimateSettings: EstimateSettings
  google_business_link: string
}

export interface UserInfoForRegister {
  email: string
  firstName: string
  password: string
  lastName: string
}

export interface UserInfoForRegisterWithGoogle {
  token: string
  timezone: string
}
