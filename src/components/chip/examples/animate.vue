<script lang="ts" setup>
import Chip from '../chip.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Chip label="Live" variant="error" animate />
    <Chip animate variant="success" aria-label="Live" />
  </div>
</template>
