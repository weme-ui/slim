<script lang="ts" setup>
import NumberInput from '../number-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <NumberInput radius="none" placeholder="None" />

    <NumberInput radius="xs" placeholder="XS" />

    <NumberInput radius="sm" placeholder="SM" />

    <NumberInput radius="md" placeholder="MD" />

    <NumberInput radius="lg" placeholder="LG" />

    <NumberInput radius="xl" placeholder="XL" />

    <NumberInput radius="full" placeholder="Full" />
  </div>
</template>
