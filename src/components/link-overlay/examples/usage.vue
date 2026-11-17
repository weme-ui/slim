<script lang="ts" setup>
import LinkOverlay from '../link-overlay.vue'
</script>

<template>
  <article class="p-4 b b-default rounded-lg max-w-sm transition-colors relative hover:bg-muted">
    <h3 class="text-base font-medium">
      <LinkOverlay href="#getting-started"> Getting Started </LinkOverlay>
    </h3>
    <p class="text-sm text-muted mt-1">整张卡片可点击，标题仍是语义化链接。</p>
  </article>
</template>
