<route lang="yaml">
meta:
  title: 关于
  icon: i-carbon-information
  hidden: true
  layout: false
</route>

<script setup lang="ts">
function handleFeedback() {
  if (window.navigator.language === 'zh-CN')
    openExternal('https://gitee.com/xing403/schedule/issues')
  else
    openExternal(`${PkgJson.repository.url}/issues`)
}
</script>

<template>
  <div flex="~ col gap-2" ma max-w-500px overflow-hidden text-center>
    <div mt-15>
      <el-image bg-transparent :src="favicon_path" :size="150" shape="square" />
    </div>
    <el-divider border-style="dashed" />
    <div class="name" mt-5 text-4xl font-600 v-text="name" />
    <div class="version" text-2xl v-text="`version: ${version}`" />
    <div class="author" mt-5 text-2xl v-text="author.name" />
    <div class="description" mt-5 text-xl v-text="description" />
    <div mt-5>
      <el-button @click="handleFeedback">
        Feedback
      </el-button>
    </div>
  </div>
</template>
