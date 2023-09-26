import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  loadingToggle()
  next()
})

router.afterEach((to, from) => {
  loadingToggle()
})

export default router
