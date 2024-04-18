import AutoImport from 'unplugin-auto-import/vite'

// https://github.com/antfu/unplugin-auto-import
export default function () {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
    dts: 'src/types/auto-imports.d.ts',
    dirs: [
      './src/composables',
    ],
    vueTemplate: true,
  })
}
