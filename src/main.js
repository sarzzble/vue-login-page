import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const i18n = createI18n({
  legacy: false, // Composition API mode
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      specialText: 'This is some special text',
    },
    fr: {
      specialText: 'Ceci est un texte spécial',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_CLIENT_ID + '.apps.googleusercontent.com',
})

app.mount('#app')
