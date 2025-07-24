<template>
  <div class="!box-border w-full min-w-80">
    <canvas v-show="store.editedImage" ref="canvas" class="w-full h-full"></canvas>
    <Placeholder v-show="!store.editedImage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useImageEditorStore } from '@/stores/editor'
import Placeholder from '@/assets/image-placeholder.svg'

const store = useImageEditorStore()
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D | null>(null)

onMounted(() => {
  if (canvas.value) ctx.value = canvas.value.getContext('2d')
  redraw()
})

watch(
  () => [
    store.brightness,
    store.saturation,
    store.inversion,
    store.grayscale,
    store.hue,
    store.temperature,
    store.rotation,
    store.horizontal,
    store.vertical,
    store.stickers,
    store.editedImage,
  ],
  redraw,
  { deep: true },
)

function redraw() {
  if (canvas.value && ctx.value) store.redrawCanvas(canvas.value, ctx.value)
}
</script>
