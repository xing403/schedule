import fs from 'node:fs'
import path from 'node:path'
import type { BrowserWindow } from 'electron'
import { Notification, app, ipcMain, shell } from 'electron'
import { logs } from './utils'
import { createMainWindow, windowMap } from '.'

export function createIPC() {
  ipcMain.handle('notification', (_event, title: string, body: string) => {
    new Notification({
      title,
      body,
      icon: path.relative(process.cwd(), path.join('dist/256x256.ico')),
    }).show()
  })

  ipcMain.handle('read-schedule', () => {
    if (fs.existsSync(path.join(app.getPath('userData'), 'schedule.json')))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'schedule.json'), 'utf-8'))
    return { schedules: '[]' }
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

  ipcMain.handle('read-setting', () => {
    if (fs.existsSync(path.join(app.getPath('userData'), 'setting.json')))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))
    return undefined
  })

  ipcMain.handle('save-setting', (_event, setting: string) => {
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), 'setting.json'), 'w'), setting)
    return true
  })

  ipcMain.handle('command', (_event, command: string, argv?: any) => {
    if (command === 'openMainWindow') {
      if (windowMap.get('main'))
        windowMap.get('main')?.show()
      else
        createMainWindow(windowMap)
    }
    else if (command === 'moveSuspended') {
      if (windowMap.get('suspended')) {
        const sus = windowMap.get('suspended') as BrowserWindow
        const [x, y] = sus.getPosition()
        sus.setPosition(x + argv.x, y + argv.y)
      }
    }
  })

  ipcMain.handle('logs', (_event, context: string, level?: string) => {
    logs(context, level)
  })

  ipcMain.handle('save-service', (_event, service_name: string, argv?: any) => {
    fs.writeFileSync(
      fs.openSync(path.join(app.getPath('userData'), `${service_name}.json`), 'w'),
      JSON.stringify({ schedules: argv }, null, 4))
    return true
  })
  ipcMain.handle('read-service', (_event, service_name: string) => {
    if (fs.existsSync(path.join(app.getPath('userData'), `${service_name}.json`)))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), `${service_name}.json`), 'utf-8'))
    return undefined
  })
}
