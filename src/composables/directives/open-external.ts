const directive: DirectiveFType = {
  key: 'open-external',
  execute: (schedule: Schedule, data?: any) => {
    const url = data.pre_res.data ?? data.args.url as string
    if (/^(https?|ftp):\/\/([\-A-Za-z0-9+&@#/%?=~_|!:,.;]+[\.])+([A-Za-z]{2,4}[0-9]{1,3}|[A-Za-z]{2,4}|[0-9]{1,3})$/.test(url)) {
      if (platform.value === 'electron')
        window.Electron.openExternal(url)
      else
        window.open(url, '_blank')
    }
    else {
      throw new Error('url格式错误')
    }
    return {
      data: true,
    }
  },
}

export default directive
