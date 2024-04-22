<script setup lang="ts">
import { ref } from 'vue'
import md5 from 'md5'
import { ElMessage, ElNotification } from 'element-plus'

import useMQTTStore from '~/store/mqtt'

const mqttStore = useMQTTStore()

const connected = ref<boolean>((mqttStore.client && mqttStore.client.connected) ?? false)
const formRef = ref()
const form = ref({
  host: MQTT.value.host,
  username: MQTT.value.username,
  password: MQTT.value.password,
  port: MQTT.value.port,
  auto: MQTT.value.auto ?? false,
})
const form_rules = {
  host: [{ required: true, message: '请输入MQTT地址', trigger: 'blur' }],
}
function handleConnect() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      mqttStore.connect(md5(Date()), form.value.host, form.value.username, form.value.password, form.value.port).then((status: boolean) => {
        if (status) {
          ElMessage.success('连接成功')
          connected.value = true

          MQTT.value = form.value
        }
      }).catch((error: any) => {
        ElNotification({
          type: 'error',
          title: '连接失败',
          message: error,
        })
      })
    }
  })
}
function handleDisconnect() {
  if (mqttStore.disconnect()) {
    ElMessage.success('断开连接成功')
    connected.value = false
  }
  else { ElMessage.error('断开连接失败') }
}
</script>

<template>
  <el-form
    ref="formRef" :model="form" :rules="form_rules" label-width="70px" require-asterisk-position="right"
    :label-position="windowWidth.value < 768 ? 'top' : 'right'" :inline="false" w-full
  >
    <el-form-item :label="$t('path')" prop="host">
      <el-input v-model="form.host" :disabled="connected" placeholder="请输入MQTT地址" clearable />
    </el-form-item>
    <el-form-item :label="$t('username')" prop="username">
      <el-input v-model="form.username" :disabled="connected" placeholder="请输入MQTT用户名" clearable />
    </el-form-item>
    <el-form-item :label="$t('password')" prop="password">
      <el-input
        v-model="form.password" :disabled="connected" type="password" placeholder="请输入MQTT密码" clearable
        show-password
      />
    </el-form-item>
    <el-form-item :label="$t('port')" prop="port">
      <el-input
        v-model="form.port" :disabled="connected" type="number" :control="false" placeholder="请输入MQTT端口"
        clearable
      />
    </el-form-item>
    <el-form-item label=" " prop="auto">
      <el-checkbox v-model="form.auto" :label="$t('flexible', { flexible: ['next', 'auto', 'connect'] })" />
    </el-form-item>
    <el-form-item label="">
      <el-button v-if="connected" :disabled="connected" type="danger" v-text="$t('connected')" />
      <el-button v-else :disabled="connected" type="primary" @click="handleConnect" v-text="$t('connect')" />
      <el-button
        :disabled="!connected" type="warning" @click="handleDisconnect"
        v-text="$t('flexible', { flexible: ['cancel', 'connect'] })"
      />
    </el-form-item>
  </el-form>
</template>
