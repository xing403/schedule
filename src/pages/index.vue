<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import parser from 'cron-parser'
import { isDark, toggleDark } from '~/composables'

const theme = ref(isDark.value)
const form = ref()
const schedule_form = ref<Schedule>({
  id: new Date().getTime(),
  title: '',
  description: '',
  cron: '',
  callback: '',
  interval: null,
  status: false,
  timer: null,
})
const schedule_form_rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'change' },
  ],
  cron: [
    { required: true, message: '请输入 cron', trigger: 'change' },
    {
      validator: (rule: any, value: any, callback: any) => {
        const parser_res = parser.parseString(value)
        if (parser_res.errors[value])
          callback(new Error('表达式不正确，请参考表达式规则'))
        callback()
      },
      trigger: 'change',
    },
  ],
  callback: [
    { required: true, message: '请输入标题', trigger: 'change' },
  ],
}
const insertDialog = ref(false)
onMounted(() => {
  // const schedule = generateSchedule('hello', 'world', '*/10 * * * * *', (schedule: Schedule) => {
  //   ElNotification({
  //     title: schedule.title,
  //     message: schedule.description,
  //   })
  // })
  // schedules.value.push(schedule)
})
function handleChange(schedule: Schedule) {
  schedule.status ? startSchedule(schedule) : stopSchedule(schedule)
}
function handleAddSchedule() {
  const schedule = generateSchedule('hello', 'world', '*/10 * * * * *', (schedule: Schedule) => {
    ElNotification({
      title: schedule.title,
      message: schedule.description,
    })
  })
  schedules.value.push(schedule)
}
function insertDialogOnClose() {
  schedule_form.value = {
    id: new Date().getTime(),
    title: '',
    description: '',
    cron: '',
    callback: '',
    interval: null,
    status: false,
    timer: null,
  }
  insertDialog.value = false
}
function handleRemoveSchedule(schedule: Schedule) {
  schedules.value.splice(schedules.value.indexOf(schedule), 1)
}
</script>

<template>
  <div flex="~ row gap-2 items-center" justify="end" mx-5 my-2 h-50px>
    <el-button size="default" circle icon="Plus" @click="insertDialog = true" />
    <el-switch v-model="theme" :active-value="true" :inactive-value="false" @change="toggleDark()" />
  </div>
  <el-table :data="schedules" stripe border>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column type="index" width="80" label="编号" align="center" />
    <el-table-column prop="id" width="180" label="Id" align="center" />
    <el-table-column prop="title" label="标题" align="center" />
    <el-table-column prop="description" label="描述" align="center" />
    <el-table-column prop="cron" label="cron" align="center" />
    <el-table-column width="100" align="center" prop="status" label="任务状态">
      <template #default="scope">
        <el-switch
          v-model="scope.row.status" :active-value="true" :inactive-value="false"
          @change="handleChange(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column width="280" align="center" label="操作">
      <!-- <template #default="scope"> -->
      <template #default="scope">
        <el-button type="warning" size="small">
          编辑
        </el-button>
        <el-button type="danger" size="small" @click="handleRemoveSchedule(scope.row)">
          删除
        </el-button>
        <el-button type="info" size="small">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="insertDialog" title="添加任务" width="40%" :before-close="insertDialogOnClose">
    <el-form ref="form" :model="schedule_form" :rules="schedule_form_rules" label-width="80px" :inline="false">
      <el-form-item label="标题" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>
      <el-form-item prop="cron">
        <template #label>
          <el-popover placement="top-start" trigger="hover">
            <el-link type="primary" :underline="false" href="/cron-rule" target="_blank">
              查看 cron 规则
            </el-link>
            <template #reference>
              <span>cron</span>
            </template>
          </el-popover>
        </template>
        <el-space direction="vertical" :fill="true" w-full>
          <el-input v-model="schedule_form.cron" placeholder="请输入 cron" />
          <el-alert type="info" show-icon :closable="false">
            <template #title>
              查看 <el-link type="primary" :underline="false" href="/cron-rule" target="_blank">
                cron 规则
              </el-link>
            </template>
          </el-alert>
        </el-space>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item label="执行" prop="callback">
        <el-input v-model="schedule_form.callback" :rows="5" type="textarea" placeholder="请输入执行表达式" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleAddSchedule">
        创建
      </el-button>
      <el-button type="warning" @click="insertDialogOnClose">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>
