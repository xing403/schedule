import { createI18n } from 'vue-i18n'
import zhCn from './locales/zh.json'
import enUs from './locales/en.json'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh: zhCn,
    en: enUs,
  },
})
export default i18n
