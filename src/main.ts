import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '~/assets/styles'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

initApp()
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
// eslint-disable-next-line no-console
console.log(`%c version %c ${version} `, 'color:#FFF;background:#5c5c5c;border-radius:5px 0 0 5px;padding:5px;margin: 5px 0', 'color:#FFF;background:#E6A23C;border-radius:0 5px 5px 0;padding:5px;margin: 5px 0')
