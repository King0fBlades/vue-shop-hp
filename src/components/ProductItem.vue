<template>
  <router-link
    :to="{ name: 'product', params: { id: product.id } }"
    class="flex flex-col justify-between gap-6 bg-secondary p-4 h-92 min-w-64 rounded-lg cursor-pointer shadow-inner hover:shadow-primary"
  >
    <img
      :src="product.images[0]"
      alt="product img"
      class="rounded-md object-contain object-center overflow-hidden w-max h-max"
    />
    <div class="flex flex-col gap-2 justify-between mt-2">
      <p class="font-bold tracking-wide text-xl text-wrap">{{ product.title }}</p>
      <p class="truncate text-wrap h-24">{{ product.description }}</p>
      <p class="font-bold text-xl">$ {{ product.price }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps(['product'])
</script>
