<route lang="yaml">
meta:
  title: 悬浮窗
  icon: i-carbon-ai-status-in-progress
  hidden: true
  layout: false
</route>

<script setup lang="ts">
import Logo from '~/assets/images/256x256.png'

const suspended = ref <HTMLElement>()
const active = ref(false)
const x = ref(0)
const y = ref(0)
const hasMove = ref(false)
function handleMouseDown(_event: MouseEvent) {
  active.value = true
  hasMove.value = false
  x.value = _event.clientX
  y.value = _event.clientY
}
function handleContextMenu(_event: MouseEvent) {
  _event.preventDefault()
}
function handleMouseMove(_event: MouseEvent) {
  if (active.value && platform.value === 'electron') {
    window.Electron.command('moveSuspended', {
      x: _event.clientX - x.value,
      y: _event.clientY - y.value,
    })
  }
  if (!hasMove.value)
    hasMove.value = Math.abs(_event.clientX - x.value) + Math.abs(_event.clientY - y.value) !== 0
}
function handleMouseUp(_event: MouseEvent) {
  active.value = false
}

function handleMouseClick() {
  if (!hasMove.value && platform.value === 'electron')
    window.Electron.command('openMainWindow')
}
</script>

<template>
  <div
    ref="suspended"
    class="suspended"
    border-rd="50%" h-50px w-50px
    :style="{ background: `url(${Logo}) transparent no-repeat center center`, backgroundSize: '100%' }"

    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @click="handleMouseClick"
    @mouseleave="active = false"
    @contextmenu="handleContextMenu"
  />
</template>

<style lang="postcss">
.suspended{
  cursor: pointer;
}
html.dark{
  background: transparent;
}
</style>
