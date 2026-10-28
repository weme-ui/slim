<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Textarea placeholder="Default" />
    <Textarea invalid placeholder="Invalid" />
  </div>
</template>
