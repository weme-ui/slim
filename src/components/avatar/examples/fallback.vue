<script lang="ts" setup>
import Avatar from '../avatar.vue'
</script>

<template>
  <div class="flex gap-3 items-center">
    <Avatar fallback="WX" />
    <Avatar>
      <template #fallback>
        文
      </template>
    </Avatar>
  </div>
</template>
