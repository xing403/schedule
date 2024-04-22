<script setup lang="ts">
import { ElMessage } from 'element-plus'

const currentTabPane = ref('base-setting')

const settingConfig = ref({
  baseSetting: {
    suspended_window: false,
  },
})

onMounted(() => {
  if (platform.value === 'electron') {
    window.Electron.readSettings().then((res: any) => {
      settingConfig.value = res
    })
  }
})
function handleSaveSetting() {
  if (platform.value === 'electron') {
    window.Electron.saveSettings(JSON.stringify(settingConfig.value)).then((res: any) => {
      if (res)
        ElMessage.success('保存成功')
      else
        ElMessage.error('保存失败')
    })
  }
  else {
    ElMessage.warning('仅限客户端使用')
  }
}
</script>

<template>
  <el-tabs v-model="currentTabPane" tab-position="top">
    <el-tab-pane :label="$t('flexible', { flexible: ['base', 'setting'] })" name="base-setting">
      <el-card>
        <template #header>
          <div flex="~ row gap-1 items-center justify-between">
            <div v-text="$t('flexible', { flexible: ['base', 'setting'] })" />
            <el-button type="primary" @click="handleSaveSetting" v-text="$t('save')" />
          </div>
        </template>
        <div flex="~ row gap-1 items-center justify-between">
          <el-badge value="test">
            <el-button v-text="'悬浮窗'" />
          </el-badge>
          <el-switch v-model="settingConfig.baseSetting.suspended_window" />
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane :label="$t('flexible', { flexible: ['service', 'setting'] })" name="service-setting">
      <el-card>
        <template #header>
          <div v-text="$t('flexible', { flexible: ['mqtt', 'service', 'setting'] })" />
        </template>
        <mqtt />
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
