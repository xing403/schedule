// mqtt service
export const MQTT = ref({
  host: '127.0.0.1',
  username: '',
  password: '',
  port: 8083,
})

watchDeep(MQTT, (newVal, oldVal) => {
  if (platform.value === 'electron')
    window.Electron.saveService('mqtt', JSON.stringify(newVal))
  else if (platform.value === 'web')
    localStorage.setItem('mqtt-service', JSON.stringify(newVal))
})
