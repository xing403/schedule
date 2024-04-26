<script setup lang="ts">
import useI18nStore from '~/store/I18n'

withDefaults(defineProps<{
  type?: 'icon' | 'select'
}>(), {
  type: 'icon',
})
const i18nStore = useI18nStore()
const items = [{
  title: '中文简体',
  command: 'zh-cn',
}, {
  title: 'English',
  command: 'en',
}]
function handleChangeLang(cmd: string) {
  i18nStore.changeLocale(cmd)
}
</script>

<template>
  <div w-12em>
    <el-dropdown v-if="type === 'icon'" trigger="click" @command="handleChangeLang">
      <svg-icon name="carbon:language" size="1.5em" icon-hover />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in items" :key="item.command" :command="item.command">
            <el-text :type="item.command === i18nStore.locale ? 'primary' : ''">
              {{ item.title }}
            </el-text>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-select v-else v-model="i18nStore.locale" fit-input-width @change="handleChangeLang">
      <el-option v-for="item in items" :key="item.command" :label="item.title" :value="item.command" />
    </el-select>
  </div>
</template>
