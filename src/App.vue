<script setup lang="ts">
window.OS_API.readSchedule().then((res: any) => {
  schedules.value = JSON.parse(res.schedules)
})
</script>

<template>
  <RouterView />
</template>
