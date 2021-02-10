import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { IProductListing } from "~/logic/api/interface/ProductListing"

import { Criteria } from "~/logic/data/search/Criteria"

export const ProductListing = (apiClient: NuxtAxiosInstance) : IProductListing => {

  const getProductListing = async (categoryId: string, criteria?: Criteria): Promise<Array<object>> => {

    const response = await apiClient.$post(`product-listing/${categoryId}`, {
      includes: {
        "product_listing": ["elements", "limit", "page", "total"],
        "product": ["id", "translated", "cover", "calculatedListingPrice"],
        "calculated_listing_price": ["from"],
        "calculated_price": ["totalPrice"],
        "product_media": ["media"],
        "media": ["url"]
      },
      limit: criteria?.limit || 100
    })

    return response;
  }

  return {
    getProductListing
  }
}