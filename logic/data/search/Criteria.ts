export interface Criteria {
  includes?: Array<object>
  associations?: Array<object>
  filter?: Array<object>
  limit?: number
  page?: number
}