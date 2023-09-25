<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
window.OS_API?.changeRoute((_event: any, route: string) => {
  router.push({
    name: route,
  })
})
</script>

<template>
  <main font-sans text="gray-700 dark:gray-200">
    <RouterView />
  </main>
</template>
