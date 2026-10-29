<script lang="ts" setup>
import ToggleButton from '../toggle-button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ToggleButton label="None" radius="none" />
    <ToggleButton label="XS" radius="xs" />
    <ToggleButton label="SM" radius="sm" />
    <ToggleButton label="MD" radius="md" />
    <ToggleButton label="LG" radius="lg" />
    <ToggleButton label="XL" radius="xl" />
    <ToggleButton label="Full" radius="full" />
  </div>
</template>
