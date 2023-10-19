import path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow } from 'electron'
import { createGlobalShortcut, removeGlobalShortcut } from './globalShortcut'

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
export function createMainWindow(windowMap: WindowMap) {
  const mainWindow = createWindow()
  windowMap.set('main', mainWindow)
  createGlobalShortcut(mainWindow)
  process.argv[2] ? mainWindow.loadURL(process.argv[2]) : mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    removeGlobalShortcut()
    windowMap.delete('main')
  })
  return mainWindow
}
