<script lang="ts" setup>
import DIRECTIVE_MAP from '~/composables/directives'

import useMQTTStore from '~/store/mqtt'

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
const mqttStore = useMQTTStore()
const form = ref({ ...props.form })
const topics = ref<string[]>(mqttStore.subscribe_topics)
const topic = ref<string[]>()

onMounted(() => {
  if (props.newDirective) {
    form.value = {
      alias: '',
      key: '',
      args: {},
    }
  }
  else {
    if (form.value.key === 'mqtt')
      topic.value = form.value.args.topics
  }
})
function handleChangeDirectiveKey(key: string) {
  form.value.args = {}
  form.value.key = key
}

function confirm() {
  if (form.value.key === 'mqtt')
    form.value.args.topics = topic.value

  emits('confirm', form.value)
}

function cancel() {
  emits('cancel')
}
</script>

<template>
  <el-form :model="form" label-width="120px" :inline="false">
    <el-form-item label="选择指令">
      <el-select v-model="form.key" placeholder="选择指令" clearable filterable :disabled="props.disabled" w-full>
        <el-option
          v-for="item in DIRECTIVE_MAP" :key="item.key" :label="item.name ?? item.key" :value="item.key"
          @change="handleChangeDirectiveKey"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="别称" prop="alias">
      <el-input v-model="form.alias" placeholder="指令描述" :disabled="props.disabled" />
    </el-form-item>

    <template v-if="form.key === 'mqtt'">
      <el-form-item prop="args.topics" label="订阅主题">
        <el-select
          v-model="topic"
          :max-collapse-tags="2" filterable allow-create collapse-tags collapse-tags-tooltip multiple default-first-option w-full placeholder="选择需要的主题"
        >
          <el-option v-for="topic in topics" :key="topic" :label="topic" :value="topic" />
        </el-select>
      </el-form-item>

      <el-form-item prop="args.message" label="发送消息">
        <el-input v-model="form.args.message" placeholder="发送发送消息" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-if="form.key === 'notification'">
      <el-form-item prop="args.message" label="发送消息">
        <el-input v-model="form.args.message" placeholder="发送消息" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'date-time'">
      <el-form-item prop="args.format" label="格式">
        <el-input v-model="form.args.format" placeholder="时间格式(默认: YYYY-MM-DD HH:mm:ss)" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'tts'">
      <el-form-item prop="args.text" label="文本">
        <el-input v-model="form.args.text" placeholder="发送文本($1 为占位符)" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'open-external'">
      <el-form-item prop="args.to" label="链接">
        <el-input v-model="form.args.url" placeholder="链接地址" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <el-form-item v-if="!props.disabled" prop="button" label=" ">
      <el-button type="primary" @click="confirm" v-text="'确定'" />
      <el-button type="default" size="default" @click="cancel" v-text="'取消'" />
    </el-form-item>
  </el-form>
</template>
