<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <RangeInput
      unstyled
      from-placeholder="Min"
      to-placeholder="Max"
      class="text-sm outline-none border-b b-base flex gap-2 w-full items-center focus-within:b-accent"
    />
  </div>
</template>
