import parser from 'cron-parser'
import { ElNotification } from 'element-plus'

export function generateSchedule(title: string, description: string, cron: string, callback: string | Function, status = false, callback_type: CallbackType = 'custom') {
  if (callback_type === 'notification') {
    callback = () => {
      ElNotification({
        title,
        message: description,
      })
    }
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
    schedule.timer = setTimeout(() => {
      try {
        // eslint-disable-next-line no-eval
        typeof schedule.callback === 'string' ? eval(schedule.callback) : schedule.callback(schedule)
      }
      catch (error: any) {
        console.error(error)
      }
      done(schedule)
    }, new Date(schedule.interval.next().value).getTime() - Date.now())
  }
}
export function stopSchedule(schedule: Schedule) {
  schedule.status = false
  clearTimeout(schedule.timer)
}
