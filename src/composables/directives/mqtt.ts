import useMQTTStore from '~/store/mqtt'

//
const directive: DirectiveFType = {
  key: 'mqtt',
  execute: (schedule: Schedule, data: any) => {
    const mqttStore = useMQTTStore()
    const { args, pre_res } = data

    if (!mqttStore.client?.connected)
      throw new Error('MQTT未连接')
    if (!args.topics)
      throw new Error('未填写 topic 信息')

    const message = pre_res.data ? pre_res.data : args.message ?? schedule.title
    if (!message)
      throw new Error('未填写消息')
    const topics = args.topics.split(',').filter((topic: string) => topic !== '').map((topic: string) => topic.trim())
    mqttStore.subscribe(topics)
    mqttStore.publish(topics, JSON.stringify({ message }))

    return {
      data: null,
    }
  },
}

export default directive
