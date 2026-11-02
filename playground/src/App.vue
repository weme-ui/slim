<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-6 h-screen flex-center">
    <div class="p-6 b b-base rounded-lg w-60 space-y-4">
      <div class="flex gap-4 items-center">
        <Skeleton variant="circle" class="size-10" />
        <div class="flex-1 space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" class="w-1/3" />
        </div>
      </div>
      <Skeleton variant="rect" class="h-30 w-full" />
    </div>
  </div>
</template>
