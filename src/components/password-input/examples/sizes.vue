<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PasswordInput toggle-visibility size="sm" placeholder="Small" />

    <PasswordInput toggle-visibility size="md" placeholder="Medium" />

    <PasswordInput toggle-visibility size="lg" placeholder="Large" />
  </div>
</template>
