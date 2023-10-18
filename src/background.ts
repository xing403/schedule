// Electron entry file
import path from 'node:path'
import { app } from 'electron'
import {
  createGlobalShortcut,
  createIPC,
  createTray,
  createWindow,
} from './electron'

const windowMap: WindowMap = new Map()

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

app.whenReady().then(() => {
  const mainWindow = createWindow()
  windowMap.set('main', mainWindow)
  const tray = createTray(windowMap)
  createGlobalShortcut(mainWindow)
  process.argv[2] ? mainWindow.loadURL(process.argv[2]) : mainWindow.loadFile('index.html')

  createIPC()
  mainWindow.on('closed', () => {
    windowMap.delete('main')
  })

  tray.on('click', () => {
    mainWindow.isVisible()
      ? mainWindow.hide()
      : mainWindow.show()
  })
})
