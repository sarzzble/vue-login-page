<template>
  <div>
    <CardUI>
      <div class="flex flex-col items-center justify-center gap-4">
        <h1>{{ t('app.welcome') }}, {{ userName }}</h1>

        <button
          id="logout-btn"
          @click="handleLogout"
          class="bg-gray-800 text-white p-4 rounded-lg cursor-pointer hover:bg-gray-700"
        >
          {{ t('header.logout') }}
        </button>
      </div>
    </CardUI>
  </div>
</template>

<script setup>
import CardUI from '@/components/ui/CardUI.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const userName = ref('')

userName.value =
  localStorage.getItem('name') || JSON.parse(localStorage.getItem('user'))?.email || ''

const store = useAuthStore()
const { logout } = store

const { t } = useI18n()

const handleLogout = () => {
  logout()

  router.push({ path: '/login' })
}
</script>
