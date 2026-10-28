<script lang="ts" setup>
import TagsInput from '../tags-input.vue'
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <TagsInput placeholder="Default" />
    <TagsInput invalid placeholder="Invalid" />
  </div>
</template>
