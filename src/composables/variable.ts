export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const schedules = ref<Schedule[]>([])

watchArray(schedules, (newValue) => {
  window.OS_API.saveSchedule(JSON.stringify(newValue))
}, { deep: true })
