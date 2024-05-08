import path from 'node:path'
import { Menu, Tray, nativeImage } from 'electron'

import { createMainWindow, createWindow } from '.'

export function createTray(windowMap: WindowMap) {
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '256x256.png')))
  const contextMenu = Menu.buildFromTemplate([{
    label: '关于',
    click: () => {
      if (windowMap.get('about'))
        return
      const about = createWindow({ width: 600, height: 900 })
      // eslint-disable-next-line n/no-path-concat, n/prefer-global/process
      const aboutPath = process.argv[2] ? `${process.argv[2]}/#/about` : `file://${__dirname}/index.html#/about`
      about.loadURL(aboutPath)

      about.on('closed', () => {
        windowMap.delete('about')
      })
      windowMap.set('about', about)
    },
  }, {
    label: '设置',
    click: () => {
      if (windowMap.get('settings'))
        return
      const settings = createWindow({ width: 600, height: 900 })
      // eslint-disable-next-line n/prefer-global/process, n/no-path-concat
      const settingsPath = process.argv[2] ? `${process.argv[2]}/#/settings` : `file://${__dirname}/index.html#/settings`
      settings.loadURL(settingsPath)

      settings.on('closed', () => {
        windowMap.delete('settings')
      })
      windowMap.set('settings', settings)
    },
  }, {
    type: 'separator',
  }, {
    label: '退出',
    role: 'quit',
  }])

  tray.setContextMenu(contextMenu)

  tray.setToolTip('schedule')
  tray.on('click', () => {
    const mainWindow = windowMap.get('main')
    if (mainWindow) {
      mainWindow.isVisible()
        ? mainWindow.hide()
        : mainWindow.show()
    }
    else {
      createMainWindow(windowMap)
    }
  })
  return tray
}
