<script lang="ts" setup>
import Badge from '../badge.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Badge label="New" icon="ri:star-line" />
    <Badge label="Pro" icon="ri:vip-crown-line" variant="soft" />
    <Badge icon="ri:heart-fill" color="error" aria-label="Favorite" />
  </div>
</template>
