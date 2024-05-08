import path from 'path-browserify'

import PKGJson from '../../package.json'

const userAgent = navigator.userAgent.toLowerCase()
export const PkgJson = PKGJson
export const version = PKGJson.version
export const name = PKGJson.name
export const description = PKGJson.description
export const author = PKGJson.author
export const platform = useStorageAsync<'electron' | 'web'>('platform', userAgent.includes('electron/') ? 'electron' : 'web')

export const favicon_path = path.join('favicon.ico')

export const menuCollapse = ref(false)
export const menuCollapseToggle = useToggle(menuCollapse)
