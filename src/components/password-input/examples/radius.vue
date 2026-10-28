<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PasswordInput toggle-visibility radius="none" placeholder="None" />

    <PasswordInput toggle-visibility radius="xs" placeholder="Extra small" />

    <PasswordInput toggle-visibility radius="sm" placeholder="Small" />

    <PasswordInput toggle-visibility radius="md" placeholder="Medium" />

    <PasswordInput toggle-visibility radius="lg" placeholder="Large" />

    <PasswordInput toggle-visibility radius="xl" placeholder="Extra large" />

    <PasswordInput toggle-visibility radius="full" placeholder="Full" />
  </div>
</template>
