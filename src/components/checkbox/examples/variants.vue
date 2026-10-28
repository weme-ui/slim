<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Checkbox
      variant="soft"
      label="Soft"
    />

    <Checkbox
      variant="outline"
      label="Outline"
    />

    <Checkbox
      variant="card"
      label="Card"
    />
  </div>
</template>
