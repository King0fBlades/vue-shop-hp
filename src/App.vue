<template>
  <div class="min-h-screen flex flex-col bg-background">
    <SiteNavigation />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
