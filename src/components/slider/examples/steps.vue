<script lang="ts" setup>
import { TooltipProvider } from 'reka-ui'
import { ref } from 'vue'
import Slider from '../slider.vue'

const value = ref<number[]>([40])
</script>

<template>
  <TooltipProvider>
    <div class="max-w-sm w-full">
      <Slider v-model="value" :step="10" show-steps />
    </div>
  </TooltipProvider>
</template>
