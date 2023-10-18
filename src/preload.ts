import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('OS_API', {
  notification: (title: string, body: string) => ipcRenderer.invoke('notification', title, body),
  readSchedule: () => ipcRenderer.invoke('read-schedule'),
  saveSchedule: (schedule: string) => ipcRenderer.invoke('save-schedule', schedule),
})
