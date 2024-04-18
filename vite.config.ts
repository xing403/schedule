/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './plugins'

export default async (config: { mode: string; command: string }) => {
  // eslint-disable-next-line n/prefer-global/process
  const env = loadEnv(config.mode, process.cwd())
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: createVitePlugins(env, config.command === 'build'),
  })
}
