<script lang="ts" setup>
import PinInput from '../pin-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PinInput radius="none" />

    <PinInput radius="md" />

    <PinInput radius="full" />
  </div>
</template>
