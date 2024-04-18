/* eslint-disable n/prefer-global/process */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// Electron production environment
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import * as ElectronBuilder from 'electron-builder'

function buildBackground() {
  // build electron background from ts to js
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    outfile: 'dist/background.js',
    bundle: true,
    platform: 'node',
    target: 'node16',
    external: ['electron'],
  })
  require('esbuild').buildSync({
    entryPoints: ['src/preload.ts'],
    outfile: 'dist/preload.js',
    bundle: true,
    platform: 'node',
    target: 'node16',
    external: ['electron'],
  })
}

export default function ElectronBuildPlugin(): Plugin {
  return {
    name: 'electron-build-plugin',
    closeBundle() { // wait vite build end
      buildBackground()
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeFileSync(fs.openSync('dist/package.json', 'w'), JSON.stringify(json, null, 4))
      fs.mkdirSync('dist/node_modules') // 阻止 electron-builder 下载垃圾文件
      ElectronBuilder.build({
        config: {
          appId: 'vip.ilstudy.schedule',
          productName: 'schedule',
          directories: {
            output: path.resolve(process.cwd(), 'release'),
            app: path.resolve(process.cwd(), 'dist'),
          },
          // 安装界面图标
          icon: path.relative(process.cwd(), 'dist/256x256.ico'),
          target: 'nsis',
          files: ['**/*'],
          asar: true,
          nsis: {
            oneClick: false,
            allowToChangeInstallationDirectory: true,
            installerHeaderIcon: path.relative(process.cwd(), 'dist/256x256.ico'),
            installerIcon: path.relative(process.cwd(), 'dist/256x256.ico'),
            uninstallerIcon: path.relative(process.cwd(), 'dist/256x256.ico'),
            shortcutName: 'schedule',
            artifactName: '${productName} ${version}.${ext}',
          },
        },
      })
    },
  }
}
