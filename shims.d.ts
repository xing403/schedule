declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
type WindowMap = Map<string, BrowserWindow>
interface Window {
  Electron: Electron;
}
type STATUS_TYPE = 'success' | 'error' | 'ready' | 'notFound' | 'stop' | 'running'

interface DirectiveType {
  /**
   * directive key
   */
  key: string,
  /**
   * user defined alias
   */
  alias?: string,
  /**
   * this directive run need args
   */
  args?: any,
  /**
   * pre directive run result, format => {data: any}
   */
  pre_res?: any,
  /**
   * directive status
   */
  status?: STATUS_TYPE,
}

interface DirectiveFType extends DirectiveType {
  /**
   * directive execute function
   */
  execute: (schedule: Schedule, data?: any) => void
  /**
   * directive init function
   */
  init?: (schedule: Schedule, data?: any) => void
  /**
   * directive destroy function
   */
  destroy?: (schedule: Schedule, data?: any) => void
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
   * The schedule run interval
   */
  interval: any
  /**
   * The schedule run status
   * @default false
   */
  status: boolean
  /**
   * schedule next run time
   */
  next: string
  /**
   * schedule next run setOutTime timer
   */
  timer: any,
  /**
   * schedule directives
   */
  directives: DirectiveType[]
}

declare interface MenuItem {
  name: string
  path: string
  redirect?: string
  children: (MenuItem | RouteRecordRaw)[]
  meta?: any
}
