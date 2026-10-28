<script lang="ts" setup>
import Input from '../input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Input radius="none" placeholder="None" />

    <Input radius="xs" placeholder="XS" />

    <Input radius="sm" placeholder="SM" />

    <Input radius="md" placeholder="MD" />

    <Input radius="lg" placeholder="LG" />

    <Input radius="xl" placeholder="XL" />

    <Input radius="full" placeholder="Full" />
  </div>
</template>
