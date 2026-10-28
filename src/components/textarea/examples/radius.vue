<script lang="ts" setup>
import Textarea from '../textarea.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Textarea radius="none" placeholder="None" />

    <Textarea radius="sm" placeholder="SM" />

    <Textarea radius="md" placeholder="MD" />

    <Textarea radius="lg" placeholder="LG" />

    <Textarea radius="xl" placeholder="XL" />
  </div>
</template>
