import { Criteria } from "~/logic/data/search/Criteria"

export interface IProductListing {
  getProductListing: (categoryId: string, criteria?: Criteria) => Promise<object>;
}