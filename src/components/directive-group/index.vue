<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { ElMessage } from 'element-plus'

const props = defineProps({
  directives: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:directives', 'changed', 'addition', 'deleted'])
const directivesRef = ref<HTMLElement>()

const directives = shallowRef(props.directives)
const directive = ref<any>()

const modifyDirectiveDialog = ref(false)
const additionDirectiveDialog = ref(false)

function openModifyDialog(d: any) {
  modifyDirectiveDialog.value = true
  directive.value = d
}
useSortable(directivesRef, directives, { animation: 200 })

function addDirective() {
  additionDirectiveDialog.value = true
}
function confirm(d: any) {
  additionDirectiveDialog.value = false
  if (directives.value.find(item => item.key === d.key)) {
    ElMessage.warning('该指令已存在')
    return
  }
  directives.value.push({ ...d })
  emits('update:directives', directives.value)
  emits('changed', directives)
}
function handleModifyDirective(d: any) {
  if (directives.value.find(item => item.key === d.key) && directive.value.key !== d.key) {
    ElMessage.warning('该指令已存在')
    return
  }
  const di = directives.value.findIndex(item => item.key === directive.value.key)
  directives.value.splice(di, 1, d)

  emits('update:directives', directives.value)
  emits('changed', directives)
  modifyDirectiveDialog.value = false
}
function handleDeleteDirective(key: string) {
  const o = directives.value.find(item => item.key === key)
  directives.value = directives.value.filter(item => item.key !== key)

  emits('deleted', o)
}
</script>

<template>
  <div ref="directivesRef" class="directives-group" flex="~ col gap-2 wrap" w-full justify-start>
    <div
      v-for="item in directives" :key="item.key" class="directive-group-item" flex="~ row gap-2 items-center"
      :class="{ disabled: props.disabled }"
    >
      <el-button w-full flex-1 @click="openModifyDialog(item)">
        {{ item.alias !== '' ? `${item.alias}(${item.key})` : item.key }}
      </el-button>
      <button class="close" i-carbon-close-outline icon-btn @click="handleDeleteDirective(item.key)" />
    </div>
  </div>
  <div mt-2 w-full>
    <el-button v-if="!props.disabled" w-full @click="addDirective">
      <template #icon>
        <div i-carbon-add-large />
      </template>
      <span>添加指令</span>
    </el-button>
  </div>

  <el-dialog v-model="modifyDirectiveDialog" :title="props.disabled ? '查看指令' : '修改指令'" width="30%" align-center>
    <directive-form :form="directive" :disabled="props.disabled" @confirm="handleModifyDirective" @cancel="modifyDirectiveDialog = false" />
  </el-dialog>

  <el-dialog v-model="additionDirectiveDialog" title="添加指令" width="30%" align-center destroy-on-close>
    <directive-form new-directive @confirm="confirm" @cancel="additionDirectiveDialog = false" />
  </el-dialog>
</template>

<style lang="postcss">
.directive-group-item {
  .close {
    display: none;
  }

  &:not(.disabled):hover {
    .close {
      display: block;
    }
  }
}
</style>
