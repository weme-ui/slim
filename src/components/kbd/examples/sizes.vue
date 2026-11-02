<script lang="ts" setup>
import Kbd from '../kbd.vue'

const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <div class="flex gap-3 items-center">
    <Kbd
      v-for="size in sizes"
      :key="size"
      :size="size"
      value="shift"
    />
  </div>
</template>
