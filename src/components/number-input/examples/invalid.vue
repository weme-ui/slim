<script lang="ts" setup>
import NumberInput from '../number-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <NumberInput />
    <NumberInput invalid />
  </div>
</template>
