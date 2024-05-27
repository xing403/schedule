<script setup lang="ts">
import 'xgplayer/dist/index.min.css'
import 'xgplayer-music/dist/index.min.css'
import Player, { Events } from 'xgplayer'
import { dayjs } from 'element-plus'
import { Analyze } from 'xgplayer-music'
import useMusicStore from '~/store/music'

const timestamp = useTimestamp()
const formatTimestamp = computed(() => dayjs(timestamp.value).format('HH:mm:ss'))
const musicStore = useMusicStore()
const isInit = ref(false)
const player = ref<Player>()
const analyzeRef = ref<HTMLElement>()
const analyze = ref()
function handleCloseDrawer() {
  musicStore.start = false
  player.value && player.value.destroy()
  isInit.value = false
}
function initAudioPlayer() {
  player.value = new Player({
    id: 'mse',
    mediaType: 'audio',
    volume: 1,
    height: 0,
    width: '100%',
    url: musicStore.url,
    autoplayMuted: false,
    autoplay: true,
    videoConfig: {
      crossOrigin: 'anonymous', // 允许跨域
    },
  })
  player.value.on(Events.ENDED, handleCloseDrawer)
}
function initAnalyze() {
  analyze.value = new Analyze(player.value, analyzeRef.value as HTMLElement, {
    stroke: 100,
    colors: ['#F56C6C', '#E6A23C', '#67C23A', '#409eff'],
  })
}
watchEffect(() => {
  if (musicStore.start && !isInit.value) {
    nextTick(() => {
      initAudioPlayer()
      initAnalyze()
      isInit.value = true
    })
  }
})
</script>

<template>
  <el-drawer
    v-model="musicStore.start" :with-header="false" direction="btt" size="auto" :show-close="false"
    :before-close="handleCloseDrawer" :close-on-click-modal="false" destroy-on-close :close-delay="200" append-to-body
  >
    <div position-relative>
      <canvas ref="analyzeRef" class="analyze" h-400px w-full />
      <div position-absolute top-0 w-full text-center>
        <div h-300px cursor-pointer select-none text-6xl font-bold lh-300px>
          {{ formatTimestamp }}
        </div>
        <div>
          <el-button @click="handleCloseDrawer">
            关闭
          </el-button>
        </div>
      </div>

      <div id="mse" />
    </div>
  </el-drawer>
</template>
