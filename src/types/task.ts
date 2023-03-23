export interface Task {
  createdByUserId: string
  lastUpdatedByUserId: string
  createdByUser: string
  domain: string
  description: string
  title: string
  employee_ids: string[]
  location_ids: string[]
  customer_ids: string[]
  calendar_color: string
  task_created_at_timestamp: number
  task_updated_at_timestamp: number
  task_calendar_timestamp: number
  reminder_timestamp: number
  task_sequence_id: number
  should_remind: boolean
  did_remind: boolean
  id: string
}
