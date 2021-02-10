import { NuxtAxiosInstance } from "@nuxtjs/axios"

import { Criteria } from "~/logic/data/search/Criteria"

import { INavigation } from "~/logic/api/interface/Navigation"
import { open } from "~/logic/api/offline/db/DatabaseHandle";
import { name as navigationStoreName } from "~/logic/api/offline/db/store/Navigation"

export const Navigation = (apiClient: NuxtAxiosInstance) : INavigation => {

  const getOnlineCategories = async (depth: number, criteria?: Criteria): Promise<Array<object>> => {

    const response = await apiClient.$post('navigation/main-navigation/main-navigation', {
      includes: {
        "category": ["id", "translated"]
      }
    })

    const store = (await open()).transaction(navigationStoreName, "readwrite").store;

    response.map((category: any) => store.put(category))

    return response;
  }

  const getCategories = async (depth: number, criteria?: Criteria): Promise<Array<object>> => {
    const store = (await open()).transaction(navigationStoreName).store;

    const categories = await store.getAll();

    if(categories.length > 0) {
      return categories
    }

    // Write-through
    return getOnlineCategories(depth, criteria);
  }

  return {
    getCategories
  }
}