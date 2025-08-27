<template>
  <div
    class="bg-white p-12 rounded-xl flex flex-col items-center justify-center gap-8 text-gray-800"
  >
    <h1>Welcome, {{ userName }}</h1>

    <button
      @click="handleLogout"
      class="bg-gray-800 text-white p-4 rounded-lg cursor-pointer hover:bg-gray-700"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'

const userName = ref('')

userName.value = localStorage.getItem('name') || ''

const store = useAuthStore()
const { logout } = store

const handleLogout = () => {
  logout()

  router.push({ path: '/login' })
}
</script>
