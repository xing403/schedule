<script setup lang="ts">
import { dayjs } from 'element-plus'

const current = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const timer = setInterval(() => {
  current.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
onBeforeUnmount(() => {
  clearInterval(timer)
})
const theme = ref(isDark.value)
</script>

<template>
  <div flex="~ row gap-1 items-center" justify="between" h-full>
    <div flex="~ row gap-1 items-center">
      <div :class="menuCollapse ? 'i-carbon-playlist' : 'i-carbon-list'" cursor="pointer" @click="menuCollapseToggle()" />
      <div text-xl v-text="current" />
    </div>
    <div flex="~ row gap-1 items-center" justify="between">
      <addition-schedule />
      <el-divider direction="vertical" />
      <reload />
      <el-divider direction="vertical" />
      <el-switch v-model="theme" size="small" :active-value="true" :inactive-value="false" @change="toggleDark()" />
    </div>
  </div>
</template>
