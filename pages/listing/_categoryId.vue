<template>
  <div>
    <ProductListing :productListing="productListing" />
  </div>
</template>

<script lang="ts">
import { onMounted, SetupContext } from "@vue/composition-api"

import { useProductListing } from "~/logic/template/useProductListing"

import ProductListing from "~/components/ProductListing.vue";

interface IContext {
  root: any
}

export default {
  components: {
    ProductListing
  },

  setup({}, { root }: IContext) {
    const { productListing, setCategoryId } = useProductListing(root)

    let categoryId = root.$route.params.categoryId

    onMounted(() => {
      try {
        setCategoryId(categoryId)
      } catch (e) {
        console.error("[Navigation.vue]", e)
      }
    });

    return {
      productListing
    }
  },
}
</script>

<style>
</style>
