import { ElMessage, dayjs } from 'element-plus'

import DIRECTIVE_MAP from './directives'

export function generateSchedule(s: Schedule) {
  const schedule = { ...s }
  schedule.interval = null

  schedule.directives.forEach((directive, index) => {
    const d = DIRECTIVE_MAP.find(item => item.key === directive.key)
    if (d)
      directive.status = d.status ?? 'success'
    else
      directive.status = 'notFound'
  })

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
  run(schedule)
}

export function done(schedule: Schedule) {
  schedule.directives.reduce((pre_res: any, directive: DirectiveType) => {
    logs(`run directive ${directive.key}, pre_res: ${JSON.stringify(pre_res)}`, 'info')

    if (directive.status === 'notFound') {
      logs(`directive ${directive.key} not found`, 'error')
      throw new Error(`directive ${directive.key} not found`)
    }

    return DIRECTIVE_MAP.find(item => item.key === directive.key)?.execute(schedule, { args: directive.args, pre_res })
  }, {})
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
