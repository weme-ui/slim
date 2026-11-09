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

    <div v-else-if="name === 'toggle-button'" class="g-toggle-btn">
      <span class="g-pill is-ghost is-sq">
        <i class="g-spark is-sm" />
      </span>
      <span class="g-pill is-fill is-sq">
        <i class="g-spark is-sm" />
      </span>
    </div>

    <div v-else-if="name === 'toggle-button-group'" class="g-toggle-btn">
      <span class="g-pill is-ghost">
        <i class="g-bar is-sm" />
      </span>
      <span class="g-pill is-fill">
        <i class="g-bar g-bar-on is-sm" />
      </span>
      <span class="g-pill is-ghost">
        <i class="g-bar is-sm" />
      </span>
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
      <span class="g-stepper"> <span /><span /> </span>
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

    <div v-else-if="name === 'slider'" class="g-slider">
      <span class="g-slider-track">
        <i class="g-slider-fill" />
        <span class="g-slider-thumb" />
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

    <div v-else-if="name === 'segmented-control'" class="g-segment">
      <span class="is-on"><i class="g-bar g-bar-on is-sm" /></span>
      <span><i class="g-bar is-soft is-sm" /></span>
      <span><i class="g-bar is-soft is-sm" /></span>
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

    <div v-else-if="name === 'aspect-ratio'" class="g-aspect">
      <span class="g-aspect-media">
        <i class="g-aspect-sun" />
        <i class="g-aspect-hill" />
      </span>
    </div>

    <div v-else-if="name === 'scroll-area'" class="g-root g-mini g-scroll">
      <div class="g-scroll-body">
        <i class="g-bar is-60" />
        <i class="g-bar is-soft is-full" />
        <i class="g-bar is-lg" />
        <i class="g-bar is-soft is-80" />
        <i class="g-bar is-md" />
      </div>
      <span class="g-scroll-track">
        <i />
      </span>
    </div>

    <div v-else-if="name === 'config-provider'" class="g-root g-mini">
      <div class="g-row">
        <i class="g-bar is-md" />
      </div>
      <div class="g-row g-cells"><span /><span /><span /></div>
    </div>

    <div v-else-if="name === 'avatar'" class="g-root g-avatar">
      <span class="g-avatar-person" />
    </div>

    <div v-else-if="name === 'avatar-group'" class="g-avatars">
      <span class="g-root" />
      <span class="g-root" />
      <span class="g-root">
        <i class="g-avatar-person" />
      </span>
    </div>

    <div v-else-if="name === 'image'" class="g-image">
      <i class="g-image-sun" />
      <i class="g-image-hill" />
    </div>

    <div v-else-if="name === 'image-preview'" class="g-preview">
      <span class="g-preview-photo">
        <i class="g-preview-sun" />
        <i class="g-preview-hill" />
      </span>
      <span class="g-preview-thumbs"> <i /><i class="is-on" /><i /> </span>
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

    <div v-else-if="name === 'badge'" class="g-badge">
      <span class="g-badge-dot" />
      <i class="g-bar" />
    </div>

    <div v-else-if="name === 'chip'" class="g-chip-label">
      <span class="g-chip-dot" />
      <i class="g-bar is-sm" />
    </div>

    <div v-else-if="name === 'float'" class="g-float">
      <span class="g-float-host" />
      <span class="g-float-mark" />
    </div>

    <div v-else-if="name === 'kbd'" class="g-kbd">
      <span class="g-kbd-key">K</span>
    </div>

    <div v-else-if="name === 'alert'" class="g-root g-mini">
      <div class="g-row">
        <span class="g-alert-mark" />
        <i class="g-bar is-soft is-70" />
      </div>
    </div>

    <div v-else-if="name === 'empty'" class="g-root g-empty">
      <span class="g-dot-lg" />
      <i class="g-bar is-60" />
      <i class="g-bar is-soft is-80" />
    </div>

    <div v-else-if="name === 'progress-bar'" class="g-progress">
      <span class="g-progress-track">
        <i class="g-progress-fill" />
      </span>
    </div>

    <div v-else-if="name === 'progress-circle'" class="g-progress-circle">
      <span class="g-progress-ring">
        <i class="g-progress-arc" />
      </span>
    </div>

    <div v-else-if="name === 'skeleton'" class="g-skeleton">
      <i class="g-bar is-full is-soft" />
      <i class="g-bar is-80 is-soft" />
      <i class="g-bar is-60 is-soft" />
    </div>

    <div v-else-if="name === 'tooltip'" class="g-tooltip">
      <span class="g-tooltip-bubble">
        <i class="g-bar is-lg" />
      </span>
      <span class="g-pill is-ghost">
        <i class="g-bar is-sm" />
      </span>
    </div>

    <div v-else-if="name === 'animated-toggle-icon'" class="g-toggle">
      <span class="g-spark is-off" />
      <span class="g-spark is-on" />
    </div>

    <div v-else-if="name === 'activity-bar'" class="g-activity">
      <span class="g-pill is-sq is-fill">
        <i class="g-spark is-sm" />
      </span>
      <span class="g-pill is-sq">
        <i class="g-spark is-sm" />
      </span>
      <span class="g-pill is-sq is-foot">
        <i class="g-spark is-sm" />
      </span>
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

    <div v-else-if="name === 'navigation-menu'" class="g-nav">
      <i class="g-bar is-sm is-soft" />
      <i class="g-bar is-lg g-bar-on" />
      <i class="g-bar is-md" />
      <i class="g-bar is-md is-sub" />
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

