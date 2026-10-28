<script lang="ts" setup>
import PinInput from '../pin-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PinInput
      unstyled
      class="flex gap-2"
      :ui="{
        input: 'size-10 text-center border-b b-base outline-none focus:b-accent',
      }"
    />
  </div>
</template>
