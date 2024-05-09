/* eslint-disable n/prefer-global/process */
import fs from 'node:fs'
import path from 'node:path'
import { Notification, app, ipcMain, shell } from 'electron'
import { createMainWindow, logs, windowMap } from '..'

export function useIpc() {
  ipcMain.handle('notification', (_event, title: string, body: string) => {
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

  ipcMain.handle('open-main-window', () => {
    const win = windowMap.get('main')
    win != null ? win.show() : createMainWindow(windowMap)
  })

  ipcMain.handle('move-float-ball', (_, argv: { x: number; y: number }) => {
    const win = windowMap.get('float-ball')
    if (win) {
      const [x, y] = win.getPosition()
      win.setPosition(x + argv.x, y + argv.y)
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
