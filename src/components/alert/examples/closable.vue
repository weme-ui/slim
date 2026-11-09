<script lang="ts" setup>
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex items-center">
    <Alert
      icon="ri:notification-line"
      title="Notice"
      description="You can dismiss this."
      class="min-w-sm"
      closable
    />
  </div>
</template>
