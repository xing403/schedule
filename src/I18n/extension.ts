import { resolveValue } from '@intlify/core-base'
import { useI18n } from 'vue-i18n'

export function flexibleValue(key: string | string[]) {
  const i18n = useI18n()
  const locale = i18n.getLocaleMessage(i18n.locale.value)

  if (typeof key === 'string')
    return resolveValue(locale, key) || key

  const messages = key.map(item => resolveValue(locale, item) || item)
  if (i18n.locale.value.startsWith('zh'))
    return (messages || key).join('')
  else if (i18n.locale.value.startsWith('en'))
    return (messages || key).join(' ')
  else
    return (messages || key).join(' ')
}
