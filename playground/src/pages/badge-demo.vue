<script lang="ts" setup>
const variants = ['solid', 'soft', 'outline', 'plain', 'inverted'] as const

const colors = ['default', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
</script>

<template>
  <div class="gap-4 grid grid-cols-7">
    <template v-for="variant in variants" :key="variant">
      <template v-for="color in colors" :key="color">
        <Badge label="Badge" :variant="variant" :color="color" icon="ri:star-line" size="md" />
      </template>
    </template>
  </div>
</template>
