<script setup lang="ts">
import useI18nStore from '~/store/I18n'

const i18nStore = useI18nStore()
</script>

<template>
  <el-config-provider :locale="i18nStore.EPLanguage">
    <RouterView />
  </el-config-provider>
</template>
