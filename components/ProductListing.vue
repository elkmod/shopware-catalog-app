<template>
  <div>
    <div class="flex flex-wrap justify-center border-b-2" v-if="productListing && productListing.elements">
      <ProductListingItem v-for="product in productListing.elements" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductListingItem from "~/components/ProductListingItem"

export default {
  name: "ProductListing",

  components: {
    ProductListingItem
  },

  props: {
    productListing: {}
  }
}
</script>