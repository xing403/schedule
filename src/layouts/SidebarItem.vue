<script setup lang="ts">
defineProps<{
  route: MenuItem
}>()
</script>

<template>
  <el-menu-item v-if="route.children?.length === 1" :index="route.children[0].path">
    <el-icon>
      <div :class="route.children[0].meta?.icon" />
    </el-icon>
    <template #title>
      <span>{{ route.children[0].meta?.title ?? route.children[0].name ?? '未命名' }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="route.children?.length >= 2" :index="route.path">
    <template #title>
      <el-icon>
        <div :class="route.meta?.icon" />
      </el-icon>
      <span>{{ route.meta?.title ?? route.name ?? '未命名' }}</span>
    </template>
    <sidebar-item v-for="r in route.children" :key="r.name" :route="r" />
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <el-icon>
      <div :class="route.meta?.icon" />
    </el-icon>
    <template #title>
      <span>{{ route.meta?.title ?? route.name ?? '未命名' }}</span>
    </template>
  </el-menu-item>
</template>
