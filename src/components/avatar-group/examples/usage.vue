<script lang="ts" setup>
import AvatarGroup from '../avatar-group.vue'

const items = [
  { fallback: 'A' },
  { fallback: 'B' },
  { fallback: 'C' },
  { fallback: 'D' },
]
</script>

<template>
  <div class="flex gap-3 items-center">
    <AvatarGroup :items="items" :max="3" />
  </div>
</template>
