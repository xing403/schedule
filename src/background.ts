// Electron entry file
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import {
  createFloatBallWindow,
  createMainWindow,
  logs,
  unregisterShortcut,
  useIpc,
  useLogs,
  useTray,
  windowMap,
} from './electron'

app.setAppUserModelId('Schedule Notification')
app.setPath('userData', path.join(app.getPath('userData'), 'data'))

let setting: any = {
  baseSetting: {
    floatBall: true,
  },
}

if (fs.existsSync(path.join(app.getPath('userData'), 'setting.json')))
  setting = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))
else
  fs.writeFileSync(path.join(app.getPath('userData'), 'setting.json'), JSON.stringify(setting, null, 2))

app.whenReady().then(() => {
  const win = createMainWindow(windowMap)

  useIpc(win)
  useTray(windowMap, setting)
  useLogs()

  if (setting.baseSetting.floatBall)
    createFloatBallWindow(windowMap)
})

app.on('window-all-closed', () => { })
app.on('quit', () => {
  logs('app closed', 'info')
  unregisterShortcut()
})
