import { ElMessage, dayjs } from 'element-plus'

export function generateSchedule(schedule: Schedule) {
  schedule = Object.assign({
    status: false,
    callback_type: 'notification',
  }, schedule)

  schedule.interval = null

  if (schedule.status)
    startSchedule(schedule)

  if (schedule.callback_type === 'directive') {
    schedule.directives = schedule.directive.split('---').map((directive: string) => {
      return parseYAMLString(directive) as DirectiveFType
    })
  }
  return schedule
}
export function startSchedule(schedule: Schedule) {
  schedule.status = true
  schedule.interval = parseExpression(schedule.cron, {
    iterator: true,
  })
  logs(`running schedule id:${schedule.id}, cron: ${schedule.cron}`, 'info')
  run(schedule)
}

export function done(schedule: Schedule) {
  if (schedule.callback_type === 'notification') {
    scheduleNotification(schedule.title, schedule.callback === '' ? schedule.description : schedule.callback as string)
  }
  else if (schedule.callback_type === 'script') {
    if (typeof schedule.callback === 'function') {
      schedule.callback()
    }
    else if (typeof schedule.callback === 'string') {
      // eslint-disable-next-line no-new-func
      schedule.callback = new Function(schedule.callback)
      schedule.callback()
    }
  }
  else if (schedule.callback_type === 'open-external') {
    if (platform.value === 'electron')
      window.Electron.openExternal(schedule.callback)
  }
  else if (schedule.callback_type === 'directive') {
    schedule.directives.forEach((directive: DirectiveFType) => {
      if (directive.status === 'notFound')
        return

      const res = directive.execute(directive.args)
      if (res)
        scheduleNotification(schedule.title, res.data)
    })
  }
}

export function run(schedule: Schedule) {
  if (schedule.status) {
    while (schedule.next === '-' || new Date(schedule.next).getTime() - Date.now() < 0) {
      if (!schedule.interval?.hasNext()) {
        stopSchedule(schedule)
        logs(`${schedule.id} run finished, not has next`, 'warning')
        ElMessage.success('任务运行结束')
        return
      }
      schedule.next = dayjs(schedule.interval.next().value).format('YYYY-MM-DD HH:mm:ss')
    }

    schedule.timer = setTimeout(() => {
      try {
        done(schedule)
      }
      catch (error: any) {
        console.error(error)
        logs(`${schedule.id} run error, ${error}`, 'error')
        stopSchedule(schedule)
        ElMessage.error(`${schedule.id} 的执行内容好像出现了点问题`)
      }
      run(schedule)
    }, new Date(schedule.next).getTime() - Date.now())
  }
}
export function stopSchedule(schedule: Schedule) {
  schedule.status = false
  clearTimeout(schedule.timer)
  schedule.next = '-'
  schedule.interval = null
  logs(`${schedule.id} is stopped`, 'info')
}
