// Electron entry file
import path from 'node:path'
import { app } from 'electron'
import {
  createIPC,
  createMainWindow,
  createTray,
} from './electron'

const windowMap: WindowMap = new Map()

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

app.whenReady().then(() => {
  createMainWindow(windowMap)
  createIPC()
  createTray(windowMap)
})

app.on('window-all-closed', () => {})
