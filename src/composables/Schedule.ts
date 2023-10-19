import { ElMessage, ElNotification, dayjs } from 'element-plus'

export function generateSchedule(title: string, description: string, cron: string, callback: string, status = false, callback_type: CallbackType = 'notification', id?: number) {
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
  if (schedule.callback_type === 'notification') {
    platform.value === 'electron'
      ? window.Electron.notification(
        schedule.title,
        schedule.callback === '' ? schedule.description : schedule.callback,
      )
      : ElNotification({
        title: schedule.title,
        message: schedule.callback === '' ? schedule.description : schedule.callback,
      })
  }
  else if (schedule.callback_type === 'script') {
    // eslint-disable-next-line no-eval
    eval(schedule.callback as string)
  }
  else if (schedule.callback_type === 'open-external') {
    if (platform.value === 'electron')
      window.Electron.openExternal(schedule.callback)
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
