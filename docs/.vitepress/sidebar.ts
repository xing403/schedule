import path from 'node:path'
import fs from 'node:fs'
import type { DefaultTheme } from 'vitepress'

export const sidebars = {
  '/directives/': { base: '/directives/', items: sidebarMenu('directives') },
}
function sidebarMenu(dir = '') {
  const sidebar: DefaultTheme.Sidebar = [{
    text: 'description',
    link: '/description',
  }]
  for (const item of fs.readdirSync(path.resolve(__dirname, `../${dir}`))) {
    if (!item.startsWith('description')) {
      sidebar.push({
        text: item.split('.')[0],
        link: `/${item.split('.')[0]}`,
      })
    }
  }

  return sidebar
}
