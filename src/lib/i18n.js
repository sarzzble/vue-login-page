import { createI18n } from 'vue-i18n'
import en from './langs/en.json'
import tr from './langs/tr.json'

const messages = {
  en,
  tr,
}

const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null

const i18n = createI18n({
  locale: savedLocale || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
