<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import parser from 'cron-parser'
import { isDark, toggleDark } from '~/composables'

const theme = ref(isDark.value)
const insert_form = ref<FormInstance>()
const update_form = ref<FormInstance>()
const schedule_form = ref<Schedule>({
  id: new Date().getTime(),
  title: '',
  description: '',
  cron: '',
  callback: '',
  callback_type: 'notification',
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
  callback_type: [
    { required: true, message: '请输入任务执行类型', trigger: 'change' },
  ],
}
const insertDialog = ref(false)
const updateDialog = ref(false)

function handleChangeStatus(schedule: Schedule) {
  schedule.status ? startSchedule(schedule) : stopSchedule(schedule)
}

function clearForm() {
  schedule_form.value = {
    id: new Date().getTime(),
    title: '',
    description: '',
    cron: '',
    callback: '',
    callback_type: 'notification',
    interval: null,
    status: false,
    timer: null,
  }
}
function handleOpeninsertSchedule() {
  insertDialog.value = true
  clearForm()
}
function handleAddSchedule() {
  insert_form.value && insert_form.value.validate((valid: boolean) => {
    if (valid) {
      const schedule = generateSchedule(
        schedule_form.value.title,
        schedule_form.value.description,
        schedule_form.value.cron,
        schedule_form.value.callback,
        schedule_form.value.status,
        schedule_form.value.callback_type,
      )
      schedules.value.push(schedule)
      ElMessage.success('添加成功')
      clearForm()
      insertDialog.value = false
    }
  })
}

function insertDialogOnClose() {
  insertDialog.value = false
  clearForm()
}

function handleRemoveSchedule(schedule: Schedule) {
  schedules.value.splice(schedules.value.indexOf(schedule), 1)
}

function handleOpenUpdateSchedule(schedule: Schedule) {
  updateDialog.value = true
  clearForm()
  schedule_form.value = { ...schedule }
}

function handleSaveUpdateSchedule() {
  update_form.value && update_form.value.validate((valid: boolean) => {
    if (valid) {
      const index = schedules.value.findIndex((item: Schedule) => {
        return item.id === schedule_form.value.id
      })
      // clear old schedule setTimeOut task
      schedules.value[index].status = false

      schedules.value[index] = generateSchedule(
        schedule_form.value.title,
        schedule_form.value.description,
        schedule_form.value.cron,
        schedule_form.value.callback,
        schedule_form.value.status,
        schedule_form.value.callback_type,
      )
      updateDialog.value = false
      ElMessage.success('修改成功')
      clearForm()
    }
  })
}

function handleUpdateDialogClose() {
  updateDialog.value = false
  clearForm()
}
</script>

<template>
  <div flex="~ row gap-2 items-center" justify="end" mx-5 my-2 h-50px>
    <el-button size="default" circle icon="Plus" @click="handleOpeninsertSchedule" />
    <el-switch v-model="theme" :active-value="true" :inactive-value="false" @change="toggleDark()" />
  </div>

  <el-table :data="schedules" stripe border>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column type="index" width="80" label="编号" align="center" />
    <el-table-column prop="id" width="180" label="Id" align="center" />
    <el-table-column prop="title" label="标题" align="center" />
    <el-table-column prop="description" label="描述" align="center" />
    <el-table-column prop="cron" label="cron" align="center" />
    <el-table-column prop="callback_type" label="任务类型" align="center">
      <template #default="scope">
        <template v-for="item in CallbackMap">
          <el-tag v-if="scope.row.callback_type === item.value" :key="item.value">
            {{ item.label }}
          </el-tag>
        </template>
      </template>
    </el-table-column>
    <el-table-column width="100" align="center" prop="status" label="任务状态">
      <template #default="scope">
        <el-switch
          v-model="scope.row.status" :active-value="true" :inactive-value="false"
          @change="handleChangeStatus(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column width="280" align="center" label="操作">
      <template #default="scope">
        <el-button type="warning" size="small" @click="handleOpenUpdateSchedule(scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确认删除这个任务吗?" @confirm="handleRemoveSchedule(scope.row)">
          <template #reference>
            <el-button type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-popconfirm>

        <el-button type="info" size="small">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="insertDialog" title="添加任务" width="40%" :before-close="insertDialogOnClose">
    <el-form ref="insert_form" :model="schedule_form" :rules="schedule_form_rules" label-width="80px" :inline="false">
      <el-form-item label="标题" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>
      <el-form-item prop="cron">
        <template #label>
          <el-popover placement="top-start" trigger="hover">
            <el-link type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html" target="_blank">
              查看 cron 规则
            </el-link>
            <template #reference>
              <span>cron</span>
            </template>
          </el-popover>
        </template>
        <el-space direction="vertical" :fill="true" w-full>
          <el-input v-model="schedule_form.cron" placeholder="请输入cron, 例如: */10 * * * * *" />
          <el-alert type="info" show-icon :closable="false">
            <template #title>
              <div>
                查看 <el-link type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html" target="_blank">
                  cron 规则
                </el-link>
              </div>
            </template>
          </el-alert>
        </el-space>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item label="任务类型" prop="status">
        <el-select v-model="schedule_form.callback_type" placeholder="选择任务类型">
          <el-option v-for="item in CallbackMap" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="schedule_form.callback_type === 'custom'" label="执行内容" prop="callback">
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

  <el-dialog v-model="updateDialog" title="修改任务" width="40%" :before-close="handleUpdateDialogClose">
    <el-form ref="update_form" :model="schedule_form" :rules="schedule_form_rules" label-width="80px" :inline="false">
      <el-form-item label="标题" prop="title">
        <el-input v-model="schedule_form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
      </el-form-item>
      <el-form-item prop="cron">
        <template #label>
          <el-popover placement="top-start" trigger="hover">
            <el-link type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html" target="_blank">
              查看 cron 规则
            </el-link>
            <template #reference>
              <span>cron</span>
            </template>
          </el-popover>
        </template>
        <el-space direction="vertical" :fill="true" w-full>
          <el-input v-model="schedule_form.cron" placeholder="请输入cron, 例如: */10 * * * * *" />
          <el-alert type="info" show-icon :closable="false">
            <template #title>
              <div>
                查看 <el-link type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html" target="_blank">
                  cron 规则
                </el-link>
              </div>
            </template>
          </el-alert>
        </el-space>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item label="任务类型" prop="status">
        <el-select v-model="schedule_form.callback_type" placeholder="选择任务类型">
          <el-option v-for="item in CallbackMap" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="schedule_form.callback_type === 'custom'" label="执行内容" prop="callback">
        <el-input v-model="schedule_form.callback" :rows="5" type="textarea" placeholder="请输入执行表达式" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSaveUpdateSchedule">
        保存
      </el-button>
      <el-button type="warning" @click="handleUpdateDialogClose">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>
