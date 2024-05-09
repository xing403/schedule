<route lang="yaml">
meta:
  title: 悬浮球
  icon: i-carbon-ai-status-in-progress
  hidden: true
  layout: false
</route>

<script setup lang="ts">
import Logo from '~/assets/images/256x256.png'

const active = ref(false)
const x = ref(0)
const y = ref(0)

function handleMouseDown(event: MouseEvent) {
  active.value = true
  x.value = event.clientX
  y.value = event.clientY
  document.addEventListener('mousemove', handleMouseMove)
}
function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
}
function handleMouseMove(event: MouseEvent) {
  if (active.value && platform.value === 'electron') {
    window.Electron.moveFloatBall({
      x: event.clientX - x.value,
      y: event.clientY - y.value,
    })
  }
}
function handleMouseUp() {
  active.value = false
  document.removeEventListener('mousemove', handleMouseMove)
}

function handleMouseClick() {
  if (platform.value === 'electron')
    window.Electron.openMainWindow()
}
onMounted(() => {
})
</script>

<template>
  <div
    :style="{ background: `url(${Logo})`, backgroundSize: 'cover' }" class="suspended" @mousedown="handleMouseDown"
    @dblclick="handleMouseClick" @mouseup="handleMouseUp" @contextmenu="handleContextMenu"
  />
</template>

<style lang="postcss">
.suspended {
  @apply h-50px w-50px border-rd-8px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

html,
body,
.dark {
  background: transparent !important;
}
</style>
