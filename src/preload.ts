import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('OS_API', {
  notification: (title: string, body: string) => ipcRenderer.invoke('notification', title, body),
})
