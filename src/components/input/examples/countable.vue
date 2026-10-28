<script lang="ts" setup>
import Input from '../input.vue'
</script>

<template>
  <div class="max-w-sm w-full">
    <Input
      countable
      :max-length="32"
      placeholder="Up to 32 characters"
    />
  </div>
</template>
