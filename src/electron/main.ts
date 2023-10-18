import path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow } from 'electron'

export function createWindow(config?: BrowserWindowConstructorOptions) {
  const win = new BrowserWindow({
    width: config?.width ?? 1440,
    height: config?.height ?? 1200,
    icon: path.join(__dirname, '256x256.png'),
    ...config,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, './preload.js'),
    },
  })
  win.menuBarVisible = false
  return win
}
