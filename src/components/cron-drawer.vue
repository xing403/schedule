<script setup lang="ts">
const props = withDefaults(defineProps<{
  cron: string
  disabled?: boolean
}>(), {
  disabled: false,
})
const emits = defineEmits(['update:cron', 'close', 'success', 'cancel'])
const stepActive = ref(0)
const cron = ref<any>({
  hour: [],
  minute: [],
  dayOfWeek: [],
  dayOfMonth: [],
  month: [],
  second: [0],
})
function handleAddCron(type: string, value: number) {
  if (props.disabled)
    return
  cron.value[type].includes(value)
    ? cron.value[type].splice(cron.value[type].indexOf(value), 1)
    : cron.value[type].push(value)
}

function handleNextStep() {
  stepActive.value = stepActive.value + 1
}
function handleBackStep() {
  stepActive.value = stepActive.value - 1
}
function handleFinishStep() {
  if (props.disabled)
    return
  for (const key in cron.value) {
    if (cron.value[key].length === 0)
      cron.value[key] = CRON.value[key]
  }
  stepActive.value = 5
  const c = fieldsToExpression(cron.value).stringify()
  emits('update:cron', c)
  setTimeout(() => {
    emits('success', c)
  }, 1000)
}

function clickPresuppose(type: string, value: any[]) {
  if (props.disabled)
    return
  cron.value[type] = value
}
onMounted(() => {
  nextTick(() => {
    if (props.cron !== '')
      cron.value = JSON.parse(JSON.stringify(parseExpression(props.cron).fields))
  })
})
</script>

<template>
  <div flex="~ col" h-full>
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="月份" @click="stepActive = 0" />
      <el-step title="天" @click="stepActive = 1" />
      <el-step title="周" @click="stepActive = 2" />
      <el-step title="小时" @click="stepActive = 3" />
      <el-step title="分钟" @click="stepActive = 4" />
    </el-steps>
    <div class="step-group" flex-1 overflow-x-hidden overflow-y-auto>
      <Transition mode="out-in" name="bounce">
        <div v-if="stepActive === 0" class="step-item" :class="`step-${stepActive}`">
          <div class="month">
            <div
              v-for="item in MonthMap" :key="item.value" class="month-deatil" m-1 h-3em
              flex="~ row gap-1 wrap justify-between" w-full px-5 lh-3em border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.month.includes(item.value),
              }" @click="handleAddCron('month', item.value)"
            >
              <span v-text="item.CN" />
              <span v-text="item.En" />
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
              <el-button v-for="item, index in dayOfWeek" :key="index" @click="clickPresuppose('dayOfWeek', item.value)" v-text="item.label" />
            </div>
            <div
              v-for="item, index in WeekMap" :key="index" class="week-day" flex="~ row gap-1 wrap justify-between"
              h-3em w-full px-5 lh-3em border="1px #EBEEF5 dark:#363637 solid" :class="{
                'is-selected': cron.dayOfWeek.includes(item.value),
              }" @click="handleAddCron('dayOfWeek', item.value)"
            >
              <span v-text="item.CN" />
              <span v-text="item.En" />
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
          <el-result icon="success" title="cron 创建成功" :sub-title="props.cron" />
        </div>
      </Transition>
    </div>
    <div flex="~ row" mt-10px justify-center>
      <el-button v-if="stepActive > 0 && stepActive <= 4" type="info" plain @click="handleBackStep" v-text="'上一步'" />
      <el-button v-if="stepActive < 4" type="primary" plain @click="handleNextStep" v-text="'下一步'" />
      <el-button v-if="stepActive <= 4 && !props.disabled" type="success" plain @click="handleFinishStep" v-text="'生成 cron'" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
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
