import { ElNotification } from 'element-plus'

const directive: DirectiveFType = {
  key: 'notification',
  execute: (schedule: Schedule, data?: any) => {
    data.args = Object.assign({
      title: schedule.title,
      message: schedule.description,
    }, data.args)

    if (data.pre_res.data)
      data.args.message = `${data.pre_res.data}`

    return {
      data: platform.value === 'electron'
        ? window.Electron.notification(data.args.title, data.args.message)
        : ElNotification({ title: data.args.title, message: data.args.message }),
    }
  },
}

export default directive
