<script lang="ts" setup>
import ProgressCircle from '../progress-circle.vue'

const colors = ['default', 'accent', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ProgressCircle v-for="color in colors" :key="color" :color="color" :model-value="64" />
  </div>
</template>
