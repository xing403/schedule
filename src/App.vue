<script setup lang="ts">
if (platform.value === 'electron') {
  window.Electron.readSchedule().then((res: any) => {
    const history_schedules = JSON.parse(res.schedules)
    const initSchedules: Schedule[] = []
    for (const schedule of history_schedules) {
      const s = generateSchedule(
        schedule.title,
        schedule.description,
        schedule.cron,
        schedule.callback,
        schedule.status,
        schedule.callback_type,
        schedule.id,
      )
      initSchedules.push(s)
    }

    schedules.value = initSchedules
  })
}
</script>

<template>
  <RouterView />
</template>
