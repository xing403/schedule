export * from './dictionaries'
export * from './Schedule'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const schedules = ref<Schedule[]>([])
