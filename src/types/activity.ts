export interface Activity {
  created_by_user_id: string
  activity_name: string
  desc: string

  activity_type: string

  domain: string

  action_link: string

  before_values: any

  after_values: any

  difference: any

  created_at: number

  updated_at: number
  is_deleted: boolean
}
