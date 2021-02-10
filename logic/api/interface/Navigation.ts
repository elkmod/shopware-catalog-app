import { Criteria } from "~/logic/data/search/Criteria"

export interface INavigation {
  getCategories: (depth: number, criteria?: Criteria) => Promise<Array<Object>>
}