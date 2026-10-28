<script lang="ts" setup>
import RangeInput from '../range-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <RangeInput radius="none" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="xs" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="sm" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="md" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="lg" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="xl" from-placeholder="Min" to-placeholder="Max" />

    <RangeInput radius="full" from-placeholder="Min" to-placeholder="Max" />
  </div>
</template>
