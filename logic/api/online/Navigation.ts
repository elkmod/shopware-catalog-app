import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { INavigation } from "~/logic/api/interface/Navigation"

import { Criteria } from "~/logic/data/search/Criteria"

export const Navigation = (apiClient: NuxtAxiosInstance) : INavigation => {

  const getCategories = async (depth: number, criteria?: Criteria): Promise<Array<object>> => {

    const response = await apiClient.$post('navigation/main-navigation/main-navigation', {
      includes: {
        "category": ["id", "translated"]
      }
    })

    return response;
  }

  return {
    getCategories
  }
}