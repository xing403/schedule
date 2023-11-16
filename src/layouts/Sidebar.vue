<script setup lang="ts">
import routes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'

const menu = ref<MenuItem>({
  name: 'root',
  path: '',
  redirect: '/',
  children: [],
})
const router = useRouter()
function buildTree() {
  routes.filter(route => !route.meta?.hidden).map(async (route: RouteRecordRaw) => {
    await pathToTree(route.path.split('/').filter(path => path !== ''), route, menu.value)
  })
}
async function pathToTree(path: string[], route: RouteRecordRaw, root: MenuItem, startIndex = 0) {
  const child = root.children.find(child => child.name === path[startIndex])
  if (!path[startIndex] || startIndex + 1 >= path.length) {
    root.children.push(route)
  }
  else if (child) {
    pathToTree(path, route, child as MenuItem, startIndex + 1)
  }
  else {
    const node: MenuItem = {
      name: path[startIndex],
      path: `/${path.slice(0, startIndex + 1).join('/')}`,
      children: [],
    }
    root.children.push(node)
    pathToTree(path, route, node, startIndex + 1)
  }
  root.children.sort((a, b) => a.name > b.name ? 1 : -1)
}

onMounted(() => {
  buildTree()
})
</script>

<template>
  <el-menu class="el-menu-vertical" :collapse="menuCollapse" router :default-active="router.currentRoute.value.path">
    <template v-for="route in menu.children" :key="route">
      <sidebar-item :route="route" />
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
