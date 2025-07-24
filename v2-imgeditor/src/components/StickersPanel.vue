<script setup>
import { ref } from 'vue'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import data from 'emoji-mart-vue-fast/data/all.json'
import { useImageEditorStore } from '@/stores/editor'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

const store = useImageEditorStore()

const emojiPickerSelected = ref(false)
const emojiIndex = new EmojiIndex(data)

function toggle() {
  emojiPickerSelected.value = !emojiPickerSelected.value
}

function onSelect(emoji) {
  store.addSticker(emoji.native) // instead of URL
}
</script>

<template>
  <div class="!my-5">
    Stickers :
    <button @click="toggle" class="border bg-amber-300">Click me</button>
    <Picker
      v-if="emojiPickerSelected"
      :data="emojiIndex"
      title="Pick your emoji…"
      emoji="point_up"
      @select="onSelect"
    />
  </div>
</template>
