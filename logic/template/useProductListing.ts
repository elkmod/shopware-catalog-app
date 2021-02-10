import { ref, watch } from "@vue/composition-api"

import Api from "~/logic/api"

let sharedCurrentCategoryId = ""
let sharedProductListing = {}

interface IProps {
  context: Vue
}

export const useProductListing = ({ context }: IProps) => {
  const { getProductListing } = Api.ProductListing(context.$axios);

  const categoryId = ref(sharedCurrentCategoryId);
  const productListing = ref(sharedProductListing);

  const setCategoryId = (id: string): void => {
    categoryId.value = id;
  };

  const fetchProductListing = async (categoryId: string) => {
    productListing.value = await getProductListing(categoryId, {
      limit: 50
    });
  };

  watch(categoryId, (id) => {
    fetchProductListing(id);
  });

  return {
    productListing,
    setCategoryId
  }
}