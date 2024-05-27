import useMQTTStore from '~/store/mqtt'

//
const directive: DirectiveFType = {
  key: 'mqtt',
  name: 'MQTT消息',
  args: {
    topics: [],
    message: '',
  },
  support: ['web', 'electron'],
  execute: (schedule: Schedule, data: any) => {
    const mqttStore = useMQTTStore()
    const { args, pre_res } = data

    const message = pre_res.data ? pre_res.data : args.message ?? schedule.title
    if (!message)
      throw new Error('未填写消息')
    const topics = args.topics.map((topic: string) => topic.trim()).filter((topic: string) => topic !== '')
    mqttStore.publish(topics, message)

    return {
      data: null,
    }
  },
  init: (schedule: Schedule, data?: any) => {
    const mqttStore = useMQTTStore()
    if (!mqttStore.client?.connected)
      throw new Error('MQTT未连接')
    if (!data.args.topics || data.args.topics.length === 0)
      throw new Error('未填写 topic 信息')
    mqttStore.subscribe(data.args.topics)
  },
}

export default directive
