<script lang="ts" setup>
import ImagePreview from '../image-preview.vue'

const previews = [
  { src: 'https://github.com/antfu.png', alt: 'Antfu' },
  { src: 'https://github.com/yyx990803.png', alt: 'Yyx990803' },
  { src: 'https://github.com/posva.png', alt: 'Posva' },
]
</script>

<template>
  <ImagePreview
    :previews="previews"
    src="https://github.com/moujinet.png"
    width="100"
    class="rounded-xl"
  />
</template>
