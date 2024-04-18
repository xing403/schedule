<script setup lang="ts">
import useI18nStore from '~/store/I18n'

const i18nStore = useI18nStore()
const items = [{
  key: 'zh',
  title: '中文',
  command: 'zh',
}, {
  key: 'en',
  title: 'English',
  command: 'en',
}]
function handleChangeLang(cmd: string) {
  i18nStore.changeLocale(cmd)
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleChangeLang">
    <svg-icon name="carbon:language" size="1.5em" icon-hover />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in items" :key="item.key" :command="item.command">
          <el-text :type="item.command === i18nStore.locale ? 'primary' : 'default'">
            {{ item.title }}
          </el-text>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
