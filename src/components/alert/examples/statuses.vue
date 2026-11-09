<script lang="ts" setup>
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Alert
      status="info"
      title="Info"
      description="Something to know."
      variant="solid"
      class="min-w-sm"
    />
    <Alert status="success" title="Success" description="Saved." variant="soft" class="min-w-sm" />
    <Alert
      status="warning"
      title="Warning"
      description="Check this."
      variant="outline"
      class="min-w-sm"
    />
    <Alert
      status="error"
      title="Error"
      description="Something failed."
      variant="inverse"
      class="min-w-sm"
    />
  </div>
</template>
