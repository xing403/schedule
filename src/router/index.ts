import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import useI18nStore from '~/store/I18n'

const { isLoading } = useNProgress()
const loadingToggle = useToggle(isLoading)
// generated has layout
const layoutRoutes = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enable !== false && item.meta?.layout !== false
}))

const restRoutes = generatedRoutes.filter((item) => {
  return item.meta?.enable !== false && item.meta?.layout === false
})
const routes = [
  ...layoutRoutes,
  ...restRoutes,
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (_to, _from, next) => {
  const { t } = useI18nStore()
  useTitle(t('schedule'))
  if (!isLoading.value)
    loadingToggle()

  next()
})

router.afterEach((_to, _from) => {
  loadingToggle()
})

export default router
