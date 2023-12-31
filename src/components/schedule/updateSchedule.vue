<route lang="yaml">
meta:
  title: 修改任务
  icon: i-carbon-calendar-settings
  hidden: true
</route>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'

const props = defineProps<{
  schedule: Schedule | null
}>()
const emits = defineEmits(['update:schedule', 'error', 'change', 'close'])
const schedule = shallowRef(props.schedule)
const drawer = ref<boolean>(false)
const updateFormRef = ref<FormInstance>()
const cronDrawerRef = ref()
const cronInputRef = ref()
const schedule_form = ref<Schedule>()

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'change' }],
  cron: [{ required: true, message: '请输入 cron', trigger: 'change' }],
}

function handleSaveUpdateSchedule() {
  updateFormRef.value && updateFormRef.value.validate((valid: boolean) => {
    if (valid && schedule_form.value) {
      const index = schedules.value.findIndex((item: Schedule) => item.id === schedule_form.value?.id)

      const oldSchedule = schedules.value[index]

      stopSchedule(oldSchedule)
      const schedule = generateSchedule(schedule_form.value)
      schedules.value.splice(index, 1, schedule)
      ElMessage.success({ message: '保存成功' })

      logs(`upd from ${scheduleFormatOutput(schedule)} to ${scheduleFormatOutput(schedule)}`, 'warn')
      emits('change')
    }
  })
}

function handleOpenDrawer() {
  drawer.value = true
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

function handleCloseCronDrawer() {
  cronInputRef.value.blur()
}
</script>

<template>
  <div>
    <el-form
      v-if="schedule_form" ref="updateFormRef" :model="schedule_form" :rules="rules" label-width="80px"
      :label-position="windowWidth.value < 768 ? 'top' : 'right'" require-asterisk-position="right"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item prop="cron" label="cron">
        <el-space direction="vertical" :fill="true" w-full>
          <el-input
            ref="cronInputRef" v-model="schedule_form.cron" placeholder="请输入cron, 例如: */10 * * * * *"
            @focus="handleOpenDrawer"
          />
          <el-alert show-icon :closable="false">
            <template #title>
              <el-link
                type="primary" :underline="false" href="https://ilstudy.vip/blogs/others/cron-rules.html"
                target="_blank" v-text="'查看 cron 规则'"
              />
            </template>
          </el-alert>
        </el-space>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>

      <el-form-item label="执行指令" prop="directives">
        <directive-group v-model:directives="schedule_form.directives" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSaveUpdateSchedule" v-text="'保存'" />
        <el-button type="warning" @click="$emit('close')" v-text="'取消'" />
      </el-form-item>

      <el-drawer
        v-model="drawer" title="Cron 表达式" direction="rtl"
        :size="windowWidth.value < 768 ? '100%' : windowWidth.value < 1200 ? '50%' : '30%'" destroy-on-close
        @close="handleCloseCronDrawer"
      >
        <cron-drawer ref="cronDrawerRef" v-model:cron="schedule_form.cron" @success="drawer = false" />
      </el-drawer>
    </el-form>
  </div>
</template>
