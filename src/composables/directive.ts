// this is presuppose function
import { dayjs } from 'element-plus'

export default [{
  key: 'date-time',
  execute: (args?: any) => {
    args = Object.assign({
      format: 'YYYY-MM-DD HH:mm:ss',
    }, args)

    return {
      data: dayjs().format(args.format),
    }
  },
}]
