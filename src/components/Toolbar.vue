<script lang="ts" setup>
import { ref } from "vue";
import { useImageEditorStore } from "@/stores/editor";

const store = useImageEditorStore();
const fileInput = ref<HTMLInputElement | null>(null);

const handleImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) store.loadImage(input.files[0]);

  if (fileInput.value) fileInput.value.value = "";
};
</script>
<template>
  <div class="flex justify-between items-center">
    <button
      class="cursor-pointer"
      @click="store.resetFilters"
      :disabled="!store.editedImage"
    >
      Reset Filters
    </button>
    <div class="flex gap-4 items-center">
      <input
        ref="fileInput"
        type="file"
        @change="handleImageUpload"
        accept="image/*"
        hidden
      />
      <button class="cursor-pointer" @click="fileInput?.click()">
        Choose Image
      </button>
      <button
        class="disabled:text-gray-400 cursor-pointer"
        @click="store.saveImage"
        :disabled="!store.editedImage"
      >
        Save Image
      </button>
    </div>
  </div>
</template>
