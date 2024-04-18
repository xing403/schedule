import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'

export default function createVueMacros() {
  return VueMacros({
    defineOptions: false,
    defineModels: false,
    plugins: {
      vue: Vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),
    },
  })
}
