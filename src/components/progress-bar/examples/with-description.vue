<script lang="ts" setup>
import ProgressBar from '../progress-bar.vue'
</script>

<template>
  <div class="w-full">
    <ProgressBar
      description="64 GB of 100 GB used"
      label="Storage"
      :model-value="64"
    />
  </div>
</template>
