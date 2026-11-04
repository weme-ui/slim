<script lang="ts" setup>
import Avatar from '../avatar.vue'

const sizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
] as const
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Avatar v-for="size in sizes" :key="size" :size="size" fallback="A" />
  </div>
</template>
