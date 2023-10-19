import { ElMessage, ElNotification, dayjs } from 'element-plus'

export function generateSchedule(title: string, description: string, cron: string, callback: string | Function, status = false, callback_type: CallbackType = 'system-notification', id?: number) {
  const schedule = {
    id: id ?? new Date().getTime(),
    title,
    description,
    cron,
    callback,
    callback_type,
    interval: parseExpression(cron, {
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
  run(schedule)
}
export function done(schedule: Schedule) {
  if (schedule.callback_type === 'system-notification') {
    patform.value === 'electron'
      ? window.OS_API.notification(schedule.title, schedule.description)
      : ElNotification({ title: schedule.title, message: schedule.description })
  }
  else if (schedule.callback_type === 'custom-content') {
    // eslint-disable-next-line no-eval
    eval(schedule.callback as string)
  }
  else if (schedule.callback_type === 'custom-notification') {
    // eslint-disable-next-line no-eval
    const callbackResult = eval(schedule.callback as string) ?? '--'
    patform.value === 'electron'
      ? window.OS_API.notification(schedule.title, callbackResult)
      : ElNotification({ title: schedule.title, message: `${callbackResult}` })
  }
}
export function run(schedule: Schedule) {
  if (schedule.status && schedule.interval.hasNext()) {
    const date = schedule.interval.next().value
    schedule.next = dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    schedule.timer = setTimeout(() => {
      try {
        done(schedule)
      }
      catch (error: any) {
        console.error(error)
        ElMessage.error(`${schedule.id} 的执行内容好像出现了点问题`)
      }
      run(schedule)
    }, new Date(date).getTime() - Date.now())
  }
}
export function stopSchedule(schedule: Schedule) {
  schedule.status = false
  clearTimeout(schedule.timer)
  schedule.next = '-'
}
