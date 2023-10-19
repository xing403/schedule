import fs from 'node:fs'
import path from 'node:path'
import { Notification, app, ipcMain, shell } from 'electron'

export function createIPC() {
  ipcMain.handle('notification', (_event, title: string, body: string) => {
    new Notification({
      title,
      body,
      icon: path.relative(process.cwd(), path.join('dist/256x256.ico')),
    }).show()
  })

  ipcMain.handle('read-schedule', () => {
    return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'schedule.json'), 'utf-8'))
  })

  ipcMain.handle('save-schedule', (_event, list: string) => {
    fs.writeFileSync(
      fs.openSync(path.join(app.getPath('userData'), 'schedule.json'), 'w'),
      JSON.stringify({ schedules: list }, null, 4))
    return true
  })

  ipcMain.handle('open-external', (_event, url: string) => {
    shell.openExternal(url)
  })
}
