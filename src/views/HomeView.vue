<template>
  <main class="container mx-auto my-8 md:mt-14 text-white flex flex-col px-4">
    <!-- Search Bar -->
    <div class="w-full bg-secondary rounded-lg text-primary sm:w-1/2 lg:w-1/3">
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

    <div class="flex flex-col sm:flex-row w-full gap-4 md:gap-8 mt-8 md:mt-14">
      <!-- Side menu -->
      <div class="flex flex-col gap-4">
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
              <h2>Categories</h2>
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
              <a href="" class="hover:border-b-primary hover:border-b-2">All</a>
            </li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Clothes</a></li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Electronics</a></li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Furniture</a></li>
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

              <h2>Filters</h2>
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
          <ul
            :class="toggleFilters ? 'flex' : 'hidden'"
            class="sm:flex flex-col gap-2 px-4 pb-4 sm:text-left"
          >
            <li>
              <a href="" class="hover:border-b-primary hover:border-b-2">All</a>
            </li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Clothes</a></li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Electronics</a></li>
            <li><a href="" class="hover:border-b-primary hover:border-b-2">Furniture</a></li>
          </ul>
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
        v-else-if="!searchedProducts.length"
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
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
      >
        <!-- Product card -->
        <ProductItem v-for="product in searchedProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import ProductItem from '@/components/ProductItem.vue'

const toggleCategories = ref(false)
const toggleFilters = ref(false)

const searchProducts = ref('')
const store = useProductStore()
const { isLoading } = storeToRefs(store)

const getProducts = computed(() => {
  return store.getProducts
})

const searchedProducts = computed(() => {
  return getProducts.value.filter((product) => {
    return product.title.toLowerCase().includes(searchProducts.value.toLowerCase())
  })
})

onMounted(() => {
  store.fetchProducts()
})
</script>
