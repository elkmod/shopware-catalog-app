<template>
  <div class="flex border-b-2">
    <div class="w-3/12 p-4 text-center" v-for="category in categories" :key="category.id">
      <nuxt-link :to="{ path: `/listing/${category.id}` }">{{ category.translated.name }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { useNavigation } from "~/logic/template/useNavigation"

export default {
  name: "Navigation",
  setup({}, { root }) {
    const { fetchCategories, categories } = useNavigation(root)

    return {
      categories,
      fetchCategories
    }
  },

  mounted () {
    try {
      this.fetchCategories()
    } catch (e) {
      console.error("[Navigation.vue]", e)
    }
  },
}
</script>