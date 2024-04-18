import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import App from './App.vue'
import store from './store'
import router from './router'
import '~/assets/styles'
import i18n from './I18n'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
// eslint-disable-next-line no-console
console.log(`%c version %c ${version} `, 'color:#FFF;background:#5c5c5c;border-radius:5px 0 0 5px;padding:5px;margin: 5px 0', 'color:#FFF;background:#E6A23C;border-radius:0 5px 5px 0;padding:5px;margin: 5px 0')

initApp()
