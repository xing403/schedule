import type { BrowserWindow } from 'electron'
import { globalShortcut } from 'electron'
import { openDevTools } from '../utils'

export function useShortcut(win: BrowserWindow) {
  registerShortcut(win)
  return {
    registerShortcut,
    unregisterShortcut,
  }
}

export function registerShortcut(win: BrowserWindow) {
  globalShortcut.register('CommandOrControl+Shift+I', () => openDevTools(win))
}
export function unregisterShortcut() {
  globalShortcut.unregister('CommandOrControl+Shift+I')
}
