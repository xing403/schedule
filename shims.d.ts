declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
type WindowMap = Map<string, BrowserWindow>
interface Window {
  Electron: Electron;
}
type CallbackType = 'script' | 'notification' | 'open-external'

declare interface Schedule {
  id: number
  title: string
  description: string
  cron: string
  callback_type: CallbackType
  callback: string
  interval: any
  status: boolean
  next: string
  timer: any
}
declare interface MenuItem {
  name: string
  path: string
  redirect?: string
  children: (MenuItem | RouteRecordRaw)[]
  meta?: any
}
