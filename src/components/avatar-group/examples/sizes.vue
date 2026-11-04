<script lang="ts" setup>
import AvatarGroup from '../avatar-group.vue'

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

const items = [
  { fallback: 'A' },
  { fallback: 'B' },
  { fallback: 'C' },
]
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <AvatarGroup v-for="size in sizes" :key="size" :items="items" :size="size" />
  </div>
</template>
