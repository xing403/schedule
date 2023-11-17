<route lang="yaml">
meta:
  title: 修改任务
  icon: i-carbon-calendar-settings
  hidden: true
</route>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'

const router = useRouter()
const route = useRoute()
const updateFormRef = ref<FormInstance>()
const drawerRef = ref()

const schedule_form = ref<Schedule>(JSON.parse(JSON.stringify(schedules.value.find((s: Schedule) => s.id === Number(route.query.id)) as Schedule)))

if (schedule_form.value === undefined) {
  ElMessage.warning('该任务不存在')
  router.back()
}
const schedule_form_rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'change' },
  ],
  cron: [
    { required: true, message: '请输入 cron', trigger: 'change' },
  ],
  callback_type: [
    { required: true, message: '请输入任务执行类型', trigger: 'change' },
  ],
  callback: [
    { validator: validateCallback, trigger: 'change' },
  ],
}
const calendarDrawer = ref(false)
const stepActive = ref(0)
const cron = ref<any>(JSON.parse(JSON.stringify(parseExpression(schedule_form.value.cron).fields)))

function handleSaveUpdateSchedule() {
  updateFormRef.value && updateFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const index = schedules.value.findIndex((item: Schedule) => item.id === schedule_form.value.id)

      stopSchedule(schedules.value[index])

      schedules.value[index] = generateSchedule(schedule_form.value)
      ElMessage.success({ message: '保存成功' })

      setTimeout(handleRouterBack, 1000)
    }
  })
}
function handleRouterBack() {
  router.back()
}

function handleNextStep() {
  stepActive.value = stepActive.value + 1
}
function handleBackStep() {
  stepActive.value = stepActive.value - 1
}
function handleFinishStep() {
  for (const key in cron.value) {
    if (cron.value[key].length === 0)
      cron.value[key] = CRON.value[key]
  }
  schedule_form.value.cron = fieldsToExpression(cron.value).stringify()
  stepActive.value = 5
}

