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

    <div v-else-if="name === 'form'" class="g-root g-mini">
      <div class="g-row is-stack">
        <i class="g-bar is-md" />
        <span class="g-field-control">
          <i class="g-bar is-lg" />
        </span>
      </div>
      <div class="g-row is-stack">
        <i class="g-bar is-sm" />
        <span class="g-field-control">
          <i class="g-bar is-60" />
        </span>
      </div>
      <div class="g-row g-form-actions">
        <span class="g-pill is-fill">
          <i class="g-bar g-bar-on is-sm" />
        </span>
      </div>
    </div>

    <div v-else-if="name === 'form-field'" class="g-root g-mini">
      <div class="g-row is-stack">
        <i class="g-bar is-md" />
      </div>
      <div class="g-row">
        <span class="g-field-control">
          <i class="g-bar is-lg" />
        </span>
      </div>
    </div>

    <div v-else-if="name === 'input'" class="g-input">
      <i class="g-bar is-60" />
    </div>

    <div v-else-if="name === 'textarea'" class="g-textarea">
      <i class="g-bar is-full" />
      <i class="g-bar is-lg" />
      <i class="g-bar is-md" />
    </div>

    <div v-else-if="name === 'number-input'" class="g-input g-number">
      <i class="g-bar is-md" />
      <span class="g-stepper">
        <span /><span />
      </span>
    </div>

    <div v-else-if="name === 'password-input'" class="g-input g-password">
      <span class="g-dots" />
    </div>

    <div v-else-if="name === 'password-strength'" class="g-meter">
      <span class="is-on" />
      <span class="is-on" />
      <span />
      <span />
    </div>

    <div v-else-if="name === 'pin-input'" class="g-pin">
      <span /><span class="is-on" /><span /><span />
    </div>

    <div v-else-if="name === 'range-input'" class="g-range">
      <span class="g-input is-half">
        <i class="g-bar is-sm" />
      </span>
      <i class="g-range-sep" />
      <span class="g-input is-half">
        <i class="g-bar is-sm" />
      </span>
    </div>

    <div v-else-if="name === 'tags-input'" class="g-input g-tags">
      <span class="g-chip" />
      <span class="g-chip" />
      <i class="g-bar is-sm" />
    </div>

    <div v-else-if="name === 'autocomplete'" class="g-combo">
      <div class="g-input">
        <i class="g-bar is-60" />
      </div>
    </div>

    <div v-else-if="name === 'combobox'" class="g-combo">
      <div class="g-input">
        <i class="g-bar is-60" />
        <i class="g-chevron" />
      </div>
      <div class="g-root g-drop">
        <i class="g-bar is-lg" />
        <i class="g-bar is-soft is-md" />
      </div>
    </div>

    <div v-else-if="name === 'select'" class="g-input">
      <i class="g-bar is-60" />
      <i class="g-chevron" />
    </div>

    <div v-else-if="name === 'listbox'" class="g-root g-mini">
      <div class="g-row">
        <i class="g-bar is-lg" />
      </div>
      <div class="g-row is-fill-row">
        <i class="g-bar g-bar-on is-md" />
      </div>
      <div class="g-row">
        <i class="g-bar is-60" />
      </div>
    </div>

    <div v-else-if="name === 'checkbox'" class="g-checks">
      <div class="g-check-row">
        <span class="g-box" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-check-row">
        <span class="g-box is-on" />
        <i class="g-bar is-soft is-full" />
      </div>
    </div>

    <div v-else-if="name === 'checkbox-group'" class="g-checks">
      <div class="g-check-row">
        <span class="g-box is-on" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-check-row">
        <span class="g-box" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-check-row">
        <span class="g-box is-on" />
        <i class="g-bar is-soft is-full" />
      </div>
    </div>

    <div v-else-if="name === 'radio-group'" class="g-checks">
      <div class="g-check-row">
        <span class="g-box g-radio is-on" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-check-row">
        <span class="g-box g-radio" />
        <i class="g-bar is-soft is-full" />
      </div>
      <div class="g-check-row">
        <span class="g-box g-radio" />
        <i class="g-bar is-soft is-full" />
      </div>
    </div>

    <div v-else-if="name === 'switch'" class="g-switch">
      <span class="g-knob" />
    </div>

    <div v-else-if="name === 'tag-group'" class="g-tag-row">
      <span class="g-chip is-on" />
      <span class="g-chip" />
      <span class="g-chip" />
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

.g-field-control {
  display: flex;
  flex: 1;
  align-items: center;
  height: 1.75rem;
  padding: 0 0.5rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--docs-well);
}

.g-input {
  display: flex;
  align-items: center;
  width: 12.5rem;
  height: 2.1rem;
  padding: 0 0.75rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-input.is-half {
  width: 5.4rem;
  padding: 0 0.5rem;
}

.g-form-actions {
  justify-content: flex-end;
}

.g-textarea {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.4rem;
  width: 12.5rem;
  height: 4.6rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-number {
  justify-content: space-between;
}

.g-stepper {
  display: flex;
  overflow: hidden;
  border: 1px solid var(--edge);
  border-radius: 0.35rem;
}

.g-stepper span {
  width: 0.85rem;
  height: 1.15rem;
  background: var(--ink-soft);
}

.g-stepper span + span {
  border-left: 1px solid var(--edge);
}

.g-dots {
  width: 4.2rem;
  height: 0.42rem;
  background-image: radial-gradient(circle, var(--ink) 0.16rem, transparent 0.17rem);
  background-repeat: repeat-x;
  background-size: 0.7rem 0.42rem;
  background-position: left center;
}

.g-meter {
  display: flex;
  gap: 0.3rem;
  width: 12.5rem;
}

.g-meter span {
  flex: 1;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-meter .is-on {
  background: var(--fill);
}

.g-pin {
  display: flex;
  gap: 0.4rem;
}

.g-pin span {
  width: 1.85rem;
  height: 2.2rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-pin .is-on {
  box-shadow: inset 0 -0.35rem 0 var(--fill);
}

.g-range {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.g-range-sep {
  width: 0.7rem;
  height: 0.12rem;
  background: var(--ink);
}

.g-tags {
  gap: 0.35rem;
}

.g-chip {
  width: 2.4rem;
  height: 1.05rem;
  border: 1px solid var(--edge);
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-chip.is-on {
  background: var(--fill);
  border-color: transparent;
}

.g-combo {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  width: 12.5rem;
}

.g-combo .g-input {
  width: 100%;
}

.g-chevron {
  width: 0.4rem;
  height: 0.4rem;
  margin-left: auto;
  border-right: 1.5px solid var(--ink);
  border-bottom: 1.5px solid var(--ink);
  transform: rotate(45deg) translate(-1px, -1px);
}

.g-drop {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 0.45rem;
}

.g-row.is-fill-row {
  background: var(--fill);
}

.g-row.is-fill-row .g-bar {
  background: var(--docs-well);
}

.g-checks {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 8.5rem;
}

.g-check-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.g-box {
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--edge);
  border-radius: 0.22rem;
  background: var(--ink-soft);
  flex-shrink: 0;
}

.g-box.is-on {
  background: var(--fill);
  border-color: transparent;
}

.g-radio {
  border-radius: 999px;
}

.g-switch {
  display: flex;
  align-items: center;
  width: 2.5rem;
  height: 1.5rem;
  padding: 0.12rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-knob {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  border-radius: 999px;
  background: var(--shell);
  box-shadow: 0 0 0 1px var(--edge);
}

.g-tag-row {
  display: flex;
  gap: 0.4rem;
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
