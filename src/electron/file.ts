import fs from 'node:fs'
import { dialog } from 'electron'

export function getFilesInFloder(floder: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(floder, (err, files) => {
      err ? reject(err) : resolve(files)
    })
  })
}

export function getFile(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(dirPath, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export function getFloder() {
  return new Promise<string[]>((resolve, reject) => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then((res) => {
      res.canceled ? reject(new Error('取消选择')) : resolve(res.filePaths)
    })
  })
}
