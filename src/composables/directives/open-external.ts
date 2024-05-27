const directive: DirectiveFType = {
  key: 'open-external',
  name: '打开链接',
  args: {
    url: '',
  },
  support: ['web', 'electron'],
  execute: (schedule: Schedule, data?: any) => {
    const url = data.pre_res.data ?? data.args.url as string
    if (/^((https?:\/\/)?([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,})|((?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\.(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3})|(localhost)(:\d+)?/.test(url))
      openExternal(url)

    else
      throw new Error('url格式错误')

    return {
      data: true,
    }
  },
}

export default directive
