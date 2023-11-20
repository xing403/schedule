export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const schedules = ref<Schedule[]>([])

watchArray(schedules, (newValue) => {
  if (platform.value === 'electron')
    window.Electron.saveSchedule(JSON.stringify(newValue))
  else if (platform.value === 'web')
    localStorage.setItem('schedule', JSON.stringify(newValue))
}, { deep: true })
