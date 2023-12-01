import { ElNotification } from 'element-plus'

export function scheduleNotification(title: string, message?: string) {
  platform.value === 'electron'
    ? window.Electron.notification(title, message)
    : ElNotification({ title, message })
}
export function logs(context: string, level?: string) {
  if (platform.value === 'electron')
    window.Electron.logs(context, level)
}
export function scheduleFormatOutput(schedule: Schedule) {
  return `{id: \'${schedule.id}\', `
    + `cron: \'${schedule.cron}\', `
    + `directive: \'${schedule.directives}\'`
}
