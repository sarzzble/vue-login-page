import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

import i18n from './lib/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CLIENT_ID + '.apps.googleusercontent.com',
})

app.mount('#app')

const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = savedTheme || (prefersDark ? 'dark' : 'light')
document.documentElement.classList.remove('theme-light', 'theme-dark')
document.documentElement.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
