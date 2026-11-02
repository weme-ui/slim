<script lang="ts" setup>
import ProgressCircle from '../progress-circle.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ProgressCircle
      v-for="size in sizes"
      :key="size"
      :model-value="64"
      :size="size"
    />
  </div>
</template>
