<script lang="ts" setup>
import NumberInput from '../number-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <NumberInput
      :min="0"
      :max="100"
      :step="5"
      placeholder="0"
    />
  </div>
</template>
