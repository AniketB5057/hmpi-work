export interface User {
  id: string
  avatar?: string
  disabled: boolean
  email: string
  firstName: string
  lastName: string
  role: string
}
export interface PresignedURLResponse {
  uploadURL: string
  downloadURL: string
}
export interface StaffUser {
  id: string
  password: string
  email: string
  firstName: string
  lastName: string
  roles: UserRoleTypes[]
}

export enum UserRoleTypes {
  ADMIN = "ADMIN",
  ADMIN_STAFF = "ADMIN_STAFF",
  OFFICE_STAFF = "OFFICE_STAFF",
  FIELD_WORKER_STAFF = "FIELD_WORKER_STAFF",
  SALES_STAFF = "SALES_STAFF",
  MARKETTING_STAFF = "MARKETTING_STAFF",
  ACCOUNTING_STAFF = "ACCOUNTING_STAFF",
}

export interface ICreatedByUserTypes {
  _id: string
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface IlastUpdatedByUserTypes {
  _id: string
  id: string
  email: string
  firstName: string
  lastName: string
}
