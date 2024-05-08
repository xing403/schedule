/* eslint-disable n/prefer-global/process */
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
  const { width } = primaryDisplay.workAreaSize
  const suspendedWindow = createWindow({
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

  windowMap.set('suspended', suspendedWindow)
  const suspendedPath = process.argv[2] ? `${process.argv[2]}/#/suspended` : path.join('file://', __dirname, 'index.html#/float-ball')
  suspendedWindow.loadURL(suspendedPath)
}
