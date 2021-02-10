import { Ref, ref } from "@vue/composition-api"

import Api from "~/logic/api"

interface IProps {
  context: Vue
}

export const useNavigation = ({ context }: IProps) => {
  const { getCategories } = Api.Navigation(context.$axios)

  const categories: Ref<any> = ref([])

  const fetchCategories = async () => {
    const categoryResult = await getCategories(2)
    categories.value = categoryResult
  }

  return {
    categories,
    fetchCategories
  }
}