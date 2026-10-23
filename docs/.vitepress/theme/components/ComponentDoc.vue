<script lang="ts" setup>
import { installationHtml } from 'virtual:docs-highlighted'
import { computed } from 'vue'
import { renderMarkdown } from '../../lib/markdown'
import { buildComponentPage, flattenOutline, getRegistryItem, registry } from '../../lib/registry'
import ApiTable from './ApiTable.vue'
import ExamplePreview from './ExamplePreview.vue'

const props = defineProps<{
  name: string
}>()

const readmeModules = import.meta.glob<string>(
  '../../../../src/components/**/README.md',
  { eager: true, query: '?raw', import: 'default' },
)

function resolveReadme(path?: string) {
  if (!path)
    return ''
  const key = Object.keys(readmeModules).find(modulePath =>
    modulePath.endsWith(`/${path}`) || modulePath.endsWith(path) || modulePath.includes(path),
  )
  return key ? readmeModules[key] || '' : ''
}

const page = computed(() => {
  const item = getRegistryItem(props.name, registry)
  if (!item)
    return null
  const docFile = item.files.find(file => file.kind === 'doc')
  return buildComponentPage(item, resolveReadme(docFile?.path), registry)
})

const outlineIds = computed(() => {
  if (!page.value)
    return new Map<string, string>()
  return new Map(flattenOutline(page.value.outline).map(header => [header.title, header.slug]))
})

function headingId(title: string) {
  return outlineIds.value.get(title) || title.toLowerCase().replace(/\s+/g, '-')
}

function html(source: string) {
  return renderMarkdown(source)
}
</script>

<template>
  <div v-if="page" class="component-doc">
    <header class="doc-hero">
      <h1>{{ page.title }}</h1>
      <p v-if="page.lead || page.description" class="component-lead">
        {{ page.lead || page.description }}
      </p>
      <ul v-if="page.dependencies.length" class="doc-dependencies">
        <li v-for="dependency in page.dependencies" :key="dependency">
          <a
            class="doc-dependency"
            :href="`https://www.npmjs.com/package/${dependency}`"
            target="_blank"
            rel="noreferrer"
          >{{ dependency }}</a>
        </li>
      </ul>
    </header>

    <h2 :id="headingId('Installation')">
      Installation
    </h2>
    <div class="doc-install" v-html="installationHtml[page.name] || html(page.installationMarkdown)" />

    <template v-if="page.usageExample">
      <h2 :id="headingId('Usage')">
        Usage
      </h2>
      <ExamplePreview :path="page.usageExample.path" />
    </template>

    <template v-if="page.featureExamples.length">
      <h2 :id="headingId('Examples')">
        Examples
      </h2>
      <template v-for="example in page.featureExamples" :key="example.path">
        <h3 :id="headingId(example.title)">
          {{ example.title }}
        </h3>
        <ExamplePreview :path="example.path" />
      </template>
    </template>

    <template v-if="page.propsRows.length">
      <h2 :id="headingId('Props')">
        Props
      </h2>
      <ApiTable kind="props" :items="page.propsRows" />
    </template>

    <template v-if="page.eventsRows.length">
      <h2 :id="headingId('Events')">
        Events
      </h2>
      <ApiTable kind="events" :items="page.eventsRows" />
    </template>

    <template v-if="page.slotsRows.length">
      <h2 :id="headingId('Slots')">
        Slots
      </h2>
      <ApiTable kind="slots" :items="page.slotsRows" />
    </template>

    <template v-if="page.cssVarRows.length">
      <h2 :id="headingId('CSS Variables')">
        CSS Variables
      </h2>
      <div v-if="page.cssVarIntro" v-html="html(page.cssVarIntro)" />
      <ApiTable kind="css-vars" :items="page.cssVarRows" />
      <div v-if="page.cssVarNote" v-html="html(page.cssVarNote)" />
    </template>

    <template v-if="page.accessibilityMarkdown || page.keyboardRows.length">
      <h2 :id="headingId('Accessibility')">
        Accessibility
      </h2>
      <div v-if="page.accessibilityMarkdown" v-html="html(page.accessibilityMarkdown)" />
      <template v-if="page.keyboardRows.length">
        <h3 :id="headingId('Keyboard Interactions')">
          Keyboard Interactions
        </h3>
        <ApiTable kind="keyboard" :items="page.keyboardRows" />
      </template>
    </template>

    <template v-if="page.sourceFiles.length">
      <h2 :id="headingId('Files')">
        Files
      </h2>
      <ul class="doc-files">
        <li v-for="file in page.sourceFiles" :key="file.path">
          <code>{{ file.path }}</code>
        </li>
      </ul>
    </template>
  </div>

  <p v-else>
    Unknown component: {{ name }}
  </p>
</template>

<style scoped>
.doc-hero {
  margin-bottom: 1.75rem;
}

.doc-hero h1 {
  margin: 0;
  letter-spacing: -0.035em;
  font-size: 2.25rem;
  line-height: 1.15;
  font-weight: 700;
}

.component-lead {
  margin: 0.75rem 0 0;
  max-width: 36rem;
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
  line-height: 1.6;
}

.doc-dependencies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.doc-dependency {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.4;
  text-decoration: none;
}

.doc-dependency:hover {
  color: var(--vp-c-brand-2);
}

.doc-files {
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
}

.doc-files li {
  margin: 0.35rem 0;
}

.component-doc :deep(.doc-install div[class*='language-']) {
  margin: 0.75rem 0 1.25rem;
}
</style>
