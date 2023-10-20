// Electron entry file
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import {
  createIPC,
  createMainWindow,
  createSuspendedWindow,
  createTray,
  windowMap,
} from './electron'

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

const settings = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))

app.whenReady().then(() => {
  createMainWindow(windowMap)
  createIPC()
  createTray(windowMap)

  if (settings?.baseSetting?.suspended_window)
    createSuspendedWindow(windowMap)
})

app.on('window-all-closed', () => {})
