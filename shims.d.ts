declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
type WindowMap = Map<string, BrowserWindow>
interface Window {
  Electron: Electron;
}
type STATUS_TYPE = 'pending' | 'success' | 'error' | 'ready' | 'notFound'
type CallbackType = 'script' | 'notification' | 'open-external' | 'directive'
type DirectiveKeyType = 'date-time'
interface DirectiveType{
  key: DirectiveKeyType,
  args?: any,
}

interface DirectiveFType extends DirectiveType{
  execute: Function,
  status: STATUS_TYPE
}

declare interface Schedule {
  /**
   * Schedule Id: Based on creation time
   * @default 0
   */
  id: number
  title: string
  description: string
  /**
   * The string for performing period comparison
   */
  cron: string
  callback_type: CallbackType
  callback: string | Function
  interval: any
  status: boolean
  next: string
  timer: any,
  /**
   * default directive
   */
  directive: string
  directives: DirectiveFType[]
}

declare interface MenuItem {
  name: string
  path: string
  redirect?: string
  children: (MenuItem | RouteRecordRaw)[]
  meta?: any
}
