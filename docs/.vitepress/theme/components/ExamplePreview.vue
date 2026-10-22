<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps<{
  path: string
}>()

const exampleModules = import.meta.glob<{ default: any }>(
  '../../../../src/components/**/examples/*.vue',
  { eager: true },
)

const exampleSources = import.meta.glob<string>(
  '../../../../src/components/**/examples/*.vue',
  { eager: true, query: '?raw', import: 'default' },
)

const highlightedSources = import.meta.glob<string>(
  '../../../../src/components/**/examples/*.vue',
  { eager: true, query: '?shiki&lang=vue', import: 'default' },
)

function resolveKey(modules: Record<string, unknown>) {
  const needle = props.path.replace(/\\/g, '/')
  return Object.keys(modules).find((key) => {
    const file = key.split('?')[0]!.replace(/\\/g, '/')
    return file.endsWith(`/${needle}`) || file.endsWith(needle) || file.includes(needle)
  })
}

const Example = computed(() => {
  const key = resolveKey(exampleModules)
  return key ? exampleModules[key]?.default : null
})

const source = computed(() => {
  const key = resolveKey(exampleSources)
  return key ? exampleSources[key] || '' : ''
})

const highlighted = computed(() => {
  const key = resolveKey(highlightedSources)
  return key ? highlightedSources[key] || '' : ''
})

const shortPath = computed(() => props.path.split('/').slice(-2).join('/'))
const copied = ref(false)

async function copySource() {
  if (!source.value)
    return
  try {
    await navigator.clipboard.writeText(source.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1400)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <section class="example-preview">
    <div class="example-stage">
      <div class="example-stage-glow" />
      <div class="example-stage-body">
        <component :is="Example" v-if="Example" />
        <p v-else class="example-missing">
          Example not found: {{ path }}
        </p>
      </div>
    </div>

    <details v-if="source" class="example-code">
      <summary>
        <span class="example-code-left">
          <span class="example-lang">Vue</span>
          <span class="example-path">{{ shortPath }}</span>
        </span>
        <span class="example-code-right">
          <button type="button" class="example-copy" @click.stop.prevent="copySource">
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
          <span class="example-toggle-closed">Expand code</span>
          <span class="example-toggle-open">Hide code</span>
        </span>
      </summary>
      <div class="example-code-body">
        <div v-if="highlighted" v-html="highlighted" />
        <div v-else class="language-vue">
          <pre><code>{{ source }}</code></pre>
        </div>
      </div>
    </details>
  </section>
</template>

<style scoped>
.example-preview {
  margin: 0.7rem 0 2rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--docs-radius);
  background: var(--vp-c-bg);
}

.example-stage {
  position: relative;
  background: var(--vp-c-bg);
}

.example-stage-glow {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--vp-c-divider) 1px, transparent 1.2px);
  background-size: 14px 14px;
  mask-image: radial-gradient(120% 90% at 50% 40%, #000 40%, transparent 85%);
  opacity: 0.9;
}

.example-stage-body {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8.5rem;
  padding: 2rem 1.5rem;
}

.example-missing {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.example-code {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.example-code > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.85rem;
  list-style: none;
  cursor: pointer;
  user-select: none;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
}

.example-code > summary::-webkit-details-marker {
  display: none;
}

.example-code-left,
.example-code-right {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.example-lang {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.example-path {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
}

.example-copy {
  appearance: none;
  border: 1px solid transparent;
  border-radius: 0.35rem;
  padding: 0.18rem 0.45rem;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.72rem;
  cursor: pointer;
}

.example-copy:hover,
.example-code > summary:hover {
  color: var(--vp-c-text-1);
}

.example-copy:hover {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.example-toggle-closed,
.example-toggle-open {
  color: var(--vp-c-text-2);
}

.example-toggle-open {
  display: none;
}

.example-code[open] .example-toggle-open {
  display: inline;
  color: var(--vp-c-brand-1);
}

.example-code[open] .example-toggle-closed {
  display: none;
}

.example-code-body {
  border-top: 1px solid var(--vp-c-divider);
  max-height: min(28rem, 70vh);
  overflow: auto;
}

.example-code-body :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  background: transparent;
}

.example-code-body :deep(pre) {
  margin: 0;
  background: transparent;
}
</style>
