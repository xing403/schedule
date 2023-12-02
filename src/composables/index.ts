import { getGlobDirectives } from './directives'

export * from './core'
export * from './application'
export * from './dictionaries'
export * from './variable'
export * from './Schedule'
export * from './utils'
export * from './HINTS'
export * from './directives'
export * from './services'

export function initApp() {
  readHistorySchedules()
  getGlobDirectives()
  getAppService('mqtt')
}
async function getAppService(name: string) {
  if (platform.value === 'electron')
    MQTT.value = await window.Electron.readService(name)

  else if (platform.value === 'web')
    MQTT.value = useLocalStorage(`${name}-service`, { host: '127.0.0.1', port: 8083, username: '', password: '' }).value
}

async function readHistorySchedules() {
  let history_schedules
  const initSchedules: Schedule[] = []
  if (platform.value === 'electron') {
    history_schedules = await window.Electron.readSchedule().then((res: any) => {
      return JSON.parse(res.schedules) as Schedule[]
    })
  }
  else if (platform.value === 'web') {
    history_schedules = useLocalStorage('schedule', []).value
  }
  for (const schedule of history_schedules)
    initSchedules.push(generateSchedule(schedule))

  schedules.value = initSchedules
}
