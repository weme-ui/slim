<script lang="ts" setup>
import ProgressCircle from '../progress-circle.vue'
</script>

<template>
  <div class="flex gap-3 items-center">
    <ProgressCircle aria-label="Loading" :model-value="null" />
  </div>
</template>
