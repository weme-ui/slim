<script lang="ts" setup>
import Badge from '../badge.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Badge label="Solid" />
    <Badge label="Soft" variant="soft" />
    <Badge label="Outline" variant="outline" />
    <Badge label="Plain" variant="plain" />
    <Badge label="Inverted" variant="inverted" />
  </div>
</template>
