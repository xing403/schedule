// Electron entry file
import path from 'node:path'
import { BrowserWindow, Notification, app, globalShortcut, ipcMain } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'

function createWindow(config?: BrowserWindowConstructorOptions) {
  const win = new BrowserWindow({
    width: config?.width ?? 1440,
    height: config?.height ?? 1200,
    ...config,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, './preload.js'),
    },
  })
  win.menuBarVisible = false
  return win
}

app.whenReady().then(() => {
  const mainWindow = createWindow()
  process.argv[2] ? mainWindow.loadURL(process.argv[2]) : mainWindow.loadFile('index.html')
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.isDevToolsOpened()
      ? mainWindow.webContents.closeDevTools()
      : mainWindow.webContents.openDevTools()
  })
  ipcMain.handle('notification', (_event, title: string, body: string) => {
    new Notification({
      title,
      body,
    }).show()
  })
})
