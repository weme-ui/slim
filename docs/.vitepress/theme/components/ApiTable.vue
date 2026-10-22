<script lang="ts" setup>
import type { ApiRow } from '../../lib/markdown'
import { computed } from 'vue'
import { highlightApiValue } from '../../lib/highlight'
import { renderInlineMarkdown } from '../../lib/markdown'

const props = defineProps<{
  kind: 'props' | 'events' | 'slots' | 'css-vars' | 'keyboard'
  items: ApiRow[]
}>()

const labels = computed(() => {
  switch (props.kind) {
    case 'events':
      return { name: 'Event', type: 'Type', default: 'Default' }
    case 'slots':
      return { name: 'Slot', type: 'Type', default: 'Default' }
    case 'css-vars':
      return { name: 'CSS Variable', type: 'Value', default: 'Value' }
    case 'keyboard':
      return { name: 'Key', type: 'Type', default: 'Default' }
    default:
      return { name: 'Prop', type: 'Type', default: 'Default' }
  }
})

const items = computed(() => props.items)
const showType = computed(() => items.value.some(row => Boolean(row.type)))
const showDefault = computed(() => {
  if (props.kind === 'css-vars')
    return false
  return items.value.some(row => Boolean(row.default))
})
const showCollapsedDescription = computed(() => {
  return !showType.value && !showDefault.value
})

function rowId(row: ApiRow) {
  return `api-${props.kind}-${row.name}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
}

function displayDefault(row: ApiRow) {
  if (props.kind === 'css-vars')
    return row.default || row.type || ''
  return row.default || ''
}

function showExpandedType(row: ApiRow) {
  return Boolean(row.type) && props.kind !== 'css-vars'
}

function highlight(value?: string) {
  return highlightApiValue(value ?? '')
}
</script>

<template>
  <div
    v-if="items.length"
    class="api-table"
    :class="{
      'has-type': showType,
      'has-default': showDefault,
      'has-desc': showCollapsedDescription,
    }"
  >
    <div class="api-table-head">
      <span>{{ labels.name }}</span>
      <span v-if="showType">{{ labels.type }}</span>
      <span v-if="showDefault">{{ labels.default }}</span>
      <span v-if="showCollapsedDescription">Description</span>
      <span class="api-table-head-icon" />
    </div>

    <details
      v-for="row in items"
      :key="`${kind}-${row.name}`"
      class="api-table-row"
    >
      <summary>
        <a
          :id="rowId(row)"
          class="api-cell api-name"
          :href="`#${rowId(row)}`"
          @click.stop
        >{{ row.name }}</a>
        <span
          v-if="showType"
          class="api-cell api-code"
          :title="row.type"
          v-html="highlight(row.type)"
        />
        <span
          v-if="showDefault"
          class="api-cell api-code"
          :title="displayDefault(row)"
          v-html="highlight(displayDefault(row))"
        />
        <span
          v-if="showCollapsedDescription"
          class="api-cell api-desc-inline"
          v-html="renderInlineMarkdown(row.description || '')"
        />
        <svg class="api-chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4.6 6.3a.7.7 0 0 1 .98-.02L8 8.86l2.42-2.58a.7.7 0 1 1 .96 1.04l-2.9 3.1a.7.7 0 0 1-.96 0l-2.9-3.1a.7.7 0 0 1-.02-.98Z" />
        </svg>
      </summary>

      <div class="api-table-detail">
        <template v-if="showCollapsedDescription">
          <span />
          <div class="api-detail-desc" v-html="renderInlineMarkdown(row.description || '')" />
        </template>
        <template v-else>
          <div v-if="row.description" class="api-detail-desc" v-html="renderInlineMarkdown(row.description)" />
          <span v-else />
          <pre
            v-if="showExpandedType(row)"
            class="api-type-block"
            v-html="highlight(row.type)"
          />
          <pre
            v-else-if="kind === 'css-vars' && (row.default || row.type)"
            class="api-type-block"
            v-html="highlight(row.default || row.type)"
          />
          <span v-else-if="showType" />
          <span v-if="showDefault" class="api-code api-detail-default" v-html="highlight(displayDefault(row))" />
        </template>
        <span class="api-table-head-icon" />
      </div>
    </details>
  </div>
</template>

<style scoped>
.api-table {
  margin: 1rem 0 1.75rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--docs-radius);
  background: var(--vp-c-bg);
}

