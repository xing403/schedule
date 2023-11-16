<template>
  <el-container text="gray-700 dark:gray-200" display="inline-block" h-full font-sans>
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main overflow-hidden>
        <RouterView v-slot="{ Component, route }">
          <transition mode="out-in" name="bounce" :duration="{ enter: 300, leave: 0 }">
            <div :key="route.path">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>
