<script lang="ts" setup>
const previews = [
  {
    src: 'https://github.com/antfu.png',
    alt: 'Antfu',
  },
  {
    src: 'https://github.com/yyx990803.png',
    alt: 'Yyx990803',
  },
  {
    src: 'https://github.com/posva.png',
    alt: 'Posva',
  },
]
</script>

<template>
  <Image src="https://github.com/antfu.png" loading="lazy" width="100" />

  <ImagePreview
    :previews="previews"
    src="https://github.com/moujinet.png"
    fallback-src="https://i.quotev.com/b2gtjqawaaaa.jpg"
    loading="lazy"
    width="100"
    class="rounded-xl"
    @loading-status-change="console.log"
  />
</template>
