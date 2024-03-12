<template>
  <div class="container flex flex-col gap-4 mx-auto text-white my-10 px-4">
    <div
      v-if="!cartItems.length"
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
      <p class="font-bold text-2xl tracking-wide">Your cart is currently empty!</p>
    </div>
    <div v-else class="flex flex-col w-full mt-2 sm:mt-6">
      <div class="mb-6 sm:mb-10 flex flex-col md:flex-row gap-4 justify-between items-end">
        <h2 class="font-bold text-2xl md:text-4xl tracking-wide">Shopping cart</h2>
        <p class="text-lg sm:text-xl font-bold sm:w-fit">
          Total price:
          <span class="text-xl sm:text-2xl sm:ml-2">{{ totalPrice.toFixed(2) }} $</span>
        </p>
      </div>
      <ul class="gap-2">
        <li
          v-for="(item, i) in cartItems"
          :key="i"
          class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 w-full mb-4 bg-secondary px-4 py-2 rounded-lg"
        >
          <div class="flex flex-row gap-5 sm:gap-10">
            <div class="flex items-center w-auto">
              <img
                :src="item.image"
                :alt="item.title"
                class="size-24 md:size-36 overflow-hidden rounded-lg"
              />
            </div>
            <div class="flex flex-col gap-2 justify-evenly w-2/3">
              <h2 class="font-semibold text-sm sm:text-bold sm:text-xl">{{ item.title }}</h2>
              <p class="text-xs sm:text-base text-primary">{{ item.category }}</p>
              <p class="text-xs sm:text-base">{{ item.price }} $</p>
            </div>
          </div>
          <div class="flex flex-row justify-between gap-10">
            <div class="flex flex-row w-fit h-fit justify-between">
              <button
                class="p-2"
                :disabled="item.quantity <= 1"
                @click="cartStore.decrementQuantity(item)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:w-6 md:h-6 text-primary"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <p
                class="w-14 text-center font-semibold text-sm h-fit sm:text-md py-1 px-2 md:py-2 md:px-4 md:text-xl"
              >
                {{ item.quantity }}
              </p>
              <button class="p-2" @click="cartStore.incrementQuantity(item)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 md:w-6 md:h-6 text-primary"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <button class="hover:scale-110" @click="removeFromCart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>

      <div class="flex flex-row justify-between mt-10 items-start">
        <button
          class="font-semibold w-fit xl:text-lg text-primary hover:text-white hover:scale-105"
          @click="clearCart"
        >
          Clear cart
        </button>

        <button
          class="font-semibold xl:text-lg py-1 2xl:py-2 px-2 2xl:px-4 rounded-lg bg-primary hover:scale-105"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed, watchEffect } from 'vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
let totalPrice = cartStore.totalPrice

const removeFromCart = (index) => {
  cartStore.removeFromCart(index)
}

const clearCart = () => {
  cartStore.clearCart()
}

watchEffect(() => {
  totalPrice = cartStore.totalPrice
})
</script>
