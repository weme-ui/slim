<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Slider from '../slider.vue'
</script>

<template>
  <TooltipProvider>
    <div class="flex items-center">
      <Slider
        orientation="vertical"
        :default-value="[40]"
      />
    </div>
  </TooltipProvider>
</template>