.g-button,
.g-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.g-pill.is-sq {
  width: 1.75rem;
}

.g-pill.is-fill .g-spark {
  background: var(--docs-well);
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

.g-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 6rem;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--edge);
  border-radius: 999px;
  background: var(--shell);
}

.g-badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--ink);
}

.g-badge .g-bar {
  width: auto;
  flex: 1;
}

.g-chip-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.g-chip-dot {
  width: 0.5rem;
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--fill);
}

.g-float {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
}

.g-float-host {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-float-mark {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--fill);
  transform: translate(50%, -50%);
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

.g-slider {
  display: flex;
  align-items: center;
  width: 8.5rem;
}

.g-progress {
  width: 12.5rem;
}

.g-progress-track {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-progress-fill {
  display: block;
  width: 45%;
  height: 100%;
  border-radius: 999px 0 0 999px;
  background: var(--fill);
}

.g-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 8.5rem;
}

.g-progress-circle {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
}

.g-progress-ring {
  position: relative;
  width: 2.75rem;
  height: 2.75rem;
  border: 3px solid var(--ink-soft);
  border-radius: 999px;
}

.g-progress-arc {
  position: absolute;
  inset: -3px;
  border: 3px solid transparent;
  border-top-color: var(--fill);
  border-right-color: var(--fill);
  border-radius: inherit;
  transform: rotate(-24deg);
}

.g-slider-track {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0.375rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-slider-fill {
  width: 35%;
  height: 100%;
  border-radius: 999px 0 0 999px;
  background: var(--fill);
}

.g-slider-thumb {
  position: absolute;
  left: 35%;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--edge);
  border-radius: 999px;
  background: var(--fill);
  transform: translateX(-50%);
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

.g-segment {
  display: flex;
  padding: 0.125rem;
  border-radius: 0.45rem;
  background: var(--ink-soft);
}

.g-segment span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 0.35rem;
}

.g-segment .is-on {
  background: var(--shell);
  box-shadow: 0 0 0 1px var(--edge);
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

.g-aspect {
  width: 10.5rem;
  aspect-ratio: 16 / 9;
  padding: 0.4rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-aspect-media {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.28rem;
  background: var(--ink-soft);
}

.g-aspect-sun {
  position: absolute;
  top: 0.4rem;
  left: 0.5rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--fill);
}

.g-aspect-hill {
  position: absolute;
  right: -8%;
  bottom: -18%;
  left: 18%;
  height: 78%;
  background: var(--ink);
  clip-path: polygon(8% 100%, 38% 42%, 62% 72%, 100% 18%, 100% 100%);
}

.g-scroll {
  flex-direction: row;
  align-items: stretch;
}

.g-scroll-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  padding: 0.75rem;
}

.g-scroll-track {
  flex-shrink: 0;
  width: 0.375rem;
  margin: 0.5rem 0.35rem 0.5rem 0;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-scroll-track i {
  display: block;
  width: 100%;
  height: 42%;
  margin-top: 0.35rem;
  border-radius: inherit;
  background: var(--fill);
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

.g-tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
}

.g-tooltip-bubble {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.4rem;
  height: 1.75rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-tooltip-bubble::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  border-right: 1px solid var(--edge);
  border-bottom: 1px solid var(--edge);
  background: var(--shell);
  transform: translateX(-50%) rotate(45deg);
}

.g-dot-lg {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: var(--ink-soft);
}

.g-alert-mark {
  position: relative;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
}

.g-alert-mark::before,
.g-alert-mark::after {
  content: '';
  position: absolute;
  left: 50%;
  background: var(--ink);
  transform: translateX(-50%);
}

.g-alert-mark::before {
  top: 0.18rem;
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 999px;
}

.g-alert-mark::after {
  top: 0.4rem;
  width: 0.12rem;
  height: 0.38rem;
  border-radius: 999px;
}

.g-bar.is-70 {
  width: 70%;
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

.g-avatar {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  overflow: hidden;
  border-radius: 999px;
}

.g-avatar-person {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.g-avatar-person::before,
.g-avatar-person::after {
  content: '';
  position: absolute;
  left: 50%;
  background: var(--fill);
  transform: translateX(-50%);
}

.g-avatar-person::before {
  top: 22%;
  width: 32%;
  height: 32%;
  border-radius: 999px;
}

.g-avatar-person::after {
  bottom: -18%;
  width: 68%;
  height: 46%;
  border-radius: 999px 999px 0 0;
}

.g-avatars {
  display: flex;
  align-items: center;
}

.g-avatars .g-root {
  position: relative;
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  overflow: hidden;
  border-radius: 999px;
  box-shadow: 0 0 0 2px var(--docs-well);
}

.g-avatars .g-root + .g-root {
  margin-left: -0.7rem;
}

.g-avatars .g-root:not(:last-child)::before,
.g-avatars .g-root:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 50%;
  background: var(--ink);
  transform: translateX(-50%);
}

.g-avatars .g-root:not(:last-child)::before {
  top: 22%;
  width: 32%;
  height: 32%;
  border-radius: 999px;
}

.g-avatars .g-root:not(:last-child)::after {
  bottom: -18%;
  width: 68%;
  height: 46%;
  border-radius: 999px 999px 0 0;
}

.g-image {
  position: relative;
  width: 6.5rem;
  height: 5rem;
  overflow: hidden;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--ink-soft);
}

.g-image-sun {
  position: absolute;
  top: 0.45rem;
  left: 0.55rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--fill);
}

.g-image-hill {
  position: absolute;
  right: -8%;
  bottom: -18%;
  left: 22%;
  height: 72%;
  background: var(--ink);
  clip-path: polygon(8% 100%, 38% 42%, 62% 72%, 100% 18%, 100% 100%);
}

.g-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  width: 7.5rem;
  padding: 0.45rem;
  border: 1px solid var(--edge);
  border-radius: 0.45rem;
  background: var(--shell);
}

