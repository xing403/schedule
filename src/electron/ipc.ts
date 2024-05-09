import fs from 'node:fs'
import path from 'node:path'
import type { BrowserWindow } from 'electron'
import { Notification, app, ipcMain, shell } from 'electron'
import { logs } from './utils'
import { createMainWindow, windowMap } from '.'

export function createIPC() {
  ipcMain.handle('notification', (_event, title: string, body: string) => {
    // eslint-disable-next-line n/prefer-global/process
    new Notification({ title, body, icon: path.relative(process.cwd(), path.join('dist/256x256.ico')) }).show()
  })

  ipcMain.handle('read-schedule', () => {
    if (fs.existsSync(path.join(app.getPath('userData'), 'schedule.json')))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'schedule.json'), 'utf-8'))
    logs('read-schedule', 'not foundschedule.json,is initializing...')
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), 'schedule.json'), 'w'), JSON.stringify({ schedules: [] }, null, 4))
    return { schedules: '[]' }
  })

  ipcMain.handle('save-schedule', (_event, list: string) => {
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), 'schedule.json'), 'w'), JSON.stringify({ schedules: list }, null, 4))
    return true
  })

  ipcMain.handle('open-external', (_event, url: string) => {
    shell.openExternal(url)
  })

  ipcMain.handle('read-setting', () => {
    if (fs.existsSync(path.join(app.getPath('userData'), 'setting.json')))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'setting.json'), 'utf-8'))
    logs('read-setting', 'not foundsetting.json,is initializing...')
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), 'setting.json'), 'w'), JSON.stringify({}, null, 4))
    return {}
  })

  ipcMain.handle('save-setting', (_event, setting: string) => {
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), 'setting.json'), 'w'), setting)
    return true
  })

  ipcMain.handle('command', (_event, command: string, argv?: any) => {
    let win: BrowserWindow | null = null
    switch (command) {
      case 'open-main-window':
        win = windowMap.get('main')
        if (win)
          win.show()
        else
          createMainWindow(windowMap)
        break
      case 'move-float-ball':
        win = windowMap.get('float-ball')
        if (win) {
          const [x, y] = win.getPosition()
          win.setPosition(x + argv.x, y + argv.y)
        }
        break
    }
  })

  ipcMain.handle('logs', (_event, context: string, level?: string) => {
    logs(context, level)
  })

  ipcMain.handle('save-service', (_event, service_name: string, argv?: any) => {
    fs.writeFileSync(
      fs.openSync(path.join(app.getPath('userData'), `${service_name}.json`), 'w'),
      JSON.stringify({ service: argv }, null, 4))
    return true
  })
  ipcMain.handle('read-service', (_event, service_name: string) => {
    if (fs.existsSync(path.join(app.getPath('userData'), `${service_name}.json`)))
      return JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), `${service_name}.json`), 'utf-8'))
    logs('read-service', `not found${service_name}.json,is initializing...`)
    fs.writeFileSync(fs.openSync(path.join(app.getPath('userData'), `${service_name}.json`), 'w'),
      JSON.stringify({ service: '{ "host": "127.0.0.1", "port": "8083", "username": "", "password": "" }' }, null, 4))
    return { service: '{ "host": "127.0.0.1", "port": "8083", "username": "", "password": "" }' }
  })
}
