<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <PasswordInput
      toggle-visibility
      prefix-icon="ri:lock-line"
      placeholder="Enter password"
    />
  </div>
</template>
