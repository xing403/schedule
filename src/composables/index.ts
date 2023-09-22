import type { Schedule } from './Schedule'

export * from './Schedule'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const schedules = ref<Schedule[]>([])
