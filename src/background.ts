// Electron entry file
import { Notification, app, ipcMain } from 'electron'
import { createGlobalShortcut, createTray, createWindow } from './electron'

const windowMap: WindowMap = new Map()
app.whenReady().then(() => {
  const mainWindow = createWindow()
  windowMap.set('main', mainWindow)
  const tray = createTray(windowMap)
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
  tray.on('click', () => {
    mainWindow.isVisible()
      ? mainWindow.hide()
      : mainWindow.show()
  })
})
