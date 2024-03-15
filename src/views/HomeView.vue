<template>
  <main class="container mx-auto my-8 md:mt-14 text-white flex flex-col px-4">
    <div class="flex flex-row flex-wrap gap-4 justify-between items-center">
      <div class="order-1">
        <h2 v-if="!route.params.category" class="font-bold text-xl sm:text-2xl">
          All products ({{ filteredProducts.length }})
        </h2>
        <h2 v-else class="font-bold text-xl">
          {{ route.params.category[0].toUpperCase() + route.params.category.slice(1) }} ({{
            filteredProducts.length
          }})
        </h2>
      </div>
      <!-- Search Bar -->
      <div class="w-full order-last lg:order-2 bg-secondary rounded-lg text-primary lg:w-1/3">
        <label for="search" class="gap-2 px-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            id="search"
            v-model="searchProducts"
            type="text"
            placeholder="Search for product"
            class="pr-4 py-2 w-full bg-transparent placeholder:text-white placeholder:opacity-60 text-white rounded-lg outline-none"
          />
        </label>
      </div>
      <!-- Sort -->
      <div class="flex flex-row gap-2 order-3 w-1/3 sm:w-1/4 justify-end">
        <label class="hidden sm:flex items-center gap-1 text-md font-medium" for="sort"
          >Sort By</label
        >
        <select
          id="sort"
          v-model="selectedOption"
          class="block w-2/3 sm:w-1/2 bg-secondary p-2 rounded-xl cursor-pointer"
        >
          <option v-for="(option, i) in sortOptions" :key="i" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid sm:grid-flow-col sm:grid-col-2 gap-4 md:gap-6 mt-8 md:mt-14">
      <!-- Side menu -->
      <div class="flex flex-col gap-4 sm:w-52 lg:w-60">
        <!-- Categories -->
        <div class="flex flex-col bg-secondary rounded-md h-fit">
          <div class="px-4 flex py-4 justify-between items-center gap-4 text-lg font-semibold">
            <div class="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h2 class="font-bold text-xl tracking-wide">Categories</h2>
            </div>
            <button class="flex sm:hidden" @click="toggleCategories = !toggleCategories">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <ul
            :class="toggleCategories ? 'flex' : 'hidden'"
            class="sm:flex flex-col gap-2 px-4 pb-4 sm:text-left"
          >
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="hover:border-b-primary hover:border-b-2 font-semibold text-lg"
                >All</router-link
              >
            </li>
            <li v-for="(category, i) in getCategories" :key="i">
              <router-link
                :to="{ name: 'category', params: { category } }"
                class="hover:border-b-primary hover:border-b-2 font-semibold text-lg"
                >{{ category[0].toUpperCase() + category.slice(1) }}</router-link
              >
            </li>
          </ul>
        </div>
        <!-- Filters -->
        <div class="flex flex-col bg-secondary rounded-md h-fit">
          <div class="px-4 flex py-4 justify-between items-center gap-4 text-lg font-semibold">
            <div class="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>

              <h2 class="font-bold text-xl tracking-wide">Filters</h2>
            </div>
            <button class="flex sm:hidden" @click="toggleFilters = !toggleFilters">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <div
            :class="toggleFilters ? 'flex' : 'hidden'"
            class="sm:flex flex-col gap-6 px-4 pb-4 sm:text-left"
          >
            <div class="flex flex-col gap-6 mb-2">
              <p class="border-b-2 border-primary pb-2 font-semibold text-lg">Shop by price</p>
              <div class="flex flex-row gap-2 justify-between">
                <input
                  v-model="price[0]"
                  type="number"
                  :min="price[0]"
                  :max="price[1]"
                  class="text-black text-normal sm:text-lg w-1/4 sm:w-1/3 rounded-lg px-2 py-1 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <input
                  v-model="price[1]"
                  type="number"
                  :min="price[0]"
                  :max="price[1]"
                  class="text-black text-normal sm:text-lg w-1/4 sm:w-1/3 rounded-lg px-2 py-1 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div class="flex w-full items-center justify-center">
                <Slider
                  v-model="price"
                  :min="0"
                  :max="1000"
                  range
                  class="text-center w-11/12"
                  :pt="{ range: 'bg-primary' }"
                />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <p class="border-b-2 border-primary pb-2 font-semibold text-lg">Shop by rating</p>
              <div
                v-for="rating in ratingRange"
                :key="rating.value"
                class="flex items-center gap-2 font-semibold"
              >
                <input
                  :id="rating.value"
                  v-model="ratingsFilter"
                  :value="rating.value"
                  name="rating.value"
                  type="checkbox"
                  class="w-5 h-5 cursor-pointer text-primary border border-accent bg-white checked:bg-primary accent-primary focus:ring-2 ring-offset-2 outline-offset-4 ring-primary rounded-md"
                />
                <label :for="rating.value">
                  {{ rating.text }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Product cards grid-->
      <div v-if="isLoading" class="flex items-center justify-center w-full mt-6">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
      <div
        v-else-if="!filteredProducts.length"
        class="flex flex-col items-center justify-center w-full text-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-16 h-16 text-primary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
        <p class="font-bold text-2xl tracking-wide">No results found!</p>
        <p class="opacity-80">Please try again.</p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6"
      >
        <!-- Product card -->
        <ProductItem v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/products'
import ProductItem from '@/components/ProductItem.vue'

const toggleCategories = ref(false)
const toggleFilters = ref(false)
const searchProducts = ref('')
const selectedOption = ref('a_z')
const ratingsFilter = ref([])
let price = ref([0, 1000])

const route = useRoute()
const store = useProductStore()
const { isLoading } = storeToRefs(store)
const { fetchProducts, fetchCategories } = useProductStore()

const sortOptions = ref([
  { text: 'a-z', value: 'a_z' },
  { text: 'z-a', value: 'z_a' },
  { text: 'Price: High - Low', value: 'priceDesc' },
  { text: 'Price: Low - High', value: 'priceAsc' }
])

const ratingRange = ref([
  { text: 'Under 1.0', value: '0' },
  { text: '1.0 - 1.9', value: '1' },
  { text: '2.0 - 2.9', value: '2' },
  { text: '3.0 - 3.9', value: '3' },
  { text: 'Above 4', value: '4' }
])

const getProducts = computed(() => {
  return store.getProducts
})

const getCategories = computed(() => {
  return store.getCategories
})

const filteredProducts = computed(() => {
  let products = getProducts.value

  products = products.filter((product) => {
    return product.price >= price.value[0] && product.price <= price.value[1]
  })

  if (ratingsFilter.value.length > 0) {
    products = products.filter((product) => {
      const rating = product.rating.rate
      return ratingsFilter.value.includes(String(Math.floor(rating)))
    })
  }

  if (searchProducts.value !== '') {
    const searchTerm = searchProducts.value.toLowerCase()
    products = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      )
    })
  }

  switch (selectedOption.value) {
    case 'a_z':
      products = products.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'z_a':
      products = products.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'priceDesc':
      products = products.sort((a, b) => b.price - a.price)
      break
    case 'priceAsc':
      products = products.sort((a, b) => a.price - b.price)
      break
  }

  return products
})

watchEffect(() => fetchProducts(route.params.category))

onMounted(() => {
  if (!route.params.category) {
    fetchProducts(route.params.category)
  }
  fetchCategories()
})
</script>
