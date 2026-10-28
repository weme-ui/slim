<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PasswordInput
      toggle-visibility
      placeholder="Toggle enabled"
    />

    <PasswordInput placeholder="Toggle disabled" />
  </div>
</template>
