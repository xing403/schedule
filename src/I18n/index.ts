// import type { Path, PathValue } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

// import { registerMessageResolver, resolveValue } from '@intlify/core-base'
import zhCn from './locales/zh'
import enUs from './locales/en'

// registerMessageResolver((obj: unknown, path: Path) => {
//   const message: Path = path
//   return message
// })
export const messages = {
  zh: zhCn,
  en: enUs,
}
const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'zh',
  messages,
  // messageResolver: (obj: unknown, path: Path) => {
  //   const message: PathValue = resolveValue(obj, path)

  //   return message
  // },
})

export default i18n
