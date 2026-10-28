<script lang="ts" setup>
import Input from '../input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Input placeholder="Default" />
    <Input invalid placeholder="Invalid" />
  </div>
</template>
