<script setup lang="ts">
import useI18nStore from '~/store/I18n'
import { messages } from '~/I18n'

const i18nStore = useI18nStore()
const locale = computed(() => i18nStore.locale === 'en' ? messages.en : messages.zh)
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
