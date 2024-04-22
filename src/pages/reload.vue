<route lang="yaml">
meta:
  title: reload
  hidden: true
</route>

<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.back()
  }, 500)
})
const theme_color = ref('#409eff')
</script>

<template>
  <div class="reload" h-10em w-10em>
    <svg h-full w-full xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <rect width="2.8" height="12" x="1" y="6" :fill="theme_color">
        <animate
          attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"
        />
        <animate
          attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"
        />
      </rect>
      <rect width="2.8" height="12" x="5.8" y="6" :fill="theme_color">
        <animate
          attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"
        />
        <animate
          attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"
        />
      </rect>
      <rect width="2.8" height="12" x="10.6" y="6" :fill="theme_color">
        <animate
          id="svgSpinnersBarsScaleMiddle0" attributeName="y" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"
        />
        <animate
          attributeName="height" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"
        />
      </rect>
      <rect width="2.8" height="12" x="15.4" y="6" :fill="theme_color">
        <animate
          attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"
        />
        <animate
          attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"
        />
      </rect>
      <rect width="2.8" height="12" x="20.2" y="6" :fill="theme_color">
        <animate
          id="svgSpinnersBarsScaleMiddle1" attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"
        />
        <animate
          attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"
        />
      </rect>
    </svg>
  </div>
</template>

<style>
.reload{
  position: fixed;
  top: calc(50% - 5em);
  left: calc(50% - 5em);
}
</style>
