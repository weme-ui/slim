<script lang="ts" setup>
import NumberInput from '../number-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <NumberInput
      :min="0"
      :max="100"
      decrement-icon="ri:volume-down-line"
      increment-icon="ri:volume-up-line"
      placeholder="0"
    />
  </div>
</template>
