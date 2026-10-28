<script lang="ts" setup>
import Checkbox from '../checkbox.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Checkbox label="Default" />
    <Checkbox invalid label="Invalid" />
  </div>
</template>
