import type { Buffer } from 'node:buffer'
import useMusicStore from '~/store/music'

const directive: DirectiveFType = {
  key: 'music',
  name: '播放音乐',
  args: {
    musicUrl: '',
  },
  support: ['electron'],
  execute: (schedule: Schedule, data?: any) => {
    const musicStore = useMusicStore()

    if (!musicStore.start) {
      const musicUrl = data.args.musicUrl as string
      window.Electron.getFile(musicUrl).then((fileBuffer: Buffer) => {
        const blob = new Blob([fileBuffer], { type: 'audio/mp4' })
        musicStore.url = URL.createObjectURL(blob)
        if (!musicStore.start)
          musicStore.toggleStart()
      }).catch(() => {
        logs('音乐文件获取失败', 'error')
        stopSchedule(schedule)
      })
    }
    return {
      data: true,
    }
  },
}

export default directive
