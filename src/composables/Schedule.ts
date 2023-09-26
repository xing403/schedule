import parser from 'cron-parser'
import { ElMessage, ElNotification, dayjs } from 'element-plus'
import { patform } from '.'

export function generateSchedule(title: string, description: string, cron: string, callback: string | Function, status = false, callback_type: CallbackType = 'custom') {
  if (callback_type === 'notification') {
    callback = patform.value === 'electron'
      ? () => window.OS_API.notification(title, description)
      : () => ElNotification({ title, message: description })
  }

  const schedule = {
    id: new Date().getTime(),
    title,
    description,
    cron,
    callback,
    callback_type,
    interval: parser.parseExpression(cron, {
      iterator: true,
    }),
    status,
    next: '-',
    timer: null,
  }

  if (status)
    startSchedule(schedule)

  return schedule
}
export function startSchedule(schedule: Schedule) {
  schedule.status = true
  done(schedule)
}
export function done(schedule: Schedule) {
  if (schedule.status && schedule.interval.hasNext()) {
    const date = schedule.interval.next().value
    schedule.next = dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    schedule.timer = setTimeout(() => {
      try {
        // eslint-disable-next-line no-eval
        typeof schedule.callback === 'string' ? eval(schedule.callback) : schedule.callback(schedule)
      }
      catch (error: any) {
        console.error(error)
        ElMessage.error(`${schedule.id} 的执行内容好像出现了点问题`)
      }
      done(schedule)
    }, new Date(date).getTime() - Date.now())
  }
}
export function stopSchedule(schedule: Schedule) {
  schedule.status = false
  clearTimeout(schedule.timer)
  schedule.next = '-'
}
