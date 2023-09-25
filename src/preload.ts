import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('OS_API', {
  notification: (title: string, body: string) => ipcRenderer.invoke('notification', title, body),
  changeRoute: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('change-route', callback),
})
