import { defineConfig } from 'vite'

import UnoCSS from 'unocss/vite'

import Components from 'unplugin-vue-components/vite'

export default defineConfig(async ({ mode }) => {
  return {

    plugins: [
      Components({
        dirs: ['.vitepress/vitepress/components', 'examples'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      UnoCSS(),
    ],
  }
})
