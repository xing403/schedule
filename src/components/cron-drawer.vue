<script setup lang="ts">
import { ElLoading, type FormInstance, type FormRules } from 'element-plus'

const props = withDefaults(defineProps<{
  cron: string
  disabled?: boolean
}>(), {
  disabled: false,
})
const emits = defineEmits(['update:cron', 'close', 'success', 'cancel'])
const form = ref<FormInstance>()
const currentField = ref<string>('')
const cron = ref<any>({
  hour: [],
  minute: [],
  dayOfWeek: [],
  dayOfMonth: [],
  month: [],
  second: [0],
})

const rules = reactive<FormRules<any>>({
  month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
  dayOfMonth: [{ required: true, message: '请求选择月份的第几天', trigger: 'blur' }],
  dayOfWeek: [{ required: true, message: '请选择星期几', trigger: 'blur' }],
  hour: [{ required: true, message: '请选择小时', trigger: 'blur' }],
  minute: [{ required: true, message: '请选择分钟', trigger: 'blur' }],
})

const option = ref<any>({
  monthQuickSelection: Array<string>(),

  dayOfMonthQuickSelection: Array<string>(),

  dayOfWeekQuickSelection: Array<string>(),

  hourQuickSelection: Array<string>(),

  minuteQuickSelection: Array<string>(),
})

function handleQuickChange(item: any, key: string, quickKey: string) {
  if (option.value[quickKey].includes(item.key as string)) { // checked
    item.value.forEach((e: number) => {
      if (!cron.value[key].includes(e))
        cron.value[key].push(e)
    })
  }
  else {
    item.value.forEach((e: number) => {
      if (cron.value[key].includes(e))
        cron.value[key].splice(cron.value[key].indexOf(e), 1)
    })
  }
}
function checkQuickSelection(Cron: any, quickSelection: Array<any>, cronKey: string, quickKey: string) {
  quickSelection.forEach((item) => {
    const [num, len] = checkIndeterminate(Cron[cronKey], item.value)
    if (num === len && !option.value[quickKey].includes(item.key))
      option.value[quickKey].push(item.key)

    else if (num !== len && option.value[quickKey].includes(item.key))
      option.value[quickKey].splice(option.value[quickKey].indexOf(item.key), 1)

    if (num === 0 && option.value[quickKey].includes(item.key))
      option.value[quickKey].splice(option.value[quickKey].indexOf(item.key), 1)
  })
}
function handleCreateCron() {
  const loading = ElLoading.service({ lock: true, text: 'Loading', fullscreen: true })
  form.value?.validate((valid: boolean) => {
    if (valid) {
      const c = fieldsToExpression(cron.value).stringify()
      emits('update:cron', c)
      setTimeout(() => {
        loading.close()
        emits('success')
      }, 1000)
    }
  })
}
function handleCancelCron() {
  form.value && form.value.resetFields()

  checkQuickSelection(cron.value, monthQuickSelection, 'month', 'monthQuickSelection')
  checkQuickSelection(cron.value, dayOfMonthQuickSelection, 'dayOfMonth', 'dayOfMonthQuickSelection')
  checkQuickSelection(cron.value, dayOfWeekQuickSelection, 'dayOfWeek', 'dayOfWeekQuickSelection')
  checkQuickSelection(cron.value, hourQuickSelection, 'hour', 'hourQuickSelection')
  checkQuickSelection(cron.value, minuteQuickSelection, 'minute', 'minuteQuickSelection')
}

function checkIndeterminateStatus<T>(source: Array<T>, target: Array<T>) {
  const [num, len] = checkIndeterminate(source, target)
  return num < len && num > 0
}
function checkIndeterminate<T>(source: Array<T>, target: Array<T>) {
  const num = source.reduce((pre, item) => target.includes(item) ? pre + 1 : pre, 0)
  return [num, target.length]
}

watchDeep(cron.value, (val: any) => {
  switch (currentField.value) {
    case 'month':
      checkQuickSelection(val, monthQuickSelection, 'month', 'monthQuickSelection')
      break
    case 'dayOfMonth':
      checkQuickSelection(val, dayOfMonthQuickSelection, 'dayOfMonth', 'dayOfMonthQuickSelection')
      break
    case 'dayOfWeek':
      checkQuickSelection(val, dayOfWeekQuickSelection, 'dayOfWeek', 'dayOfWeekQuickSelection')
      break
    case 'hour':
      checkQuickSelection(val, hourQuickSelection, 'hour', 'hourQuickSelection')
      break
    case 'minute':
      checkQuickSelection(val, minuteQuickSelection, 'minute', 'minuteQuickSelection')
      break
  }
})

onMounted(() => {
  nextTick(() => {
    if (props.cron !== '') {
      cron.value = Object.assign(cron.value, JSON.parse(JSON.stringify(parseExpression(props.cron).fields)))
      if (cron.value.dayOfWeek.includes(7))
        cron.value.dayOfWeek.splice(cron.value.dayOfWeek.indexOf(7), 1)

      checkQuickSelection(cron.value, monthQuickSelection, 'month', 'monthQuickSelection')
      checkQuickSelection(cron.value, dayOfMonthQuickSelection, 'dayOfMonth', 'dayOfMonthQuickSelection')
      checkQuickSelection(cron.value, dayOfWeekQuickSelection, 'dayOfWeek', 'dayOfWeekQuickSelection')
      checkQuickSelection(cron.value, hourQuickSelection, 'hour', 'hourQuickSelection')
      checkQuickSelection(cron.value, minuteQuickSelection, 'minute', 'minuteQuickSelection')
    }
  })
})
</script>

