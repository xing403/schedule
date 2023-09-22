declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Schedule {
  id: number
  title: string
  description: string
  cron: string
  callback: string | Function
  interval: any
  status: boolean
  timer: any
}
