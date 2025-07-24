<script lang="ts" setup>
import { FlipVertical, RotateCcw, RotateCw, FlipHorizontal } from 'lucide-vue-next'
import { useImageEditorStore } from '@/stores/editor'

const store = useImageEditorStore()
const filterTypes = [
  'Brightness',
  'Saturation',
  'Inversion',
  'Grayscale',
  'Temperature',
  'Hue',
] as const
</script>

<template>
  <div class="panel">
    <div class="filter">
      <label for="" class="block text-sm mb-3">Filters</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="filter in filterTypes"
          :key="filter"
          class="hover:bg-[#8da2f8] hover:text-white !px-3 h-10 w-full text-sm cursor-pointer text-[#6c7570] mb-2 rounded-xs bg-white border"
          :class="{ 'text-white !bg-[#8da2f8]': store.activeFilter === filter }"
          @click="store.selectFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
      <div class="!mt-3">
        <div class="flex items-center justify-between">
          <p class="name">{{ store.activeFilter }}</p>
          <p class="value">{{ store.filterValue }}%</p>
        </div>
        <input
          class="w-full"
          type="range"
          v-model="store.filterValue"
          :min="0"
          :max="store.filterMax"
          @input="store.updateFilter"
        />
      </div>
    </div>
    <div class="!mt-3">
      <label class="block text-sm !mb-3">Rotate & Flip</label>
      <div class="grid grid-cols-4 gap-2">
        <button class="flex items-center justify-center border" @click="store.rotate('left')">
          <RotateCcw />
        </button>
        <button class="flex items-center justify-center border" @click="store.rotate('right')">
          <RotateCw />
        </button>
        <button class="flex items-center justify-center border" @click="store.rotate('vertical')">
          <FlipVertical />
        </button>
        <button
          class="flex items-center justify-center border rounded-xs"
          @click="store.rotate('horizontal')"
        >
          <FlipHorizontal />
        </button>
      </div>
    </div>
  </div>
</template>
