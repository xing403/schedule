<script setup lang="ts">
import { useTimestamp } from '@vueuse/core'
import { dayjs } from 'element-plus'

const timestamp = useTimestamp({ offset: 0 })
const time = computed(() => dayjs(timestamp.value).format('YYYY-MM-DD HH:mm:ss'))
const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
const additionScheduleRef = ref()
const reload = () => router.push({ name: 'reload' })
const settingsDialog = ref(false)
const theme = computed(() => isDark.value ? createIconComponents('carbon:moon') : createIconComponents('carbon:sun'))
function handleCommandEvent(cmd: string) {
  switch (cmd) {
    case 'addition-schedule':
      additionScheduleRef.value.dialog = true
      break
    case 'theme':
      toggleDark()
      break
    case 'settings':
      settingsDialog.value = true
      break
  }
}
</script>

<template>
  <el-header border-b="1px light:hex-dcdfe6 dark:hex-4C4D4F solid">
    <div flex="~ row items-center gap-2" h-full>
      <div v-if="windowWidth.value > 768" text-xl v-text="time" />
      <div class="flex-grow" />
      <I18n />
      <svg-icon icon-hover name="mdi:refresh" size="1.2em" @click="reload()" />
      <el-dropdown trigger="click" @command="handleCommandEvent">
        <el-icon>
          <svg-icon icon-hover name="carbon:menu" size="1.5em" />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="addition-schedule" :icon="createIconComponents('carbon:add-large')">
              <el-text>{{ $t('flexible', { flexible: ['addition', 'schedule'] }) }}</el-text>
            </el-dropdown-item>
            <el-dropdown-item command="theme">
              <el-icon>
                <component :is="theme" />
              </el-icon>
              <el-text>{{ $t('flexible', { flexible: ['change', 'theme'] }) }}</el-text>
            </el-dropdown-item>
            <el-dropdown-item command="settings" divided :icon="createIconComponents('carbon:settings')">
              <el-text>{{ $t('flexible', { flexible: ['more', 'setting'] }) }}</el-text>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <addition-schedule ref="additionScheduleRef" />

    <el-dialog v-model="settingsDialog" title="设置" width="45%" destroy-on-close>
      <settings-component />
    </el-dialog>
  </el-header>
</template>
