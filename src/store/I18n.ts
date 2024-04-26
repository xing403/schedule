import { useI18n } from 'vue-i18n'

const useI18nStore = defineStore('I18n', () => {
  const { t, locale } = useI18n()
  const { language } = useNavigatorLanguage()
  locale.value = localStorage.getItem('locale') || language.value?.toLowerCase() || 'zh-cn'
  function changeLocale(lang: string) {
    if (lang === locale.value)
      return

    locale.value = lang
    localStorage.setItem('locale', lang)
  }
  return {
    t,
    locale,
    changeLocale,
  }
})

export default useI18nStore
