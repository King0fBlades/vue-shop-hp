<template>
  <section class="container flex flex-col gap-4 mx-auto text-white my-10 px-4">
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
      v-else-if="!product"
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
      class="flex flex-col lg:flex-row gap-8 justify-between items-center border-2 border-secondary rounded-xl p-4"
    >
      <div class="flex items-start justify-center w-full lg:w-1/3">
        <img
          :src="product.image"
          :alt="product.image"
          class="w-fit overflow-hidden rounded-lg object-contain h-80"
        />
      </div>
      <div class="flex flex-col gap-6 justify-between mb-6 md:mb-2 lg:w-3/4 h-full">
        <div class="flex flex-col gap-2">
          <h2 class="font-extrabold text-2xl lg:text-3xl tracking-wide">
            {{ product.title }}
          </h2>
          <p class="text-md text-primary xl:text-2xl">{{ product.category }}</p>
        </div>
        <p class="lg:mr-10 lg:text-2xl">{{ product.description }}</p>
        <div class="flex flex-row items-end justify-between">
          <div>
            <p class="tracking-wide text-primary 2xl:text-lg">Price:</p>
            <p class="font-bold text-2xl">$ {{ product.price }}</p>
          </div>
          <Toast position="top-center" class="w-fit" />
          <Button
            label="Add to cart"
            severity="add"
            class="font-bold xl:text-xl py-2 2xl:py-4 px-4 2xl:px-8 rounded-lg bg-primary lg:mr-10 hover:scale-105"
            @click="addToCart(product)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

const cartStore = useCartStore()
const route = useRoute()
const { fetchProduct } = useProductStore()
const { product, isLoading } = storeToRefs(useProductStore())
const toast = useToast()

const addToCart = (product) => {
  cartStore.addToCart({ ...product })
  toast.add({
    severity: 'success',
    summary: product.title,
    detail: 'Successfully added to cart ',
    life: 3000
  })
}

fetchProduct(route.params.id)
</script>
