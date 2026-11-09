<script lang="ts" setup>
import AspectRatio from '../aspect-ratio.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <AspectRatio :ratio="16 / 9">
      <div class="text-sm text-subtle bg-muted size-full flex-center">16:9</div>
    </AspectRatio>
  </div>
</template>