function handleAddCron(type: string, value: number) {
  cron.value[type].includes(value)
    ? cron.value[type].splice(cron.value[type].indexOf(value), 1)
    : cron.value[type].push(value)
}
function handleOpenDrawer() {
  calendarDrawer.value = true
}
function handleCloseDrawer() {
  drawerRef.value.handleClose()
}
function validateCallback(rule: any, value: any, callback: any) {
  if (schedule_form.value.callback_type === 'open-external') {
    if (value === '')
      callback(new Error('请输入打开网址'))

    else if (!/^(https?|ftp):\/\/([\-A-Za-z0-9+&@#/%?=~_|!:,.;]+[\.])+([A-Za-z]{2,4}[0-9]{1,3}|[A-Za-z]{2,4}|[0-9]{1,3})$/.test(value))
      callback(new Error('请输入正确的网址'))

    else
      callback()
  }
  else {
    callback()
  }
}
function clickPresuppose(type: string, value: any[]) {
  cron.value[type] = value
}
</script>

<template>
  <el-form ref="updateFormRef" :model="schedule_form" :rules="schedule_form_rules" label-width="80px" :inline="false">
    <el-form-item label="标题" prop="title">
      <el-input v-model="schedule_form.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item prop="cron">
      <template #label>
        <el-popover placement="top-start" trigger="hover">
          <el-link
            type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html"
            target="_blank"
          >
            查看 cron 规则
          </el-link>
          <template #reference>
            <span>cron</span>
          </template>
        </el-popover>
      </template>
      <el-space direction="vertical" :fill="true" w-full>
        <el-input v-model="schedule_form.cron" placeholder="请输入cron, 例如: */10 * * * * *" @focus="handleOpenDrawer" />
        <el-alert type="info" show-icon :closable="false">
          <template #title>
            <div>
              查看 <el-link
                type="primary" :underline="false" href="http://blog.ilstudy.vip/blogs/others/cron-rules.html"
                target="_blank"
              >
                cron 规则
              </el-link>
            </div>
          </template>
        </el-alert>
      </el-space>
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" />
    </el-form-item>
    <el-form-item label="任务类型" prop="status">
      <el-select v-model="schedule_form.callback_type" placeholder="选择任务类型">
        <el-option v-for="item in CallbackMap" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="schedule_form.callback_type === 'directive'" label="指令内容" prop="directive">
      <el-input v-model="schedule_form.directive" :autosize="{ minRows: 5 }" type="textarea" :placeholder="HINTS.schedule.directive" />
    </el-form-item>
    <el-form-item v-else label="执行内容" prop="callback">
      <el-input v-model="schedule_form.callback" :autosize="{ minRows: 5 }" type="textarea" placeholder="请输入执行内容" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSaveUpdateSchedule">
        保存修改
      </el-button>
      <el-button type="warning" @click="handleRouterBack">
        放弃修改
      </el-button>
    </el-form-item>
  </el-form>

  <el-drawer ref="drawerRef" v-model="calendarDrawer" @close="calendarDrawer = false">
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="月份" @click="stepActive = 0" />
      <el-step title="天" @click="stepActive = 1" />
      <el-step title="周" @click="stepActive = 2" />
      <el-step title="小时" @click="stepActive = 3" />
      <el-step title="分钟" @click="stepActive = 4" />
    </el-steps>
    <div class="step-group">
      <Transition mode="out-in" name="bounce">
        <div v-if="stepActive === 0" class="step-item" :class="`step-${stepActive}`">
          <div class="month">
            <div
              v-for="item in MonthMap" :key="item.value" class="month-deatil" m-1 h-3em
              flex="~ row gap-1 wrap justify-between" w-full px-5 lh-3em border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.month.includes(item.value),
              }" @click="handleAddCron('month', item.value)"
            >
              <span>{{ item.CN }}</span>
              <span>{{ item.En }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 1" class="step-item" :class="`step-${stepActive}`">
          <div class="month" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 31" :key="item" class="month-day" m-1 h-5em w-5.5ch text-center text-1em lh-5em
              border="1px #EBEEF5 dark:#363637 solid" :class="{ 'is-selected': cron.dayOfMonth.includes(item) }"
              @click="handleAddCron('dayOfMonth', item)"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 2" class="step-item" :class="`step-${stepActive}`">
          <div class="week" m-1>
            <div class="presuppose" mb-2>
              <el-button v-for="item, index in dayOfWeek" :key="index" @click="clickPresuppose('dayOfWeek', item.value)">
                {{ item.label }}
              </el-button>
            </div>
            <div
              v-for="item, index in WeekMap" :key="index" class="week-day" flex="~ row gap-1 wrap justify-between"
              h-3em w-full px-5 lh-3em border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.dayOfWeek.includes(item.value),
              }" @click="handleAddCron('dayOfWeek', item.value)"
            >
              <span>{{ item.CN }}</span>
              <span>{{ item.En }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 3" class="step-item" :class="`step-${stepActive}`">
          <div class="hour" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 24" :key="item" class="hour-deatil" m-1 h-5em w-5.5ch text-center lh-5em
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.hour.includes(item - 1),
              }" @click="handleAddCron('hour', item - 1)"
            >
              <span>{{ item - 1 }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 4" class="step-item" :class="`step-${stepActive}`">
          <div class="minute" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 60" :key="item" class="minute-deatil" m-1 h-5em w-5.5ch text-center lh-5em
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.minute.includes(item - 1),
              }" @click="handleAddCron('minute', item - 1)"
            >
              <span>{{ item - 1 }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 5" class="step-item success" :class="`step-${stepActive}`">
          <el-result icon="success" title="cron 创建成功" :sub-title="schedule_form.cron">
            <template #extra>
              <el-button type="default" @click="handleCloseDrawer">
                关闭
              </el-button>
            </template>
          </el-result>
        </div>
      </Transition>
    </div>
    <template #footer>
      <div flex="~ row gap-2" mt-10px justify-center>
        <el-button v-if="stepActive > 0 && stepActive <= 4" type="info" plain @click="handleBackStep">
          上一步
        </el-button>
        <el-button v-if="stepActive < 4" type="primary" plain @click="handleNextStep">
          下一步
        </el-button>
        <el-button v-else-if="stepActive === 4" type="success" plain @click="handleFinishStep">
          生成 cron
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="postcss">
.month-day,
.week-day,
.month-deatil,
.hour-deatil,
.minute-deatil {
  user-select: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    --at-apply: dark:bg-gray-5 dark:text-gray-300;
    --at-apply: bg-gray-200 text-gray-5;
  }

  &.is-selected {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-8);
  }

}

.step-item {
  display: block;
  --at-apply: w-full;
}

.el-step__head,
.el-step__title {
  &.is-process {
    color: var(--el-color-primary);

    .is-text {
      border: 2px var(--el-color-primary) solid;
    }
  }
}

.bounce-leave-active {
  --at-apply: animate-bounce-out-right animate-duration-200;
}
</style>
