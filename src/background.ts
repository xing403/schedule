// Electron entry file
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import {
  createIPC,
  createMainWindow,
  createSuspendedWindow,
  createTray,
  initLogs,
  logs,
  windowMap,
} from './electron'

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

let settings: any = {
  baseSetting: {
    suspended_window: true,
  },
}

if (fs.existsSync(path.join(app.getPath('userData'), 'settings.json')))
  settings = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))
else
  fs.writeFileSync(path.join(app.getPath('userData'), 'settings.json'), JSON.stringify(settings))

app.whenReady().then(() => {
  createMainWindow(windowMap)
  createIPC()
  createTray(windowMap)

  if (settings?.baseSetting?.suspended_window)
    createSuspendedWindow(windowMap)
  initLogs()
})

app.on('window-all-closed', () => {})
app.on('quit', () => {
  logs('app closed', 'info')
})
