<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Checkbox
      size="sm"
      label="Small"
    />

    <Checkbox
      size="md"
      label="Medium"
    />

    <Checkbox
      size="lg"
      label="Large"
    />
  </div>
</template>
