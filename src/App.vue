<script setup lang="ts">
onMounted(() => {
  nextTick(async () => {
    let history_schedules
    const initSchedules: Schedule[] = []
    if (platform.value === 'electron') {
      history_schedules = await window.Electron.readSchedule().then((res: any) => {
        return JSON.parse(res.schedules)
      })
    }
    else if (platform.value === 'web') {
      history_schedules = useLocalStorage('schedule', []).value
    }
    for (const schedule of history_schedules)
      initSchedules.push(generateSchedule(schedule))

    schedules.value = initSchedules
  })
})
</script>

<template>
  <RouterView />
</template>
