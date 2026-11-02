<script lang="ts" setup>
import ProgressBar from '../progress-bar.vue'

const formats = [
  {
    label: 'Percent',
    formatOptions: { style: 'percent' },
  },
  {
    label: 'Decimal',
    formatOptions: { style: 'decimal' },
  },
  {
    label: 'USD',
    formatOptions: { style: 'currency', currency: 'USD' },
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <ProgressBar
      v-for="format in formats"
      :key="format.label"
      :format-options="format.formatOptions"
      :label="format.label"
      :model-value="64"
    />
  </div>
</template>
