<template>
  <header class="bg-gray-800 text-white px-24 py-4 flex justify-between">
    <div class="flex items-center justify-center gap-4">
      <router-link to="/" class="text-white">{{ t('nav.home') }}</router-link>
      <router-link to="/app" class="text-white ml-4">{{ t('nav.app') }}</router-link>
      <router-link to="/encryption" class="text-white ml-4">{{ t('nav.encryption') }}</router-link>
    </div>
    <div class="flex items-center justify-center gap-4">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 cursor-pointer"
          :class="{ 'ring-2 ring-blue-400': locale === 'en' }"
          @click="setLocale('en')"
          aria-label="English"
          title="English"
        >
          <span class="fi fi-gb"></span>
          <span class="hidden sm:inline">English</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 cursor-pointer"
          :class="{ 'ring-2 ring-blue-400': locale === 'tr' }"
          @click="setLocale('tr')"
          aria-label="Türkçe"
          title="Türkçe"
        >
          <span class="fi fi-tr"></span>
          <span class="hidden sm:inline">Türkçe</span>
        </button>
      </div>

      <div>
        <button
          id="logout-btn"
          @click="logout()"
          class="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-600"
        >
          {{ t('header.logout') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { locale, t } = useI18n()
const { logout } = useAuthStore()

function setLocale(code) {
  locale.value = code
  try {
    localStorage.setItem('locale', code)
  } catch (e) {
    console.error(e)
  }
}
</script>
