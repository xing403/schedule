import { defineConfig } from 'vitepress'
import { sidebars } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', {
    rel: 'icon',
    href: '/images/logo.png',
  }]],
  titleTemplate: ':title - Schedule',
  title: 'Schedule',
  description: 'Schedule Side',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: {
      provider: 'local',
    },
    docFooter: {
      prev: false,
      next: false,
    },
    sidebar: sidebars,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xing403/schedule' },
      { link: 'https://gitee.com/xing403/schedule', ariaLabel: 'gitee', icon: { svg: '<svg role="img" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1631" width="200" height="200"><title>Gitee</title><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" p-id="1632" /></svg>' } },
    ],
  },

})
