<script lang="ts" setup>
import NumberInput from '../number-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <NumberInput size="sm" placeholder="Small" />

    <NumberInput size="md" placeholder="Medium" />

    <NumberInput size="lg" placeholder="Large" />
  </div>
</template>
