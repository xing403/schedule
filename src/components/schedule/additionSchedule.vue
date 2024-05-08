<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'

const insertFormRef = ref<FormInstance>()

const dialog = ref<boolean>(false)

const cronDrawerRef = ref()
const cronInputRef = ref()
const schedule_form = ref<Schedule>({
  id: new Date().getTime(),
  title: '',
  description: '',
  cron: '',
  interval: null,
  status: false,
  next: '-',
  timer: null,
  directives: [],
})
const schedule_form_rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'change' }],
  cron: [{ required: true, message: '请输入 cron', trigger: 'change' }],
}

function handleAddSchedule() {
  insertFormRef.value && insertFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const schedule = generateSchedule(schedule_form.value)
      schedules.value.push(schedule)
      ElMessage.success('添加成功')
      insertFormRef.value && insertFormRef.value.resetFields()
      logs(`add schedule: ${scheduleFormatOutput(schedule)}`, 'info')
      dialog.value = false
    }
  })
}
function resetFrom() {
  insertFormRef.value && insertFormRef.value.resetFields()
}
function openCronDrawer() {
  cronInputRef.value.blur()
  cronDrawerRef.value.drawer = true
}

defineExpose({ dialog })
</script>

<template>
  <el-dialog
    v-model="dialog" :title="$t('flexible', { flexible: ['addition', 'schedule'] })"
    :width="windowWidth.value < 768 ? '95%' : windowWidth.value < 1200 ? '60%' : '40%'" destroy-on-close
  >
    <el-form
      ref="insertFormRef" :model="schedule_form" :rules="schedule_form_rules" label-width="120px"
      require-asterisk-position="right" :label-position="windowWidth.value < 768 ? 'top' : 'right'" :inline="false"
    >
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item :label="$t('status')" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item :label="$t('cron')" prop="cron">
        <el-space direction="vertical" :fill="true" w-full>
          <el-input ref="cronInputRef" v-model="schedule_form.cron" placeholder="点击生成 cron" @focus="openCronDrawer" />
          <el-alert :closable="false">
            <ElLink
              type="primary" :underline="false" href="https://ilstudy.vip/blogs/others/cron-rules.html"
              target="_blank" v-text="$t('flexible', { flexible: ['see', 'corn', 'rule'] })"
            />
          </el-alert>
        </el-space>
      </el-form-item>
      <el-form-item :label="$t('flexible', { flexible: ['start stop', 'time'] })">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-date-picker
              v-model="schedule_form.startTime" type="datetime" placeholder="开始日期"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </el-col>
          <el-col :span="12">
            <el-date-picker
              v-model="schedule_form.endTime" type="datetime" placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>
      <el-form-item :label="$t('directives')" prop="directives">
        <directive-group v-model:directives="schedule_form.directives" />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleAddSchedule" v-text="$t('addition')" />
        <el-button type="warning" @click="resetFrom" v-text="$t('reset')" />
      </el-form-item>

      <cron-drawer ref="cronDrawerRef" v-model:cron="schedule_form.cron" />
    </el-form>
  </el-dialog>
</template>
