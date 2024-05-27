<script lang="ts" setup>
import type { UploadFile } from 'element-plus'
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
const form = ref<DirectiveType>({ ...props.form })
const topics = ref<string[]>(mqttStore.subscribe_topics)
const args = ref<DirectiveParam>({})
onMounted(() => {
  if (props.newDirective) {
    form.value = {
      alias: '',
      support: [],
      key: '',
      args: {},
    }
  }
  else {
    if (form.value.key === 'mqtt')
      args.value.topics = form.value.args.topics
    if (form.value.key === 'music')
      args.value.musicUrl = form.value.args.musicUrl
    if (form.value.key === 'open-external')
      args.value.url = form.value.args.url
  }
})
function handleChangeDirectiveKey(key: string) {
  form.value.args = {}
  form.value.key = key
}

function confirm() {
  if (form.value.key === 'mqtt')
    form.value.args.topics = args.value.topics

  emits('confirm', form.value)
}

function cancel() {
  emits('cancel')
}
function handleChangeFile(file: UploadFile) {
  if (file.raw && form.value.key === 'music') {
    form.value.args.musicUrl = file.raw.path
    args.value.musicUrl = file.raw.path
  }
}
</script>

<template>
  <el-form :model="form" label-position="top" :inline="false">
    <el-form-item :label="$t('flexible', { flexible: ['select', 'directives'] })">
      <el-select v-model="form.key" placeholder="选择指令" clearable filterable :disabled="props.disabled" w-full>
        <el-option
          v-for="item in DIRECTIVE_MAP" :key="item.key" :label="item.name ?? item.key" :value="item.key"
          @change="handleChangeDirectiveKey"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('alias')" prop="alias">
      <el-input v-model="form.alias" placeholder="指令描述" :disabled="props.disabled" />
    </el-form-item>

    <template v-if="form.key === 'mqtt'">
      <el-form-item prop="args.topics" label="订阅主题">
        <el-select
          v-model="args.topics" :max-collapse-tags="2"
          filterable collapse-tags allow-create collapse-tags-tooltip multiple default-first-option w-full placeholder="选择需要的主题"
        >
          <el-option v-for="t in topics" :key="t" :label="t" :value="t" />
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
      <el-form-item prop="args.format" :label="$t('format')">
        <el-input v-model="form.args.format" placeholder="时间格式(默认: YYYY-MM-DD HH:mm:ss)" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'tts'">
      <el-form-item prop="args.text" :label="$t('text')">
        <el-input v-model="form.args.text" placeholder="发送文本($1 为占位符)" :disabled="props.disabled" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'open-external'">
      <el-form-item prop="args.url" :label="$t('link')">
        <el-input v-model="form.args.url" placeholder="链接地址" :disabled="props.disabled" />
        <el-alert :title="args.url" type="info" show-icon :closable="false" />
      </el-form-item>
    </template>

    <template v-else-if="form.key === 'music'">
      <el-form-item prop="args.musicUrl" :label="$t('link')">
        <el-upload
          v-if="props.disabled === false" drag action="" :auto-upload="false" w-full :show-file-list="false"
          :on-change="handleChangeFile"
        >
          <div class="el-upload__text">
            点击或者将文件拖拽到这里
          </div>
        </el-upload>
        <el-alert :title="args.musicUrl" type="info" show-icon :closable="false" />
      </el-form-item>
    </template>

    <el-form-item v-if="!props.disabled" prop="button" label=" ">
      <el-button type="primary" @click="confirm" v-text="$t('confirm')" />
      <el-button type="default" size="default" @click="cancel" v-text="$t('cancel')" />
    </el-form-item>
  </el-form>
</template>
