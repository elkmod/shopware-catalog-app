import { NuxtAxiosInstance } from "@nuxtjs/axios"

import { Criteria } from "~/logic/data/search/Criteria"

import { IProductListing } from "~/logic/api/interface/ProductListing"
import { open } from "~/logic/api/offline/db/DatabaseHandle";
import { name as productStoreName } from "~/logic/api/offline/db/store/Product"

export const ProductListing = (apiClient: NuxtAxiosInstance) : IProductListing => {

  const getOnlineProductListing = async (categoryId: string, criteria?: Criteria): Promise<Array<object>> => {

    const response = await apiClient.$post(`product-listing/${categoryId}`, {
      associations: {
        categoriesRo: {}
      },
      includes: {
        "product_listing": ["elements", "limit", "page", "total"],
        "product": ["id", "translated", "cover", "calculatedListingPrice", "categoriesRo"],
        "category": ["id"],
        "calculated_listing_price": ["from"],
        "calculated_price": ["totalPrice"],
        "product_media": ["media"],
        "media": ["url"]
      },
      limit: criteria?.limit || 100
    })

    const store = (await open()).transaction(productStoreName, "readwrite").store;

    response.elements.map((product: any) => {
      product.categories = product.categoriesRo.map((c: any) => c.id)

      store.put(product)
    })

    return response;
  }

  const getProductListing = async (categoryId: string, criteria?: Criteria): Promise<object> => {
    const store = (await open()).transaction(productStoreName).store;

    let categoryKeyRange = IDBKeyRange.only(categoryId);

    let productsCursor = await store.index("category").openCursor(categoryKeyRange);

    const elements: Array<object> = [];

    let
      i: number = 0,
      limit: number = criteria?.limit || 25;

    while(i < limit && productsCursor !== null && productsCursor.value !== null) {
      i++;
      elements.push(productsCursor.value);
      productsCursor = await productsCursor.continue();
    }

    if(elements.length > 0) {
      return {
        elements
      }
    }
    
    return getOnlineProductListing(categoryId, criteria)
  }

  return {
    getProductListing
  }
}