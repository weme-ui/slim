<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Slider from '../slider.vue'
</script>

<template>
  <TooltipProvider>
    <div class="max-w-sm w-full">
      <Slider :default-value="[25, 75]" />
    </div>
  </TooltipProvider>
</template>
