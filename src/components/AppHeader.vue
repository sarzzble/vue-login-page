<template>
  <header class="bg-gray-800 text-white px-24 py-4 flex justify-between">
    <div class="flex items-center justify-center gap-4">
      <router-link to="/" class="text-white">Home</router-link>
      <router-link to="/app" class="text-white ml-4">App</router-link>
    </div>
    <div class="flex items-center justify-center gap-4">
      <select
        id="language-select"
        v-model="locale"
        @change="changeLocale"
        class="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      <div>
        <button
          id="logout-btn"
          @click="logout()"
          class="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { locale } = useI18n()
const { logout } = useAuthStore()

function changeLocale(e) {
  locale.value = e.target.value
}
</script>
