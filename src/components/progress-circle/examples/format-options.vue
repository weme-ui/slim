<script lang="ts" setup>
import ProgressCircle from '../progress-circle.vue'

const formats = [
  { style: 'percent' },
  { style: 'decimal' },
  { style: 'currency', currency: 'USD' },
] as const
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ProgressCircle
      v-for="(formatOptions, index) in formats"
      :key="index"
      :format-options="formatOptions"
      :model-value="64"
    />
  </div>
</template>
