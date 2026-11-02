<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'
import { ref } from 'vue'

const progress = ref<number[]>([40])
</script>

<template>
  <TooltipProvider>
    <div class="flex flex-col gap-6 h-screen flex-center">
      <ProgressBar
        :model-value="progress[0] === 0 ? null : progress[0]"
        :max="100"
        size="md"
        label="Progress"
        description="This is a progress bar"
        class="w-80"
      />

      <ProgressCircle
        :model-value="progress[0] === 0 ? null : progress[0]"
        :max="100"
        size="sm"
        color="accent"
      />

      <Slider v-model="progress" :min="0" :max="100" class="w-80" />
    </div>
  </TooltipProvider>
</template>
