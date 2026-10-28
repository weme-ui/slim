<script lang="ts" setup>
import Button from '../button.vue'

const variants = [
  'solid',
  'soft',
  'outline',
  'ghost',
  'plain',
  'inverse',
] as const

const colors = [
  'default',
  'accent',
  'neutral',
  'info',
  'error',
  'success',
  'warning',
] as const
</script>

<template>
  <div class="gap-3 grid grid-cols-7 justify-items-center">
    <template v-for="variant in variants" :key="variant">
      <template v-for="color in colors" :key="color">
        <Button :label="color" :variant="variant" :color="color" />
      </template>
    </template>
  </div>
</template>
