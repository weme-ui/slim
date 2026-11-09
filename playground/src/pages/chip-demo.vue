<script lang="ts" setup>
const variants = ['default', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="gap-8 grid grid-cols-3">
    <template v-for="variant in variants" :key="variant">
      <template v-for="size in sizes" :key="size">
        <Chip :variant="variant" :size="size" animate />
      </template>
    </template>
  </div>
</template>
