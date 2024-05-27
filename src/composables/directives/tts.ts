import axios from 'axios'

const directive: DirectiveFType = {
  key: 'tts',
  name: '文本转语音',
  args: {
    text: '',
  },
  support: ['web', 'electron'],
  execute: async (schedule: Schedule, data: any) => {
    let text = data.pre_res.data ?? data.args.text ?? schedule.title

    if (data.args?.format && data.args.format.includes('$1'))
      text = data.args.format.replace('$1', text)

    const t2s = await getTTS(text)
    const audio = document.createElement('audio')
    audio.id = `tts-${schedule.id}`
    const source = document.createElement('source')
    source.src = t2s?.tts
    source.type = 'audio/mpeg'
    audio.autoplay = true
    audio.controls = true
    audio.appendChild(source)
    document.body.appendChild(audio)
    audio.addEventListener('ended', () => {
      document.body.removeChild(audio)
    })
    return {
      data: null,
    }
  },
}

async function getTTS(text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.get(`https://xiaoapi.cn/API/zs_tts.php?type=xunfei&msg=${text}&id=0`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default directive
