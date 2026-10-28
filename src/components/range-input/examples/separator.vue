<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <RangeInput
      separator="to"
      from-placeholder="Min"
      to-placeholder="Max"
    />

    <RangeInput
      separator-icon="ri:arrow-right-line"
      from-placeholder="Min"
      to-placeholder="Max"
    />
  </div>
</template>
