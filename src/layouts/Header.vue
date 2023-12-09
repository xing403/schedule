<script setup lang="ts">
import { dayjs } from 'element-plus'

const current = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const timer = setInterval(() => {
  current.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
const settingsDialog = ref(false)
onBeforeUnmount(() => {
  clearInterval(timer)
})
const theme = ref(isDark.value)
</script>

<template>
  <div flex="~ row gap-1 items-center" justify="between">
    <div flex="~ row gap-1 items-center">
      <div v-if="windowWidth.value > 768" text-xl v-text="current" />
    </div>
    <div flex="~ row gap-1 items-center" justify="between">
      <button icon-btn class="i-carbon-settings" @click="settingsDialog = true" />
      <el-divider direction="vertical" />
      <addition-schedule />
      <el-divider direction="vertical" />
      <reload />
      <el-divider direction="vertical" />
      <el-switch v-model="theme" size="small" :active-value="true" :inactive-value="false" @change="toggleDark()" />
    </div>
    <el-dialog v-model="settingsDialog" title="设置" width="45%" destroy-on-close>
      <settings-component />
    </el-dialog>
  </div>
</template>
