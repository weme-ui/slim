<script lang="ts" setup>
const colors = [
  'oklch(63.7% 0.237 25.331)',
  'oklch(70.5% 0.213 47.604)',
  'oklch(76.9% 0.188 70.08)',
  'oklch(79.5% 0.184 86.047)',
  'oklch(76.8% 0.233 130.85)',
]
</script>

<template>
  <ColorSwatchPicker :colors="colors" radius="full" size="sm" />
</template>
