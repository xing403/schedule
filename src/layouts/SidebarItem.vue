<script setup lang="ts">
defineProps<{
  route: MenuItem
}>()
</script>

<template>
  <el-menu-item v-if="route.children?.length === 1" :index="route.children[0].path">
    <el-icon v-if="route.children[0].meta?.icon">
      <div :class="route.children[0].meta?.icon" />
    </el-icon>
    <template #title>
      {{ route.children[0].meta?.title ?? route.children[0].name ?? '未命名' }}
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="route.children?.length >= 2" :index="route.path">
    <el-icon>
      <div :class="route.meta?.icon" />
    </el-icon>
    <template #title>
      {{ route.meta?.title ?? route.name ?? '未命名' }}
    </template>
    <sidebar-item v-for="r in route.children" :key="r.name" :route="r" />
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <el-icon v-if="route.meta?.icon">
      <div :class="route.meta?.icon" />
    </el-icon>
    <template #title>
      {{ route.children?.length }}
      {{ route.meta?.title ?? route.name ?? '未命名' }}
    </template>
  </el-menu-item>
</template>
