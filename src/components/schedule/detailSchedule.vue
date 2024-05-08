<route lang="yaml">
meta:
  icon: i-carbon-calendar-settings
  hidden: true
  </route>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'

const props = defineProps<{
  schedule: Schedule | null
}>()
const emits = defineEmits(['update:schedule', 'error', 'change'])
const schedule = shallowRef(props.schedule)
const updateFormRef = ref<FormInstance>()
const cronDrawerRef = ref()
const cronInputRef = ref()
const schedule_form = ref<Schedule>()

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'change' }],
  cron: [{ required: true, message: '请输入 cron', trigger: 'change' }],
}

function handleOpenDrawer() {
  cronInputRef.value.blur()
  cronDrawerRef.value.drawer = true
}
onMounted(() => {
  if (!schedule.value) {
    ElMessage.error('修改的 Schedule 不存在')
    logs('修改的 Schedule 不存在', 'error')
    emits('error', '修改的 Schedule 不存在')
    return
  }
  nextTick(() => {
    schedule_form.value = JSON.parse(JSON.stringify(props.schedule)) as Schedule
    JSON.parse(JSON.stringify(parseExpression(schedule_form.value.cron).fields))
  })
})
</script>

<template>
  <div>
    <el-form
      v-if="schedule_form" ref="updateFormRef" :model="schedule_form" :rules="rules" label-width="120px"
      :label-position="windowWidth.value < 768 ? 'top' : 'right'" require-asterisk-position="right"
    >
      <el-form-item :label="$t('title')" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" disabled />
      </el-form-item>
      <el-form-item :label="$t('status')" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" disabled />
      </el-form-item>
      <el-form-item :label="$t('cron')" prop="cron">
        <el-space direction="vertical" :fill="true" w-full>
          <el-input ref="cronInputRef" v-model="schedule_form.cron" placeholder="点击生成 cron" @focus="handleOpenDrawer" />
          <el-alert show-icon :closable="false">
            <template #title>
              <ElLink
                type="primary" :underline="false" href="https://ilstudy.vip/blogs/others/cron-rules.html"
                target="_blank" v-text="$t('flexible', { flexible: ['see', 'corn', 'rule'] })"
              />
            </template>
          </el-alert>
        </el-space>
      </el-form-item>
      <el-form-item :label="$t('flexible', { flexible: ['start stop', 'time'] })">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-date-picker
              v-model="schedule_form.startTime" type="datetime" placeholder="开始日期"
              format="YYYY-MM-DD HH:mm:ss" disabled
            />
          </el-col>
          <el-col :span="12">
            <el-date-picker
              v-model="schedule_form.endTime" type="datetime" placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss" disabled
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" disabled />
      </el-form-item>

      <el-form-item :label="$t('directives')" prop="directives">
        <directive-group v-model:directives="schedule_form.directives" disabled />
      </el-form-item>
      <cron-drawer ref="cronDrawerRef" v-model:cron="schedule_form.cron" disabled />
    </el-form>
  </div>
</template>
