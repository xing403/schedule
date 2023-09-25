import PKGJson from '../../package.json'

const userAgent = navigator.userAgent.toLowerCase()
export const version = PKGJson.version
export const name = PKGJson.name
export const description = PKGJson.description
export const author = PKGJson.author
export const patform = useStorageAsync<'electron' | 'web'>('patform', userAgent.includes('electron/') ? 'electron' : 'web')
