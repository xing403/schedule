import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const useI18nStore = defineStore('I18n', () => {
  const { locale } = useI18n()
  const { language } = useNavigatorLanguage()

  locale.value = localStorage.getItem('locale') || language.value || 'zh-CN'
  const EPLanguage = computed(() => {
    switch (locale.value) {
      case 'zh':
        return zhCn
      case 'en':
        return en
      default:
        return zhCn
    }
  })
  function changeLocale(lang: string) {
    if (lang === locale.value)
      return

    locale.value = lang
    localStorage.setItem('locale', lang)
  }
  return {
    locale,
    EPLanguage,
    changeLocale,
  }
})

export default useI18nStore
