// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import Layout from './Layout.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/dist/index.css'
import 'uno.css'
import './style.css'

export default {
  ...DefaultTheme,
  Layout: () => h(Layout),
  enhanceApp({ app }) {
    app.use(ElementPlus)
    // ...
  },
} satisfies Theme
