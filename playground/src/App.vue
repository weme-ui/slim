<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'

const value = ref<number[]>([20, 80])
</script>

<template>
  <TooltipProvider>
    <div class="flex gap-md h-screen items-center justify-center">
      <Slider v-model="value" orientation="vertical" size="sm" inverted show-steps show-marks />
      <Slider v-model="value" orientation="vertical" size="md" show-steps show-marks />
      <Slider v-model="value" orientation="vertical" size="lg" show-steps show-marks />
    </div>
  </TooltipProvider>
</template>
