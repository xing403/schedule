<script setup lang="ts">
const router = useRouter()
function reload() {
  router.push({
    name: 'reload',
  })
}
</script>

<template>
  <el-button icon="Refresh" circle @click="reload()" />
</template>
