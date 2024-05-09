// Electron entry file
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import {
  createFloatBallWindow,
  createMainWindow,
  logs,
  useIpc,
  useLogs,
  useTray,
  windowMap,
} from './electron'

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

let settings: any = {
  baseSetting: {
    floatBall: true,
  },
}

if (fs.existsSync(path.join(app.getPath('userData'), 'settings.json')))
  settings = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))
else
  fs.writeFileSync(path.join(app.getPath('userData'), 'settings.json'), JSON.stringify(settings))

app.whenReady().then(() => {
  createMainWindow(windowMap)

  useIpc()
  useTray(windowMap)
  useLogs()

  if (settings.baseSetting.floatBall)
    createFloatBallWindow(windowMap)
})

app.on('window-all-closed', () => { })
app.on('quit', () => {
  logs('app closed', 'info')
})
