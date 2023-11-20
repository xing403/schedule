declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
type WindowMap = Map<string, BrowserWindow>
interface Window {
  Electron: Electron;
}
type STATUS_TYPE = 'success' | 'error' | 'ready' | 'notFound' | 'stop'
type CallbackType = 'script' | 'notification' | 'open-external' | 'directive'
type DirectiveKeyType = 'date-time' | string
interface DirectiveType {
  /**
   * directive key
   */
  key: DirectiveKeyType,
  /**
   * this directive run need args
   */
  args?: any,
  /**
   * pre directive run result, format => {data: any}
   */
  pre_res?: any
}

interface DirectiveFType extends DirectiveType {
  /**
   * the directive run function
   */
  execute: (schedule: Schedule, data: any) => { data: any } | Promise,
  /**
   * directive status
   */
  status?: STATUS_TYPE
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
  /**
   * this　schedule　run callback type
   */
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
