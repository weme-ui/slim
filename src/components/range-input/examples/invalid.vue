<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <RangeInput from-placeholder="Min" to-placeholder="Max" />
    <RangeInput invalid from-placeholder="Min" to-placeholder="Max" />
  </div>
</template>
