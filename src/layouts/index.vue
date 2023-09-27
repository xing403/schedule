<template>
  <el-container font-sans text="gray-700 dark:gray-200">
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <RouterView v-slot="{ Component, route }">
          <transition name="slide">
            <div :key="route.path">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>
