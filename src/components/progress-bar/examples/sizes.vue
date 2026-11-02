<script lang="ts" setup>
import ProgressBar from '../progress-bar.vue'
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <ProgressBar label="Small" size="sm" :model-value="40" />
    <ProgressBar label="Medium" size="md" :model-value="40" />
    <ProgressBar label="Large" size="lg" :model-value="40" />
  </div>
</template>
