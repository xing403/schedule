import type { IClientOptions, MqttClient } from 'mqtt'
import mqtt from 'mqtt'
import { ElMessage } from 'element-plus'

interface MqttMessageType {
  topic: string // 消息的主题
  message: any // 消息内容
}

const useMQTTStore = defineStore('mqtt', () => {
  const subscribe_topics = ref<string[]>([])
  const client = ref<MqttClient | null>(null)

  const client_id = ref<string>('')
  const messages = ref<MqttMessageType[]>([])
  // 连接配置
  const options: IClientOptions = {
    clientId: '',
    hostname: MQTT.value.host,
    password: MQTT.value.password,
    username: MQTT.value.username,
    protocol: 'ws',
    protocolVersion: 4,
    port: MQTT.value.port,
    path: '/mqtt',
    keepalive: 60,
    reconnectPeriod: 5,
  }
  // connect mqtt service
  async function connect(id: string, host: string, username: string, password: string, port: number) {
    return new Promise<boolean>((resolve, reject) => {
      if (client.value && (client.value.connected || client.value.reconnecting))
        reject(new Error('MQTT服务已连接'))

      client_id.value = id
      options.hostname = host
      options.username = username
      options.password = password
      mqtt.connectAsync(options).then((mc: MqttClient) => {
        client.value = mc
        client.value.on('message', (topic: string, message: any) => {
          const decoder = new TextDecoder()
          message = decoder.decode(message)
          messages.value.push({ topic, message })
        })
        resolve(client.value.connected)
      }).catch((error) => {
        ElMessage.error(`连接MQTT服务失败 ${error}`)
        reject(error)
      })
    })
  }
  // subscribe topic
  function subscribe(topics: string[] | string) {
    if (typeof topics === 'string') {
      if (subscribe_topics.value.includes(topics))
        return
    }

    else if (Array.isArray(topics)) {
      topics = topics.filter((topic: string) => !subscribe_topics.value.includes(topic))
      if (topics.length === 0)
        return
      subscribe_topics.value.push(...topics)
    }

    if (client.value?.connected) {
      client.value?.subscribe(topics)
      if (typeof topics === 'string')
        subscribe_topics.value.push(topics)
      else
        subscribe_topics.value.push(...topics)
    }
  }
  function unsubscribe(topics: string[] | string) {
    if (typeof topics === 'string' && subscribe_topics.value.includes(topics)) {
      subscribe_topics.value = subscribe_topics.value.filter((topic: string) => topic !== topics)
      client.value?.unsubscribe(topics)
    }

    else if (Array.isArray(topics)) {
      topics = topics.filter((topic: string) => subscribe_topics.value.includes(topic))
      subscribe_topics.value = subscribe_topics.value.filter((topic: string) => !topics.includes(topic))
      topics.forEach((topic: string) => client.value?.unsubscribe(topic))
    }
  }
  // publish
  function publish(topics: string | string[], message: string) {
    if (client.value) {
      if (typeof topics === 'string')
        client.value.publish(topics, message)
      else
        topics.forEach((topic: string) => client.value?.publish(topic, JSON.stringify(message)))
    }
  }
  // disconnect
  function disconnect() {
    if (!client.value)
      return false

    if (client.value.disconnected || client.value.disconnecting)
      return false

    client.value = client.value.end()
    return true
  }

  return {
    client,
    messages,

    connect,
    disconnect,

    subscribe,
    unsubscribe,

    publish,
  }
})
export default useMQTTStore
