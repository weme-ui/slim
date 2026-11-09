<script lang="ts" setup>
import ProgressBar from '../progress-bar.vue'

const colors = ['default', 'accent', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <ProgressBar
      v-for="color in colors"
      :key="color"
      :color="color"
      :label="color"
      :model-value="64"
    />
  </div>
</template>
