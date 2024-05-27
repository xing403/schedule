import type { BrowserWindow } from 'electron'
import log from 'electron-log/main'
import md5 from 'md5'

export function openDevTools(window: BrowserWindow) {
  window.webContents.isDevToolsOpened()
    ? window.webContents.closeDevTools()
    : window.webContents.openDevTools()
}
export function useLogs() {
  // Optional, initialize the logger for any renderer process
  log.initialize({ preload: true })
  const date = new Date()
  log.transports.file.fileName = `${md5(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)}.log`
}

export function logs(context: string, level?: string) {
  switch (level) {
    case 'error':
      log.error(context)
      break
    case 'warn':
      log.warn(context)
      break
    case 'info':
    default:
      log.info(context)
  }
}
