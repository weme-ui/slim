<script lang="ts" setup>
import Chip from '../chip.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Chip label="Default" />
    <Chip label="Accent" variant="accent" />
    <Chip label="Neutral" variant="neutral" />
    <Chip label="Info" variant="info" />
    <Chip label="Success" variant="success" />
    <Chip label="Warning" variant="warning" />
    <Chip label="Error" variant="error" />
  </div>
</template>
