/* eslint-disable no-console */
import { ElNotification } from 'element-plus'

export function scheduleNotification(title: string, message?: string) {
  platform.value === 'electron'
    ? window.Electron.notification(title, message)
    : ElNotification({ title, message })
}
export function openExternal(url: string) {
  if (platform.value === 'electron')
    window.Electron.openExternal(url)
  else
    window.open(url, '_blank')
}
export function logs(context: string, level?: string) {
  if (platform.value === 'electron')
    window.Electron.logs(context, level)
  if (import.meta.env.DEV)
    console.info(`[${level ?? 'info'}]`, context)
}
export function scheduleFormatOutput(schedule: Schedule) {
  return `{id: \'${schedule.id}\', cron: \'${schedule.cron}\', `
    + `directive: ${JSON.stringify(schedule.directives)}`
}
