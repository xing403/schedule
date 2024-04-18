import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default function createI18n() {
  return VueI18nPlugin({
    include: resolve(dirname(fileURLToPath(import.meta.url)), './src/I18n/locales/**'),
  })
}
