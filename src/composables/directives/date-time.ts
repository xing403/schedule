import { dayjs } from 'element-plus'

const directive: DirectiveFType = {
  key: 'date-time',
  execute: (schedule: Schedule, data: any) => {
    data.args = Object.assign({
      format: 'YYYY-MM-DD HH:mm:ss',
    }, data.args)

    return {
      data: dayjs(dayjs(data.pre_res.data).isValid() ? data.pre_res.data : undefined).format(data.args.format),
    }
  },
}

export default directive
