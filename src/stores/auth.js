import router from '@/router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true
      localStorage.setItem('auth', 'true')
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('auth')
      localStorage.removeItem('name')

      router.push({ name: 'login' })
    },
  },
})
