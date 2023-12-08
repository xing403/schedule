<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const insertFormRef = ref<FormInstance>()

const dialog = ref<boolean>(false)
const drawer = ref<boolean>(false)

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
  drawer.value = true
}

function handleCloseCronDrawer() {
  cronInputRef.value.blur()
}
</script>

<template>
  <button icon-btn class="i-carbon-add-alt" @click="dialog = true" />
  <el-dialog
    v-model="dialog" title="添加 Schedule"
    :width="windowWidth.value < 768 ? '95%' : windowWidth.value < 1200 ? '60%' : '40%'" destroy-on-close
  >
    <el-form
      ref="insertFormRef" :model="schedule_form" :rules="schedule_form_rules" label-width="80px"
      require-asterisk-position="right" :label-position="windowWidth.value < 768 ? 'top' : 'right'" :inline="false"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item prop="cron" label="cron">
        <el-space direction="vertical" :fill="true" w-full>
          <el-input ref="cronInputRef" v-model="schedule_form.cron" placeholder="点击生成 cron" @focus="openCronDrawer" />
          <el-alert :closable="false">
            <el-link
              type="primary" :underline="false" href="https://ilstudy.vip/blogs/others/cron-rules.html"
              target="_blank" v-text="' 查看 cron 规则'"
            />
          </el-alert>
        </el-space>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>
      <el-form-item label="执行指令" prop="directives">
        <directive-group v-model:directives="schedule_form.directives" />
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="handleAddSchedule" v-text="'创建'" />
        <el-button type="warning" @click="resetFrom" v-text="'重置'" />
      </el-form-item>

      <el-drawer
        v-model="drawer" title="Cron 表达式" direction="rtl"
        :size="windowWidth.value < 768 ? '100%' : windowWidth.value < 1200 ? '50%' : '30%'" destroy-on-close
        @close="handleCloseCronDrawer"
      >
        <cron-drawer ref="cronDrawerRef" v-model:cron="schedule_form.cron" @success="drawer = false" />
      </el-drawer>
    </el-form>
  </el-dialog>
</template>
