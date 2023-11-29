<script setup lang="ts">
onMounted(() => {
  nextTick(async () => {
    initApp()
  })
})
</script>

<template>
  <RouterView />
</template>
