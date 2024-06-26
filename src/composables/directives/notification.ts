const directive: DirectiveFType = {
  key: 'notification',
  name: '发送通知',
  args: {
    message: '',
  },
  support: ['web', 'electron'],
  execute: (schedule: Schedule, data?: any) => {
    data.args = Object.assign({
      title: schedule.title,
      message: schedule.description,
    }, data.args)

    if (data.pre_res.data)
      data.args.message = `${data.pre_res.data}`
    scheduleNotification(data.args.title, data.args.message)

    return {
      data: null,
    }
  },
}

export default directive
