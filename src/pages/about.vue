<script setup lang="ts">
import path from 'path-browserify'

const favicon_path = path.join('favicon.svg')
</script>

<template>
  <div flex="~ col gap-2" ma mt-15 w-500px text-center>
    <div>
      <el-image bg-transparent :src="favicon_path" :size="150" shape="square" />
    </div>
    <el-divider border-style="dashed" />
    <div class="application" mt-5 text-4xl font-600>
      {{ name }}
    </div>
    <div class="version" text-2xl>
      version: {{ version }}
    </div>
    <div class="description" mt-5 text-3xl>
      {{ description }}
    </div>
    <div class="author" mt-5 text-2xl>
      {{ author.name }}
    </div>
  </div>
</template>
