import Components from 'unplugin-vue-components/vite'

// https://github.com/antfu/vite-plugin-components
export default function createComponents() {
  return Components({
    dts: 'src/types/components.d.ts',
    dirs: [
      'src/components',
    ],
  })
}
