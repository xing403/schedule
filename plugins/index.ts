import type { PluginOption } from 'vite'

import createAutoImport from './auto-import'
import createComponents from './components'
import createElectronBuild from './electron.build'
import createElectronDev from './electron.dev'
import createLayouts from './layouts'
import createPages from './pages'
import createUnocss from './unocss'
import createSvgIcon from './svg-icon'
import createVueMacros from './vue-macros'
import createI18n from './I18n'

export default function createVitePlugins(_viteEnv: Record<string, string>, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = []
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createLayouts())
  vitePlugins.push(createPages())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createElectronBuild())
  vitePlugins.push(createElectronDev())
  vitePlugins.push(createVueMacros())
  vitePlugins.push(createI18n())
  return vitePlugins
}
