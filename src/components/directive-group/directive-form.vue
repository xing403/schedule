<script lang="ts" setup>
import DIRECTIVE_MAP from '~/composables/directives'

const props = withDefaults(defineProps<{
  form?: any
  newDirective?: boolean
  disabled?: boolean
}>(), {
  form: {
    alias: '',
    key: '',
    args: {},
  },
  newDirective: false,
})

const emits = defineEmits(['confirm', 'cancel'])

const form = ref({ ...props.form })

onMounted(() => {
  if (props.newDirective) {
    form.value = {
      alias: '',
      key: '',
      args: {},
    }
  }
})
function handleChangeDirectiveKey(key: string) {
  form.value.args = {}
  form.value.key = key
}
function confirm() {
  emits('confirm', form.value)
}
function cancel() {
  emits('cancel')
}
</script>

<template>
  <el-form :model="form" label-width="120px" :inline="false">
    <el-form-item label="选择指令">
      <el-select v-model="form.key" placeholder="选择指令" clearable filterable :disabled="props.disabled">
        <el-option
          v-for="item in DIRECTIVE_MAP" :key="item.key" :label="item.key" :value="item.key"
          @change="handleChangeDirectiveKey"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="别称" prop="name">
      <el-input v-model="form.alias" placeholder="指令描述" :disabled="props.disabled" />
    </el-form-item>

    <el-form-item v-if="form.key === 'mqtt'" prop="message" label="消息">
      <el-input v-model="form.args.message" placeholder="发送消息" :disabled="props.disabled" />
    </el-form-item>

    <el-form-item v-else-if="form.key === 'notification'" prop="message" label="消息">
      <el-input v-model="form.args.message" placeholder="发送消息" :disabled="props.disabled" />
    </el-form-item>

    <el-form-item v-else-if="form.key === 'date-time'" prop="format" label="格式">
      <el-input v-model="form.args.format" placeholder="时间格式(默认: YYYY-MM-DD HH:mm:ss)" :disabled="props.disabled" />
    </el-form-item>

    <el-form-item v-else-if="form.key === 'tts'" prop="text" label="文本">
      <el-input v-model="form.args.text" placeholder="发送文本($1 为占位符)" :disabled="props.disabled" />
    </el-form-item>

    <el-form-item v-if="!props.disabled" prop="button" label=" ">
      <el-button type="primary" @click="confirm" v-text="'确定'" />
      <el-button type="default" size="default" @click="cancel" v-text="'取消'" />
    </el-form-item>
  </el-form>
</template>
