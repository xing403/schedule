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
      <div
        :class="menuCollapse ? 'i-carbon-arrow-right' : 'i-carbon-arrow-left'" cursor="pointer"
        @click="menuCollapseToggle()"
      />
    </div>
    <div flex="~ row gap-1 items-center" justify="between">
      <div i-carbon-time />
      <div text-xl>
        {{ current }}
      </div>
      <el-divider direction="vertical" />
      <reload />
      <el-divider direction="vertical" />
      <el-switch v-model="theme" size="small" :active-value="true" :inactive-value="false" @change="toggleDark()" />
    </div>
  </div>
</template>
