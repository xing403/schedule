<route lang="yaml">
meta:
  title: 设置
  icon: i-carbon-settings
  hidden: true
  layout: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const currentTabPane = ref('base-setting')

const settingConfig = ref({
  baseSetting: {
    suspended_window: false,
  },
})

window.Electron.readSettings().then((res: any) => {
  Object.assign(settingConfig.value, res)
})

function handleSaveSetting() {
  window.Electron.saveSettings(JSON.stringify(settingConfig.value)).then((res: any) => {
    if (res)
      ElMessage.success('保存成功')
  })
}
</script>

<template>
  <div ml-20px mt-20px>
    <el-tabs v-model="currentTabPane" tab-position="left">
      <el-tab-pane label="基础设置" name="base-setting">
        <el-form :model="settingConfig" label-width="80px" :inline="false">
          <el-form-item label="悬浮窗">
            <el-switch v-model="settingConfig.baseSetting.suspended_window" />
            <el-alert title="应用重启有效" type="info" show-icon :closable="false" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveSetting">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
