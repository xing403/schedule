import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import ElementPlus from 'element-plus'
import routes from 'virtual:generated-pages'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
