<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Textarea variant="soft" placeholder="Soft" />

    <Textarea variant="outline" placeholder="Outline" />
  </div>
</template>
