export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const schedules = ref<Schedule[]>([])

const userAgent = navigator.userAgent.toLowerCase()
export const patform = useStorageAsync<'electron' | 'web'>('patform', userAgent.includes('electron/') ? 'electron' : 'web')
