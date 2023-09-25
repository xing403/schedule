// Electron entry file
import { Notification, app, ipcMain } from 'electron'
import tray from './electron/tray'
import { createWindow } from './electron/main'
import { createGlobalShortcut } from './electron/globalShortcut'

const windowMap: WindowMap = new Map()
app.whenReady().then(() => {
  const mainWindow = createWindow()
  windowMap.set('main', mainWindow)
  tray(windowMap)
  createGlobalShortcut(mainWindow)
  process.argv[2] ? mainWindow.loadURL(process.argv[2]) : mainWindow.loadFile('index.html')

  ipcMain.handle('notification', (_event, title: string, body: string) => {
    new Notification({
      title,
      body,
    }).show()
  })
  mainWindow.on('closed', () => {
    windowMap.delete('main')
  })
})
