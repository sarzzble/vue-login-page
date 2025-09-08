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

      <div class="flex items-center">
        <button
          type="button"
          class="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer flex items-center justify-center"
          @click="toggleTheme"
          :title="currentTheme === 'dark' ? t('header.themeLight') : t('header.themeDark')"
          aria-label="Toggle theme"
        >
          <i
            :class="
              currentTheme === 'dark' ? 'pi pi-sun text-yellow-300' : 'pi pi-moon text-blue-200'
            "
          ></i>
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
import { ref, onMounted } from 'vue'

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

const currentTheme = ref('light')

function applyTheme(theme) {
  currentTheme.value = theme
  try {
    localStorage.setItem('theme', theme)
  } catch (e) {
    console.error(e)
  }
  document.documentElement.classList.remove('theme-light', 'theme-dark')
  document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
}

function toggleTheme() {
  applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') {
      currentTheme.value = saved
    } else {
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'dark' : 'light'
    }
  } catch (e) {
    console.error(e)
  }
})
</script>
