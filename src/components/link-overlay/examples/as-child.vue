<script lang="ts" setup>
import LinkOverlay from '../link-overlay.vue'
</script>

<template>
  <article class="p-4 b b-default rounded-lg max-w-sm transition-colors relative hover:bg-muted">
    <h3 class="text-base font-medium">
      <LinkOverlay as-child>
        <a href="#as-child" class="text-accent"> Compose with asChild </a>
      </LinkOverlay>
    </h3>
    <p class="text-sm text-muted mt-1">将样式与行为合并到自定义子元素上渲染。</p>
  </article>
</template>
