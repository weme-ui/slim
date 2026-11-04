<script lang="ts" setup>
import AvatarGroup from '../avatar-group.vue'

const colors = [
  'default',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
  'inverse',
] as const

const items = [
  { fallback: 'A' },
  { fallback: 'B' },
  { fallback: 'C' },
]
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <AvatarGroup v-for="color in colors" :key="color" :items="items" :color="color" />
  </div>
</template>
