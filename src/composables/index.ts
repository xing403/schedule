import md5 from 'md5'
import useMQTTStore from '~/store/mqtt'

export * from './core'
export * from './application'
export * from './dictionaries'
export * from './variable'
export * from './Schedule'
export * from './utils'
export * from './directives'
export * from './services'

export async function initApp() {
  logs('app runing')
  const mqttStore = useMQTTStore()

  getAppService('mqtt').then(async () => {
    if (MQTT.value.auto) {
      mqttStore.connect(md5(Date()), MQTT.value.host, MQTT.value.username, MQTT.value.password, MQTT.value.port).then(() => {
        logs('started mqtt service')
      }).catch(() => {
        logs('failed to start mqtt service')
      })
    }
  })

  initRootSchedule()
  getGlobDirectives().then(() => {
    readHistorySchedules()
  })
}
async function getAppService(name: string) {
  if (platform.value === 'electron') {
    MQTT.value = await window.Electron.readService(name).then((res: any) => {
      return JSON.parse(res.service)
    })
  }

  else if (platform.value === 'web') {
    MQTT.value = useLocalStorage(`${name}-service`, { host: '127.0.0.1', port: 8083, username: '', password: '', auto: false }).value
  }
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

async function initRootSchedule() {
  rootSchedule.value = generateSchedule({ id: 0, title: 'Root', description: '', cron: '0 20 * * * *', directives: [], interval: null, status: true, next: '-', timer: null })
  logs('Root Schedule init')
  queues.value = []
  runRootSchedule()
}

function runRootSchedule() {
  if (!rootSchedule.value || !rootSchedule.value.status)
    return

  if (rootSchedule.value) {
    rootSchedule.value.timer = setTimeout(() => {
      try {
        for (const schedule of queues.value) {
          if (schedule.next && new Date(schedule.next).getTime() - Date.now() < 60 * 60 * 1000) {
            logs(`schedule ${schedule.title} is in queue`)
            runSchedule(schedule)
            queues.value.splice(queues.value.indexOf(schedule), 1)
          }
        }
        runRootSchedule()
      }
      catch (error: any) {
        console.error(error)
        logs('run root schedule error', 'error')
      }
    }, new Date(rootSchedule.value.next).getTime() - Date.now())
  }
}
