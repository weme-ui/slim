<script lang="ts" setup>
import Image from '../image.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-end">
    <Image src="https://github.com/moujinet.png" fit="none" class="bg-muted h-18 w-30" />
    <Image src="https://github.com/moujinet.png" fit="contain" class="bg-muted h-18 w-30" />
    <Image src="https://github.com/moujinet.png" fit="cover" class="bg-muted h-18 w-30" />
    <Image src="https://github.com/moujinet.png" fit="fill" class="bg-muted h-18 w-30" />
  </div>
</template>
