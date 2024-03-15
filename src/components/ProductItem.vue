<template>
  <router-link
    :to="{ name: 'product', params: { id: product.id, category: product.category } }"
    class="flex flex-col gap-6 bg-secondary p-4 min-w-64 rounded-lg cursor-pointer shadow-inner hover:shadow-primary"
  >
    <img
      :src="product.image"
      alt="product img"
      class="h-1/2 w-full object-contain bg-white object-center rounded-md"
    />
    <div class="flex flex-col h-1/2 gap-2 justify-between mt-2">
      <p class="font-bold tracking-wide text-xl text-wrap">{{ product.title }}</p>
      <p class="truncate text-wrap h-24">{{ product.description }}</p>
      <div class="flex flex-row justify-between w-full">
        <p class="flex flex-row gap-1 font-bold text-xl items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-6 h-6 text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          {{ product.rating.rate }}
        </p>
        <p class="font-bold text-xl"><span class="text-primary">$</span> {{ product.price }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps(['product'])
</script>
