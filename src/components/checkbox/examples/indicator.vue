<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Checkbox
      indicator="start"
      label="Start"
    />

    <Checkbox
      indicator="end"
      label="End"
    />

    <Checkbox
      indicator="none"
      label="None"
    />
  </div>
</template>
