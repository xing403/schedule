<script setup lang="ts">
const router = useRouter()
function reload() {
  router.push({
    name: 'reload',
  })
}
</script>

<template>
  <div class="refresh i-mdi-refresh" @click="reload()" />
</template>

<style lang="postcss">
.refresh{
  --at-apply: cursor-pointer ;
  &:hover{
    color: var(--el-color-primary)
  }
}
</style>
