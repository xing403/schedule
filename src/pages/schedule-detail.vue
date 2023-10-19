<route lang="yaml">
meta:
  title: 任务详情
  icon: i-carbon-calendar
  hidden: true
</route>

<script setup lang="ts">
import { type FormInstance } from 'element-plus'

const router = useRouter()
const route = useRoute()
const updateFormRef = ref<FormInstance>()
const drawerRef = ref()

const schedule_form = ref<Schedule>(schedules.value.find((s: Schedule) => s.id === Number(route.query.id)) as Schedule)

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
}
const calendarDrawer = ref(false)
const stepActive = ref(0)
const cron = ref<any>(JSON.parse(JSON.stringify(parseExpression(schedule_form.value.cron).fields)))

function handleRouterBack() {
  router.back()
}

function handleNextStep() {
  stepActive.value = stepActive.value + 1
}
function handleBackStep() {
  stepActive.value = stepActive.value - 1
}

function handleOpenDrawer() {
  calendarDrawer.value = true
}
</script>

<template>
  <el-form ref="updateFormRef" :model="schedule_form" :rules="schedule_form_rules" label-width="80px" :inline="false">
    <el-form-item label="标题" prop="title">
      <el-input v-model="schedule_form.title" placeholder="请输入标题" disabled />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="schedule_form.status" :active-value="true" :inactive-value="false" disabled />
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
      <el-input v-model="schedule_form.description" :rows="2" type="textarea" placeholder="请输入描述信息" disabled />
    </el-form-item>
    <el-form-item label="任务类型" prop="status">
      <el-select v-model="schedule_form.callback_type" placeholder="选择任务类型" disabled>
        <el-option v-for="item in CallbackMap" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="schedule_form.callback_type.startsWith('custom-')" label="执行内容" prop="callback">
      <el-input v-model="schedule_form.callback" :rows="5" type="textarea" placeholder="请输入执行表达式" disabled />
    </el-form-item>

    <el-form-item>
      <el-button type="info" @click="handleRouterBack">
        返回列表
      </el-button>
    </el-form-item>
  </el-form>

  <el-drawer ref="drawerRef" v-model="calendarDrawer" @close="calendarDrawer = false">
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="选择月份" />
      <el-step title="选择每月的天" />
      <el-step title="选择周" />
      <el-step title="选择小时" />
      <el-step title="选择分钟" />
    </el-steps>
    <div class="step-group">
      <Transition mode="out-in" name="bounce">
        <div v-if="stepActive === 0" class="step-item" :class="`step-${stepActive}`">
          <div class="month" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in MonthMap" :key="item.value" class="month-deatil" m-1 h-3em w-full p-2
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.month.includes(item.value),
              }"
            >
              <span>{{ item.CN }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 1" class="step-item" :class="`step-${stepActive}`">
          <div class="month" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 31" :key="item" class="month-day" m-1 h-5em w-5.5ch p-2
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.dayOfMonth.includes(item),
              }"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 2" class="step-item" :class="`step-${stepActive}`">
          <div class="week" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item, index in WeekMap" :key="index" class="week-day" m-1 h-3em w-full p-2
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.dayOfWeek.includes(item.value),
              }"
            >
              <span>{{ item.CN }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 3" class="step-item" :class="`step-${stepActive}`">
          <div class="hour" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 24" :key="item" class="hour-deatil" m-1 h-5em w-5.5ch p-2
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.hour.includes(item - 1),
              }"
            >
              <span>{{ item - 1 }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="stepActive === 4" class="step-item" :class="`step-${stepActive}`">
          <div class="minute" flex="~ row gap-1 wrap" w-full>
            <div
              v-for="item in 60" :key="item" class="minute-deatil" m-1 h-5em w-5.5ch p-2
              border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.minute.includes(item - 1),
              }"
            >
              <span>{{ item - 1 }}</span>
            </div>
          </div>
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

      &.is-selected {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-8);
      }

    }

    .step-item{
      display: block;
      --at-apply: w-full;
    }
    .el-step__head,
    .el-step__title{
      &.is-process{
        color: var(--el-color-primary);
        .is-text{
          border: 2px var(--el-color-primary) solid;
        }
      }
    }
    .bounce-leave-active{
      --at-apply: animate-bounce-out-left;
    }
    </style>
