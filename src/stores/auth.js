import router from '@/router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('auth') === 'true',
  }),
  actions: {
    login(user) {
      this.isAuthenticated = true
      localStorage.setItem('auth', 'true')
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('auth')
      localStorage.removeItem('name')
      localStorage.removeItem('user')

      router.push({ name: 'login' })
    },
  },
})
