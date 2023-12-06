<route lang="yaml">
meta:
  title: 首页
  icon: i-carbon-home
  hidden: true
</route>

<script lang="ts" setup>
const edit = ref<Boolean>(false)
const detail = ref<Boolean>(false)
const schedule = ref<Schedule>({
  id: 0,
  title: '',
  cron: '* * * * * *',
  status: false,
  interval: null,
  timer: null,
  next: '',
  description: '',
  directives: [],
})
function handleChangeStatus(schedule: Schedule) {
  schedule.status ? startSchedule(schedule) : stopSchedule(schedule)
}
function handleRemoveSchedule(schedule: Schedule) {
  stopSchedule(schedule)
  schedules.value.splice(schedules.value.indexOf(schedule), 1)
  logs(`del ${scheduleFormatOutput(schedule)}`, 'warn')
}

function handleUpdateSchedule(s: Schedule) {
  schedule.value = { ...s }
  edit.value = true
}
function handleDetailSchedule(s: Schedule) {
  schedule.value = { ...s }
  detail.value = true
}
</script>

<template>
  <div class="index">
    <el-table :data="schedules" stripe border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" width="80" label="编号" align="center" />
      <el-table-column prop="id" width="180" label="Id" align="center" />
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="cron" label="cron" align="center" />
      <el-table-column prop="next" label="预计下次执行时间" align="center" />
      <el-table-column width="100" align="center" prop="status" label="任务状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" @change="handleChangeStatus(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column width="280" align="center" label="操作">
        <template #default="scope">
          <el-button type="info" size="small" @click="handleDetailSchedule(scope.row)" v-text="'详情'" />
          <el-button type="warning" size="small" @click="handleUpdateSchedule(scope.row)" v-text="'编辑'" />
          <el-popconfirm title="确认删除这个任务吗?" @confirm="handleRemoveSchedule(scope.row)">
            <template #reference>
              <el-button type="danger" size="small" v-text="'删除'" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="edit" title="编辑任务" width="45%" destroy-on-close>
      <update-schedule v-model:schedule="schedule" @change="edit = false" @close="edit = false" />
    </el-dialog>
    <el-dialog v-model="detail" title="任务详情" width="45%" destroy-on-close>
      <detail-schedule v-model:schedule="schedule" :disabled="true" />
    </el-dialog>
  </div>
</template>
