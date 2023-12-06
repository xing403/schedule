import path from 'node:path'
import type { BrowserWindowConstructorOptions } from 'electron'
import { BrowserWindow, screen } from 'electron'
import { createGlobalShortcut, removeGlobalShortcut } from '.'

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
  win.webContents.openDevTools()
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

export function createSuspendedWindow(windowMap: WindowMap) {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  const suspendedWindow = createWindow({
    x: width - 150,
    y: height * 0.3,
    width: 50,
    height: 50,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    fullscreenable: false,
    skipTaskbar: true,
  })

  windowMap.set('suspended', suspendedWindow)

  const suspendedPath = process.argv[2]
    ? `${process.argv[2]}/#/suspended`
  // eslint-disable-next-line n/no-path-concat
    : `file://${__dirname}/index.html#/suspended`
  suspendedWindow.loadURL(suspendedPath)
}
