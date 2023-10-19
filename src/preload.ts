import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('Electron', {
  notification: (title: string, body: string) => ipcRenderer.invoke('notification', title, body),
  readSchedule: () => ipcRenderer.invoke('read-schedule'),
  saveSchedule: (schedule: string) => ipcRenderer.invoke('save-schedule', schedule),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
})
