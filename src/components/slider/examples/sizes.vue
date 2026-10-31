<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import Slider from '../slider.vue'
</script>

<template>
  <TooltipProvider>
    <div class="flex flex-col gap-8 max-w-sm w-full">
      <Slider
        size="sm"
        :default-value="[40]"
      />
      <Slider
        size="md"
        :default-value="[40]"
      />
      <Slider
        size="lg"
        :default-value="[40]"
      />
    </div>
  </TooltipProvider>
</template>
