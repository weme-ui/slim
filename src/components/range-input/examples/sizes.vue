<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <RangeInput size="sm" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput size="md" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput size="lg" from-placeholder="Min" to-placeholder="Max" />
  </div>
</template>
