<script setup lang="ts">
import routes from 'virtual:generated-pages'

const router = useRouter()
</script>

<template>
  <el-menu class="el-menu-vertical" :collapse="menuCollapse" router :default-active="router.currentRoute.value.path">
    <template v-for="route in routes" :key="route">
      <el-menu-item v-show="!route?.meta?.hidden" :index="route.path">
        <el-icon><div :class="route?.meta?.icon" /></el-icon>
        <template #title>
          {{ route?.meta?.title || '未命名' }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
