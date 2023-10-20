import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('Electron', {
  notification: (title: string, body: string) => ipcRenderer.invoke('notification', title, body),
  readSchedule: () => ipcRenderer.invoke('read-schedule'),
  saveSchedule: (schedule: string) => ipcRenderer.invoke('save-schedule', schedule),

  readSettings: () => ipcRenderer.invoke('read-setting'),
  saveSettings: (setting: string) => ipcRenderer.invoke('save-setting', setting),

  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),

  command: (command: string, argv?: any) => ipcRenderer.invoke('command', command, argv),
})
