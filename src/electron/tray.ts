import path from 'node:path'
import { Menu, Tray, nativeImage } from 'electron'

import { createWindow } from '.'

export function createTray(windowMap: WindowMap) {
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '256x256.png')))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click: () => {
        if (windowMap.get('about'))
          return
        const about = createWindow({ width: 600, height: 900 })
        const aboutPath = process.argv[2]
          ? `${process.argv[2]}/#/about`
          // eslint-disable-next-line n/no-path-concat
          : `file://${__dirname}/index.html#/about`
        about.loadURL(aboutPath)

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

  return tray
}
