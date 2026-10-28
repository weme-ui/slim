<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <RangeInput
      from-icon="ri:arrow-left-s-line"
      to-icon="ri:arrow-right-s-line"
      from-placeholder="Min"
      to-placeholder="Max"
    />
  </div>
</template>
