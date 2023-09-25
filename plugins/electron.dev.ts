/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// Electron development environment
import type { AddressInfo } from 'node:net'
import type { ChildProcessWithoutNullStreams } from 'node:child_process'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import type { Plugin } from 'vite'

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
let electronProcess: ChildProcessWithoutNullStreams
function startProcess(IP: string) {
  // bug 若为构建: require('electron') 改为 require.resolve("electron")
  electronProcess = spawn(require('electron'), [
    'dist/background.js',
    IP,
  ])
}
export default function ElectionDevPlugin(): Plugin {
  return {
    name: 'electron-dev-plugin',
    configureServer(server) {
      buildBackground()

      server.httpServer?.once('listening', () => {
        // get vite server information
        const address = server.httpServer?.address() as AddressInfo
        const IP = `http://localhost:${address.port}`
        startProcess(IP)
        fs.watchFile('plugins/electron/background.ts', () => {
          // build electron background from ts to js
          electronProcess.kill()
          buildBackground()
          startProcess(IP)
        })
      })
    },
  }
}
