<script lang="ts" setup>
import Skeleton from '../skeleton.vue'
</script>

<template>
  <div class="flex flex-wrap flex-col gap-3 items-center">
    <Skeleton variant="circle" class="size-10" />
    <Skeleton variant="text" class="w-32" />
    <Skeleton variant="rect" class="h-10 w-32" />
  </div>
</template>
