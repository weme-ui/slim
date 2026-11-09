<script lang="ts" setup>
import Badge from '../badge.vue'

const variants = ['solid', 'soft', 'outline', 'plain', 'inverted'] as const

const colors = ['default', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="gap-3 grid grid-cols-7 justify-items-center">
    <template v-for="variant in variants" :key="variant">
      <template v-for="color in colors" :key="color">
        <Badge :label="color" :variant="variant" :color="color" />
      </template>
    </template>
  </div>
</template>
