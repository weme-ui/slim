<script lang="ts" setup>
import Input from '../input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Input
      prefix-icon="ri:mail-line"
      suffix-icon="ri:search-line"
      placeholder="Search mail"
    />

    <Input prefix="https://" suffix=".com" placeholder="example" />
  </div>
</template>
