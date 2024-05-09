/* eslint-disable n/no-path-concat */
/* eslint-disable n/prefer-global/process */
import path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, screen } from 'electron'
import { useShortcut } from '.'

export function createWindow(config?: BrowserWindowConstructorOptions) {
  const win = new BrowserWindow({
    width: config?.width ?? 1920,
    height: config?.height ?? 1080,
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
  const shortcut = useShortcut(mainWindow)

  process.argv[2] ? mainWindow.loadURL(process.argv[2]) : mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    shortcut.unregisterShortcut()
    windowMap.delete('main')
  })
  return mainWindow
}

export function createFloatBallWindow(windowMap: WindowMap) {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width } = primaryDisplay.workAreaSize
  const floatBallWindow = createWindow({
    x: width - 100,
    y: 240,
    width: 50,
    height: 50,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    fullscreenable: false,
    skipTaskbar: true,
  })

  windowMap.set('float-ball', floatBallWindow)
  const suspendedPath = process.argv[2] ? `${process.argv[2]}/#/float-ball` : `file://${__dirname}/index.html#/float-ball`
  floatBallWindow.loadURL(suspendedPath)
}
