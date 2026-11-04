<script lang="ts" setup>
import Avatar from '../avatar.vue'

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
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Avatar v-for="color in colors" :key="color" :color="color" fallback="A" />
  </div>
</template>
