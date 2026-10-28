<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Textarea size="sm" placeholder="Small" />

    <Textarea size="md" placeholder="Medium" />

    <Textarea size="lg" placeholder="Large" />
  </div>
</template>
