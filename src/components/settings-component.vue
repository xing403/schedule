<script setup lang="ts">
import { ElMessage } from 'element-plus'

const currentTabPane = ref('base-setting')

const settingConfig = ref({
  baseSetting: {
    floatBall: false,
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
        <div class="setting-item">
          <el-text v-text="$t('flexible', { flexible: ['change', 'language'] })" />
          <i18n type="select" />
        </div>
        <el-divider />
        <div class="setting-item">
          <el-text v-text="'悬浮球'" />
          <el-switch v-model="settingConfig.baseSetting.floatBall" />
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

<style lang="postcss">
.setting-item {
  @apply flex flex-row gap-1 items-center justify-between px-2;
}
</style>
