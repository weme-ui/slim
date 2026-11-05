<script lang="ts" setup>
import Image from '../image.vue'
</script>

<template>
  <Image
    src="https://example.invalid/missing.png"
    fallback-src="https://i.quotev.com/b2gtjqawaaaa.jpg"
    width="100"
    class="rounded-xl"
  />
</template>
