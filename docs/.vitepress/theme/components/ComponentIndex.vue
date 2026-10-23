<script lang="ts" setup>
import { withBase } from 'vitepress'
import { componentHref, getComponentItems } from '../../lib/registry'
import ComponentGlyph from './ComponentGlyph.vue'

const items = getComponentItems()
</script>

<template>
  <div class="component-index">
    <header class="index-hero">
      <p class="index-kicker">
        Slim
      </p>
      <h1>Re-usable UI components with Reka UI and UnoCSS.</h1>
      <p class="index-lead">
        A compact catalog of primitives. Each sketch is CSS — click through for usage and API.
      </p>
      <a class="index-cta" :href="withBase('/get-started/')">Get started</a>
    </header>

    <div class="index-grid">
      <article
        v-for="(item, index) in items"
        :key="item.name"
        class="index-card"
        :style="{ '--i': String(index) }"
      >
        <div class="index-card-head">
          <h2>
            <a :href="withBase(componentHref(item.name))">{{ item.title }}</a>
          </h2>
          <p>{{ item.description }}</p>
        </div>
        <div class="index-card-well">
          <ComponentGlyph :name="item.name" />
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.component-index {
  width: min(72rem, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: 3.25rem 0 5.5rem;
}

.index-hero {
  max-width: 38rem;
  padding-bottom: 2.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--docs-line);
}

.index-kicker {
  margin: 0 0 0.7rem;
  color: var(--accent-11);
  font-size: 0.8rem;
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.index-hero h1 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: clamp(2rem, 4.4vw, 3.15rem);
  font-weight: 720;
  line-height: 1.08;
  letter-spacing: -0.045em;
}

.index-lead {
  margin: 0.9rem 0 1.35rem;
  max-width: 32rem;
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
  line-height: 1.55;
}

.index-cta {
  display: inline-flex;
  align-items: center;
  height: 2.15rem;
  padding: 0 0.95rem;
  border-radius: 999px;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease;
}

.index-cta:hover {
  background: var(--accent-11);
  color: var(--neutral-1);
}

.index-cta:focus-visible {
  outline: 2px solid var(--accent-9);
  outline-offset: 3px;
}

.index-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 720px) {
  .index-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.75rem;
  }
}

@media (min-width: 1100px) {
  .index-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
}

.index-card {
  position: relative;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  overflow: visible;
  border: 1px solid var(--docs-line);
  border-radius: var(--docs-radius);
  background: var(--docs-card);
  box-shadow: var(--docs-ring);
  animation: index-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--i, 0) * 45ms);
  transition: transform 0.2s ease;
}

.index-card::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: -5px;
  border: 1px solid var(--docs-ring-line);
  border-radius: calc(var(--docs-radius) + 5px);
  pointer-events: none;
}

.index-card:hover {
  transform: translateY(-2px);
}

.index-card:hover :deep(.glyph) {
  transform: translateY(-3px);
}

.index-card:has(a:focus-visible) {
  outline: 2px solid var(--accent-9);
  outline-offset: 3px;
}

.index-card-head {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.15rem 1.25rem 0.95rem;
}

.index-card h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 670;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.index-card h2 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.index-card h2 a::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.index-card h2 a:focus {
  outline: none;
}

.index-card p {
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  min-height: 2.55em;
}

.index-card-well {
  display: grid;
  flex: 1;
  place-items: center;
  min-height: 12.75rem;
  margin: 0 -1px -1px;
  padding: 2rem;
  overflow: hidden;
  border: 1px solid var(--docs-line);
  border-radius: 0 0 var(--docs-radius) var(--docs-radius);
  background: var(--docs-well);
}

.index-card-well :deep(.glyph) {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes index-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .index-card,
  .index-card:hover,
  .index-card:hover :deep(.glyph),
  .index-card-well :deep(.glyph) {
    animation: none;
    transform: none;
    transition: none;
  }
}
</style>
