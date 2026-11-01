<script lang="ts" setup>
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex items-center">
    <Alert
      title="Docs"
      description="Opens the guide in a new tab."
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
      class="min-w-sm"
    />
  </div>
</template>
