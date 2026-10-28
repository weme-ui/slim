<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PasswordInput placeholder="Default" />
    <PasswordInput invalid placeholder="Invalid" />
  </div>
</template>
