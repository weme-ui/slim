<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Checkbox
      radius="none"
      label="None"
    />

    <Checkbox
      radius="sm"
      label="SM"
    />

    <Checkbox
      radius="md"
      label="MD"
    />

    <Checkbox
      radius="full"
      label="Full"
    />
  </div>
</template>
