<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="glyph" :data-name="name" aria-hidden="true">
    <div v-if="name === 'button'" class="g-button">
      <span class="g-pill is-fill">
        <i class="g-bar g-bar-on is-sm" />
      </span>
      <span class="g-pill is-ghost" />
    </div>

    <div v-else-if="name === 'button-group'" class="g-root g-group">
      <span><i class="g-bar is-sm" /></span>
      <span class="is-on"><i class="g-bar g-bar-on is-sm" /></span>
      <span><i class="g-bar is-sm" /></span>
    </div>

    <div v-else-if="name === 'separator'" class="g-root g-mini g-separator">
      <div class="g-row is-stack">
        <i class="g-bar is-60" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-row g-sep-split">
        <span><i class="g-bar is-soft is-full" /></span>
        <span><i class="g-bar is-soft is-full" /></span>
        <span><i class="g-bar is-soft is-full" /></span>
        <span><i class="g-bar is-soft is-full" /></span>
      </div>
    </div>

    <div v-else-if="name === 'config-provider'" class="g-root g-mini">
      <div class="g-row">
        <i class="g-bar is-md" />
      </div>
      <div class="g-row g-cells">
        <span /><span /><span />
      </div>
    </div>

    <div v-else-if="name === 'icon'" class="g-icon">
      <span class="g-spark" />
    </div>

    <div v-else-if="name === 'icon-stack'" class="g-stack">
      <span class="g-root" /><span class="g-root" /><span class="g-root" />
    </div>

    <div v-else-if="name === 'icon-tile'" class="g-root g-tile">
      <span class="g-spark is-sm" />
    </div>

    <div v-else-if="name === 'empty'" class="g-root g-empty">
      <span class="g-dot-lg" />
      <i class="g-bar is-60" />
      <i class="g-bar is-soft is-80" />
    </div>

    <div v-else-if="name === 'animated-toggle-icon'" class="g-toggle">
      <span class="g-spark is-off" />
      <span class="g-spark is-on" />
    </div>

    <div v-else-if="name === 'link'" class="g-link">
      <span class="g-link-text" />
      <span class="g-link-arrow" />
    </div>

    <div v-else-if="name === 'link-overlay'" class="g-root g-mini g-overlay">
      <div class="g-row">
        <i class="g-bar g-bar-on is-md" />
      </div>
      <div class="g-row is-stack">
        <i class="g-bar is-full" />
        <i class="g-bar is-lg" />
      </div>
    </div>

    <div v-else class="g-root g-mini g-fallback">
      <i class="g-bar is-full" />
      <i class="g-bar is-lg" />
      <i class="g-bar is-md" />
    </div>
  </div>
</template>

<style scoped>
.glyph {
  --ink: color-mix(in oklch, var(--neutral-12) 40%, transparent);
  --ink-soft: color-mix(in oklch, var(--neutral-12) 20%, transparent);
  --edge: var(--docs-line);
  --shell: var(--docs-card);
  --fill: var(--vp-c-text-1);
  --mini-radius: 1rem;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--ink);
  pointer-events: none;
}

.g-root {
  border: 1px solid var(--edge);
  border-radius: var(--mini-radius);
  background: var(--shell);
}

.g-bar {
  display: block;
  height: 0.375rem;
  border-radius: 999px;
  background: var(--ink);
}

.g-bar-on {
  background: var(--fill);
}

.g-bar.is-sm {
  width: 1.65rem;
}

.g-bar.is-md {
  width: 42%;
}

.g-bar.is-lg {
  width: 64%;
}

.g-bar.is-full {
  width: 92%;
}

.g-bar.is-60 {
  width: 60%;
}

.g-bar.is-80 {
  width: 80%;
}

.g-bar.is-soft {
  background: var(--ink-soft);
}

.g-mini {
  display: flex;
  flex-direction: column;
  width: 12.5rem;
  overflow: hidden;
}

.g-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
}

.g-row + .g-row {
  border-top: 1px solid var(--edge);
}

.g-row.is-stack {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.g-cells {
  gap: 0.45rem;
}

.g-cells span {
  flex: 1;
  height: 2.1rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--docs-well);
}

.g-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.6rem;
  height: 1.75rem;
  border-radius: 0.45rem;
}

.g-button {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.g-pill.is-fill {
  background: var(--fill);
}

.g-pill.is-fill .g-bar {
  background: var(--docs-well);
}

.g-pill.is-ghost {
  border: 1px solid var(--edge);
  background: var(--shell);
}

.g-group {
  display: flex;
  overflow: hidden;
  border-radius: 0.45rem;
}

.g-group span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 1.75rem;
}

.g-group span + span {
  border-left: 1px solid var(--edge);
}

.g-group .is-on {
  background: var(--fill);
}

.g-group .is-on .g-bar {
  background: var(--docs-well);
}

.g-sep-split {
  gap: 0;
  padding-inline: 0;
}

.g-sep-split span {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0.25rem 0.5rem;
}

.g-sep-split span + span {
  border-left: 1px solid var(--edge);
}

.g-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 12.5rem;
  padding: 1.5rem;
  border-style: dashed;
}

.g-dot-lg {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-spark {
  display: block;
  width: 1.7rem;
  height: 1.7rem;
  background: var(--ink);
  clip-path: polygon(50% 0, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0 50%, 36% 36%);
}

.g-spark.is-sm {
  width: 0.95rem;
  height: 0.95rem;
}

.g-icon {
  display: grid;
  place-items: center;
}

.g-stack {
  position: relative;
  width: 3.7rem;
  height: 3.5rem;
}

.g-stack .g-root {
  position: absolute;
  inset: 0.35rem 0.5rem;
  border-radius: 0.5rem;
}

.g-stack .g-root:nth-child(1) {
  transform: translate(-11px, 8px) rotate(-12deg);
}

.g-stack .g-root:nth-child(2) {
  transform: translate(11px, 8px) rotate(11deg);
}

.g-stack .g-root:nth-child(3) {
  inset: 0.12rem 0.55rem 0.7rem;
}

.g-tile {
  display: grid;
  place-items: center;
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 0.7rem;
}

.g-toggle {
  position: relative;
  width: 3.2rem;
  height: 2.15rem;
}

.g-toggle .g-spark {
  position: absolute;
  top: 0.15rem;
}

.g-toggle .is-off {
  left: 0;
  opacity: 0.4;
  transform: scale(0.78);
}

.g-toggle .is-on {
  right: 0;
  background: var(--fill);
}

.g-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.g-link-text {
  width: 5.4rem;
  height: 0.54rem;
  border-bottom: 1px solid var(--ink);
  background: var(--ink);
  border-radius: 999px;
  box-shadow: 0 3px 0 -2px var(--ink-soft);
}

.g-link-arrow {
  width: 0.45rem;
  height: 0.45rem;
  border-top: 1px solid var(--ink);
  border-right: 1px solid var(--ink);
  transform: rotate(45deg);
}

.g-overlay {
  position: relative;
}

.g-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--ink-soft);
}

.g-fallback {
  gap: 0.5rem;
  padding: 0.75rem;
}
</style>
