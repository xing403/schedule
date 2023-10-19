import type { BrowserWindow } from 'electron'
import { globalShortcut } from 'electron'

export function createGlobalShortcut(window: BrowserWindow) {
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    window.webContents.isDevToolsOpened()
      ? window.webContents.closeDevTools()
      : window.webContents.openDevTools()
  })
}
export function removeGlobalShortcut() {
  globalShortcut.unregister('CommandOrControl+Shift+I')
}
