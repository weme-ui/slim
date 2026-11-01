<script lang="ts" setup>
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Alert icon="ri:information-line" title="Solid" description="Solid surface." variant="solid" class="min-w-sm" />
    <Alert icon="ri:information-line" title="Soft" description="Soft surface." variant="soft" class="min-w-sm" />
    <Alert icon="ri:information-line" title="Outline" description="Outline surface." variant="outline" class="min-w-sm" />
    <Alert icon="ri:information-line" title="Inverse" description="Inverse surface." variant="inverse" class="min-w-sm" />
  </div>
</template>
