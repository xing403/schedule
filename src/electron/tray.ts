import path from 'node:path'
import { Menu, Tray, nativeImage } from 'electron'

import { createWindow } from './main'

export default (windowMap: WindowMap) => {
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'favicon.jpg')))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click: () => {
        if (windowMap.get('about'))
          return
        const about = createWindow({ width: 600, height: 900 })
        process.argv[2] ? about.loadURL(process.argv[2]) : about.loadFile('index.html')
        about.once('ready-to-show', () => {
          setTimeout(() => {
            about.webContents.send('change-route', 'about')
            about.setTitle('schedule - about')
            about.show()
          }, 100)
        })
        about.on('closed', () => {
          windowMap.delete('about')
        })
        windowMap.set('about', about)
      },
    },
    { label: '退出', role: 'quit' },
  ])
  tray.setContextMenu(contextMenu)

  tray.setToolTip('schedule')
}
