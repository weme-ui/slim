<script lang="ts" setup>
import { accentColors } from 'virtual:weme-ui-config'

const colors = computed(() => ['default', ...accentColors])
const color = ref('')
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <ColorSwatchPicker v-model="color" :colors="colors" />
    <p>{{ color }}</p>
  </div>
</template>
