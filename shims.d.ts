declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
type WindowMap = Map<string, BrowserWindow>
interface Window {
  OS_API: OS_API;
}

type CallbackType = 'custom' | 'notification'

declare interface Schedule {
  id: number
  title: string
  description: string
  cron: string
  callback_type: CallbackType
  callback: string | Function
  interval: any
  status: boolean
  timer: any
}
