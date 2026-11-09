<script lang="ts" setup>
import AspectRatio from '../aspect-ratio.vue'

const ratios = [
  { label: '1:1', ratio: 1 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '16:9', ratio: 16 / 9 },
]
</script>

<template>
  <div class="flex flex-wrap gap-3 items-start">
    <div v-for="item in ratios" :key="item.label" class="w-32">
      <AspectRatio :ratio="item.ratio">
        <div class="text-sm text-subtle bg-muted size-full flex-center">
          {{ item.label }}
        </div>
      </AspectRatio>
    </div>
  </div>
</template>
