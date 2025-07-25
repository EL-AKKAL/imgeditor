<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import EditorCanvas from '@/components/EditorCanvas.vue'
import FiltersPanel from '@/components/FiltersPanel.vue'
// @ts-ignore
import StickersPanel from '@/components/StickersPanel.vue'
</script>

<template>
  <main>
    <div class="bg-white rounded-lg shadow-sm !px-8 !py-5">
      <h2 class="text-2xl !mb-5">My Images Editor</h2>
      <div class="grid grid-cols-2 gap-5 xs:grid-cols-1">
        <FiltersPanel />
        <EditorCanvas />
      </div>
      <StickersPanel />
      <Toolbar />
    </div>
  </main>
</template>
