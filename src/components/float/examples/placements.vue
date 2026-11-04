<script lang="ts" setup>
import Float from '../float.vue'

const placements = [
  'top-left',
  'top',
  'top-right',
  'left',
  'center',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right',
] as const
</script>

<template>
  <div class="gap-6 grid grid-cols-3 justify-items-center">
    <div v-for="placement in placements" :key="placement" class="relative">
      <div class="rounded bg-muted size-12" />
      <Float :placement="placement">
        <span class="rounded-full bg-black-12 size-2.5 ring-2 ring-$docs-well" />
      </Float>
    </div>
  </div>
</template>
