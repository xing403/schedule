<script setup lang="ts">
import { dayjs } from 'element-plus'

const router = useRouter()
const current = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const additionScheduleRef = ref()
const setCurrentTime = () => current.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
const reload = () => router.push({ name: 'reload' })

const timer = setInterval(setCurrentTime, 1000)
const settingsDialog = ref(false)
const theme = ref(isDark.value)
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
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <el-header>
    <el-menu mode="horizontal" :ellipsis="false">
      <el-menu-item index="0">
        <div v-if="windowWidth.value > 768" text-xl v-text="current" />
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="2">
        <div class="refresh i-mdi-refresh" @click="reload()" />
      </el-menu-item>
      <el-menu-item>
        <el-dropdown @command="handleCommandEvent">
          <div class="i-carbon-menu" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="addition-schedule">
                新增Schedule
              </el-dropdown-item>
              <el-dropdown-item command="theme">
                <el-switch
                  v-model="theme" size="small" :active-value="true" :inactive-value="false"
                  @change="toggleDark()"
                />
              </el-dropdown-item>
              <el-dropdown-item command="settings" divided>
                <div icon-btn class="i-carbon-settings" />
                打开设置
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>
    </el-menu>

    <addition-schedule ref="additionScheduleRef" />

    <el-dialog v-model="settingsDialog" title="设置" width="45%" destroy-on-close>
      <settings-component />
    </el-dialog>
  </el-header>
</template>
