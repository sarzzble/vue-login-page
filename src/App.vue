<template>
  <AppHeader v-if="store.isAuthenticated" />
  <router-view class="flex h-full w-full items-center justify-center mt-32" />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
</script>
