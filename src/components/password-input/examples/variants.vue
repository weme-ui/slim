<script lang="ts" setup>
import PasswordInput from '../password-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <PasswordInput toggle-visibility variant="soft" placeholder="Soft" />

    <PasswordInput toggle-visibility variant="outline" placeholder="Outline" />
  </div>
</template>
