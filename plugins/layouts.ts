import Layouts from 'vite-plugin-vue-meta-layouts'

// https://github.com/dishait/vite-plugin-vue-meta-layouts
export default function createLayouts() {
  return Layouts({
    defaultLayout: 'index',
  })
}