<template>
  <div flex="~ col" h-full>
    <el-form ref="form" :model="cron" :rules="rules" h-full w-full label-position="top" require-asterisk-position="right">
      <el-form-item :label="$t('month')" prop="month">
        <el-select
          v-model="cron.month" placeholder="选择月份" :max-collapse-tags="4" collapse-tags clearable multiple w-full
          :disabled="props.disabled" @focus="currentField = 'month'" @blur="currentField = ''"
        >
          <template v-if="!props.disabled" #header>
            <el-checkbox-group v-model="option.monthQuickSelection">
              <el-checkbox
                v-for="item in monthQuickSelection" :key="item.key"
                :indeterminate="checkIndeterminateStatus(cron.month, item.value)" :value="item.key"
                :label="item.label"
                @change="handleQuickChange(item, 'month', 'monthQuickSelection')"
              />
            </el-checkbox-group>
          </template>
          <el-option v-for="item in MonthMap" :key="item" :label="$t(`el.datepicker.month${item}`)" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('day')" prop="dayOfMonth">
        <el-select
          v-model="cron.dayOfMonth" placeholder="选择月份的第几天" collapse-tags :max-collapse-tags="4" multiple
          clearable w-full :disabled="props.disabled" @focus="currentField = 'dayOfMonth'" @blur="currentField = ''"
        >
          <template v-if="!props.disabled" #header>
            <el-checkbox-group v-model="option.dayOfMonthQuickSelection">
              <el-checkbox
                v-for="item in dayOfMonthQuickSelection" :key="item.key"
                :indeterminate="checkIndeterminateStatus(cron.dayOfMonth, item.value)" :value="item.key"
                :label="item.label"
                @change="handleQuickChange(item, 'dayOfMonth', 'dayOfMonthQuickSelection')"
              />
            </el-checkbox-group>
          </template>
          <el-option v-for="item in DayOfMonthMap" :key="item.value" :label="item.CN" :value="item.value">
            <span style="float: left" v-text="item.CN" />
            <span style="float: right; color: var(--el-text-color-secondary);font-size: 13px;" v-text="item.En" />
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('week')" prop="dayOfWeek">
        <el-select
          v-model="cron.dayOfWeek" placeholder="选择星期几" collapse-tags :max-collapse-tags="4" multiple clearable
          w-full :disabled="props.disabled" @focus="currentField = 'dayOfWeek'" @blur="currentField = ''"
        >
          <template v-if="!props.disabled" #header>
            <el-checkbox-group v-model="option.dayOfWeekQuickSelection">
              <el-checkbox
                v-for="item in dayOfWeekQuickSelection" :key="item.key"
                :indeterminate="checkIndeterminateStatus(cron.dayOfWeek, item.value)" :value="item.key"
                :label="item.label"
                @change="handleQuickChange(item, 'dayOfWeek', 'dayOfWeekQuickSelection')"
              />
            </el-checkbox-group>
          </template>
          <el-option v-for="item, index in WeekMap" :key="item" :label="$t(`el.datepicker.weeks.${item}`)" :value="index" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('hour')" prop="hour">
        <el-select
          v-model="cron.hour" placeholder="选择小时" collapse-tags :max-collapse-tags="4" multiple clearable w-full
          :disabled="props.disabled" @focus="currentField = 'hour'" @blur="currentField = ''"
        >
          <template v-if="!props.disabled" #header>
            <el-checkbox-group v-model="option.hourQuickSelection">
              <el-checkbox
                v-for="item in hourQuickSelection" :key="item.key"
                :indeterminate="checkIndeterminateStatus(cron.hour, item.value)" :value="item.key"
                :label="item.label"
                @change="handleQuickChange(item, 'hour', 'hourQuickSelection')"
              />
            </el-checkbox-group>
          </template>
          <el-option v-for="item in HourMap" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('minute')" prop="minute">
        <el-select
          v-model="cron.minute" placeholder="选择分钟" collapse-tags :max-collapse-tags="4" multiple clearable w-full
          :disabled="props.disabled" @focus="currentField = 'minute'" @blur="currentField = ''"
        >
          <template v-if="!props.disabled" #header>
            <el-checkbox-group v-model="option.minuteQuickSelection">
              <el-checkbox
                v-for="item in minuteQuickSelection" :key="item.key"
                :indeterminate="checkIndeterminateStatus(cron.minute, item.value)" :value="item.key"
                :label="item.label"
                @change="handleQuickChange(item, 'minute', 'minuteQuickSelection')"
              />
            </el-checkbox-group>
          </template>
          <el-option v-for="item in MinuteMap" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button v-if="!props.disabled" type="primary" @click="handleCreateCron" v-text="$t('save')" />
        <el-button v-if="!props.disabled" @click="handleCancelCron" v-text="$t('reset')" />
      </el-form-item>
    </el-form>
  </div>
</template>