.api-table-head,
.api-table-row > summary,
.api-table-detail {
  display: grid;
  grid-template-columns: minmax(9rem, 1.15fr) 1.25rem;
  gap: 1rem;
  align-items: center;
  padding: 0.7rem 0.85rem;
}

.api-table.has-type .api-table-head,
.api-table.has-type .api-table-row > summary,
.api-table.has-type .api-table-detail {
  grid-template-columns: minmax(9rem, 1.05fr) minmax(0, 1.7fr) 1.25rem;
}

.api-table.has-type.has-default .api-table-head,
.api-table.has-type.has-default .api-table-row > summary,
.api-table.has-type.has-default .api-table-detail {
  grid-template-columns: minmax(9rem, 1.05fr) minmax(0, 1.7fr) minmax(5.5rem, 0.85fr) 1.25rem;
}

.api-table.has-desc .api-table-head,
.api-table.has-desc .api-table-row > summary,
.api-table.has-desc .api-table-detail {
  grid-template-columns: minmax(8rem, 0.9fr) minmax(0, 2fr) 1.25rem;
}

.api-table-head {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  font-weight: 600;
}

.api-table-head-icon {
  width: 1rem;
}

.api-table-row {
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  border-top: 1px solid var(--vp-c-divider);
  border-radius: 0;
}

.api-table-row > summary {
  list-style: none;
  margin: 0;
  cursor: pointer;
}

.api-table-row > summary::-webkit-details-marker {
  display: none;
}

.api-table-row:hover,
.api-table-row[open] {
  background: var(--docs-row-hover);
}

.api-cell {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.api-name {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  line-height: 1.4;
  text-decoration: none;
}

.api-name:hover {
  color: var(--vp-c-brand-1);
}

.api-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.5;
  font-variant-ligatures: none;
}

.api-desc-inline {
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
}

.api-chevron {
  justify-self: end;
  width: 0.9rem;
  height: 0.9rem;
  fill: var(--vp-c-text-3);
  transition: transform 0.18s ease;
}

.api-table-row[open] .api-chevron {
  transform: rotate(180deg);
}

.api-table-row[open] > summary .api-code,
.api-table-row[open] > summary .api-desc-inline {
  visibility: hidden;
}

.api-table-detail {
  margin: 0;
  padding-top: 0;
  padding-bottom: 1rem;
  align-items: start;
}

.api-detail-desc {
  min-width: 0;
  color: var(--vp-c-text-2);
  font-size: 0.84rem;
  line-height: 1.65;
}

.api-detail-default {
  min-width: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.api-type-block {
  margin: 0;
  padding: 0;
  overflow: visible;
  border: 0;
  background: transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}

.api-table :deep(.tok-type) {
  color: var(--docs-token-type);
}

.api-table :deep(.tok-keyword) {
  color: var(--docs-token-keyword);
}

.api-table :deep(.tok-literal) {
  color: var(--docs-token-literal);
}

.api-table :deep(.tok-string) {
  color: var(--docs-token-string);
}

.api-table :deep(.tok-number) {
  color: var(--docs-token-number);
}

.api-table :deep(.tok-punct) {
  color: var(--docs-token-punct);
}

.api-table :deep(.tok-empty) {
  color: var(--docs-token-empty);
}

@media (max-width: 48rem) {
  .api-table-head,
  .api-table-row > summary,
  .api-table-detail {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }

  .api-table-head-icon,
  .api-chevron {
    display: none;
  }
}
</style>
