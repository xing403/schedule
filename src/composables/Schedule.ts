import parser from 'cron-parser'

export function generateSchedule(title: string, description: string, cron: string, callback: string | Function) {
  const schedule = {
    id: new Date().getTime(),
    title,
    description,
    cron,
    callback,
    interval: parser.parseExpression(cron, {
      iterator: true,
    }),
    status: false,
    timer: null,
  }
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
