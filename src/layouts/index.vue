<script setup lang="ts">
import HeaderComponent from './Header/index.vue'
</script>

<template>
  <HeaderComponent />
  <el-main overflow-hidden>
    <RouterView v-slot="{ Component, route }">
      <transition mode="out-in" name="bounce" :duration="{ enter: 300, leave: 0 }">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </el-main>
  <Music />
</template>
