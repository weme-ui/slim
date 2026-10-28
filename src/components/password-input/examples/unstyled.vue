<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PasswordInput
      toggle-visibility
      unstyled
      placeholder="Fully custom…"
      class="text-sm outline-none border-b b-base flex gap-1 w-full items-center focus-within:b-accent"
    />
  </div>
</template>
