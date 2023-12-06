import { ElMessage, dayjs } from 'element-plus'

import DIRECTIVE_MAP from './directives'

export function generateSchedule(s: Schedule) {
  const schedule = { ...s }
  schedule.interval = null

  schedule.directives.reduce((status: boolean, directive: DirectiveType) => {
    const d = DIRECTIVE_MAP.find(item => item.key === directive.key)

    if (d) {
      directive.status = d.status ?? 'success'
      if (typeof d.init === 'function')
        d.init(schedule, { args: directive.args })
    }

    else { directive.status = 'notFound' }

    return status && directive.status === 'success'
  }, true)

  if (schedule.status)
    startSchedule(schedule)

  return schedule
}

export function startSchedule(schedule: Schedule) {
  schedule.status = true
  schedule.interval = parseExpression(schedule.cron, {
    iterator: true,
  })
  logs(`running schedule id:${schedule.id}, cron: ${schedule.cron}`, 'info')
  runSchedule(schedule)
}

function done(schedule: Schedule) {
  schedule.directives.reduce((pre_res: any, directive: DirectiveType) => {
    logs(`run directive ${directive.key}, pre_res: ${JSON.stringify(pre_res)}`, 'info')

    if (directive.status === 'notFound') {
      logs(`directive ${directive.key} not found`, 'error')
      throw new Error(`directive ${directive.key} not found`)
    }

    return DIRECTIVE_MAP.find(item => item.key === directive.key)?.execute(schedule, { args: directive.args, pre_res })
  }, {})
}

export function runSchedule(schedule: Schedule) {
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
    const next_time = new Date(schedule.next).getTime() - Date.now()
    if (next_time > 60 * 60 * 1000) { // time is over 1h
      queues.value.push(schedule)
    }
    else {
      schedule.timer = setTimeout(() => {
        try {
          done(schedule)
          runSchedule(schedule)
        }
        catch (error: any) {
          console.error(error)
          logs(`${schedule.id} run error, ${error}`, 'error')
          stopSchedule(schedule)
          ElMessage.error(`错误:${schedule.id}, ${error}`)
        }
      }, new Date(schedule.next).getTime() - Date.now())
    }
  }
}
export function stopSchedule(schedule: Schedule) {
  schedule.status = false
  clearTimeout(schedule.timer)
  const s = queues.value.find((s: Schedule) => s.id === schedule.id)
  if (s)
    queues.value.splice(queues.value.indexOf(s), 1)

  if (schedule.interval)
    schedule.interval.endDate = new Date()

  schedule.next = '-'
  schedule.interval = null
  logs(`${schedule.id} is stopped`, 'info')
}
