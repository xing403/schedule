<route lang="yaml">
meta:
  title: 首页
  icon: i-carbon-home
</route>

<script lang="ts" setup>
const router = useRouter()

function handleChangeStatus(schedule: Schedule) {
  schedule.status ? startSchedule(schedule) : stopSchedule(schedule)
}

function handleRemoveSchedule(schedule: Schedule) {
  stopSchedule(schedule)
  schedules.value.splice(schedules.value.indexOf(schedule), 1)
  logs(`del ${scheduleFormatOutput(schedule)}`, 'warn')
}

function handleUpdateSchedule(schedule: Schedule) {
  router.push({
    name: 'schedule-update',
    query: {
      id: schedule.id,
    },
  })
}

function handleDetailSchedule(schedule: Schedule) {
  router.push({
    name: 'schedule-detail',
    query: {
      id: schedule.id,
    },
  })
}
</script>

<template>
  <el-table :data="schedules" stripe border>
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column type="index" width="80" label="编号" align="center" />
    <el-table-column prop="id" width="180" label="Id" align="center" />
    <el-table-column prop="title" label="标题" align="center" />
    <el-table-column prop="description" label="描述" align="center" />
    <el-table-column prop="cron" label="cron" align="center" />
    <el-table-column prop="next" label="预计下次执行时间" align="center" />
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
        <el-button type="warning" size="small" @click="handleUpdateSchedule(scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确认删除这个任务吗?" @confirm="handleRemoveSchedule(scope.row)">
          <template #reference>
            <el-button type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-popconfirm>

        <el-button type="info" size="small" @click="handleDetailSchedule(scope.row)">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