.g-preview-photo {
  position: relative;
  display: block;
  width: 100%;
  height: 3.4rem;
  overflow: hidden;
  border-radius: 0.28rem;
  background: var(--ink-soft);
}

.g-preview-sun {
  position: absolute;
  top: 0.35rem;
  left: 0.45rem;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--fill);
}

.g-preview-hill {
  position: absolute;
  right: -8%;
  bottom: -20%;
  left: 28%;
  height: 78%;
  background: var(--ink);
  clip-path: polygon(8% 100%, 38% 42%, 62% 72%, 100% 18%, 100% 100%);
}

.g-preview-thumbs {
  display: flex;
  gap: 0.3rem;
}

.g-preview-thumbs i {
  display: block;
  width: 1.15rem;
  height: 0.85rem;
  border-radius: 0.2rem;
  background: var(--ink-soft);
}

.g-preview-thumbs i.is-on {
  background: var(--fill);
  box-shadow: 0 0 0 1px var(--edge);
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

.g-kbd-key {
  display: grid;
  width: 1.75rem;
  height: 1.65rem;
  place-items: center;
  border: 1px solid var(--edge);
  border-radius: 0.35rem;
  background: var(--shell);
  box-shadow: 0 1px 0 var(--ink-soft);
  color: var(--fill);
  font-size: 0.7rem;
  font-weight: 600;
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

.g-activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 9rem;
  padding: 0.45rem;
  border: 1px solid var(--edge);
  border-radius: 0.7rem;
  background: var(--shell);
}

.g-activity .g-pill:not(.is-fill) {
  background: var(--ink-soft);
}

.g-activity .is-foot {
  margin-top: auto;
}

.g-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  width: 7.5rem;
  height: 7.5rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid var(--edge);
  border-radius: 0.7rem;
  background: var(--shell);
}

.g-nav .is-sub {
  margin-inline-start: 0.85rem;
  background: var(--ink-soft);
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
