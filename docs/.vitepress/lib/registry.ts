import type { DefaultTheme, Header } from 'vitepress'
import type { ApiRow } from './markdown.ts'
import registryJson from '../../../registry.json' with { type: 'json' }
import {
  extractLead,
  firstTableRows,
  humanizeExampleName,
  markdownWithoutTables,
  slugifyHeading,
  splitBodySegments,
  splitMarkdownH2,
  splitMarkdownH3,
  splitReadmeFrontmatter,
  stripLeadingH1,
  unwrapInlineCode,
} from './markdown.ts'

export interface RegistryFile {
  type?: string
  kind?: string
  path: string
  target?: string
}

export interface RegistryItem {
  name: string
  title?: string
  description?: string
  type?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  cssVars?: Record<string, Record<string, string>>
  meta?: Record<string, string>
}

export interface RegistryConfig {
  name: string
  description?: string
  version?: string
  items: RegistryItem[]
}

export interface ExampleRef {
  name: string
  title: string
  path: string
}

export interface DocSection {
  title: string
  markdown: string
}

export interface TypeSection {
  title: string
  markdown: string
  rows: ApiRow[]
}

export interface ComponentPageModel {
  name: string
  title: string
  description: string
  lead: string
  dependencies: string[]
  installationMarkdown: string
  usageMarkdown: string
  usageExample?: ExampleRef
  featureExamples: ExampleRef[]
  propsRows: ApiRow[]
  eventsRows: ApiRow[]
  slotsRows: ApiRow[]
  parametersRows: ApiRow[]
  returnsMarkdown: string
  returnsRows: ApiRow[]
  exportSections: DocSection[]
  typeSections: TypeSection[]
  cssVarRows: ApiRow[]
  cssVarIntro: string
  cssVarNote: string
  accessibilityMarkdown: string
  keyboardRows: ApiRow[]
  sourceFiles: RegistryFile[]
  outline: Header[]
}

const TOKENS_URL = 'https://weme-ui.github.io/weme-ui/unocss-preset/docs/theme/tokens/'
const RESERVED_DOC_H2 = new Set([
  'installation',
  'usage',
  'props',
  'events',
  'slots',
  'accessibility',
  'parameters',
  'returns',
  'types',
])

export const registry = registryJson as RegistryConfig

export function getComponentItems(config: RegistryConfig = registry): RegistryItem[] {
  return config.items.filter(item => item.type === 'component')
}

export function getComposableItems(config: RegistryConfig = registry): RegistryItem[] {
  return config.items.filter(item => item.type === 'composable')
}

export function getDocItems(config: RegistryConfig = registry): RegistryItem[] {
  return config.items.filter(item => item.type === 'component' || item.type === 'composable')
}

export function getRegistryItem(name: string, config: RegistryConfig = registry): RegistryItem | undefined {
  return getDocItems(config).find(item => item.name === name)
}

export function findRegistryItem(name: string, config: RegistryConfig = registry): RegistryItem | undefined {
  return config.items.find(item => item.name === name)
}

function pushUnique(list: string[], seen: Set<string>, values: string[] = []) {
  for (const value of values) {
    if (!value || seen.has(value))
      continue
    seen.add(value)
    list.push(value)
  }
}

/**
 * Own npm packages plus every item reached through `registryDependencies`.
 * Registry-root `dependencies` stay out of the page list.
 */
export function resolvePageDependencies(
  item: RegistryItem,
  config: RegistryConfig = registry,
  extra: string[] = [],
): string[] {
  const packages: string[] = []
  const seenPackages = new Set<string>()
  const seenItems = new Set<string>()

  function walk(current: RegistryItem) {
    if (seenItems.has(current.name))
      return
    seenItems.add(current.name)

    pushUnique(packages, seenPackages, current.dependencies)

    for (const depName of current.registryDependencies ?? []) {
      const dep = findRegistryItem(depName, config)
      if (dep)
        walk(dep)
    }
  }

  walk(item)
  pushUnique(packages, seenPackages, extra)
  return packages
}

export function componentHref(name: string): string {
  return `/components/${name}`
}

export function composableHref(name: string): string {
  return `/composables/${name}`
}

export function itemHref(item: RegistryItem): string {
  return item.type === 'composable'
    ? composableHref(item.name)
    : componentHref(item.name)
}

export function firstComponentLink(config: RegistryConfig = registry): string {
  const first = getComponentItems(config)[0]
  return first
    ? componentHref(first.name)
    : '/components/'
}

function docsGroupRank(id: string) {
  if (id === 'general')
    return 0
  if (id === 'utilities')
    return 2
  if (id === 'composables')
    return 3
  return 1
}

export function getComponentSidebar(config: RegistryConfig = registry): DefaultTheme.SidebarItem[] {
  const groups = new Map<string, { id: string, label: string, items: DefaultTheme.SidebarItem[] }>()

  for (const item of getComponentItems(config)) {
    const id = item.meta?.['docs.category'] || 'uncategorized'
    const label = item.meta?.['docs.categoryLabel'] || 'Uncategorized'
    if (!groups.has(id)) {
      groups.set(id, {
        id,
        label,
        items: [],
      })
    }
    groups.get(id)!.items.push({
      text: item.title || item.name,
      link: itemHref(item),
    })
  }

  const composables = getComposableItems(config)
  if (composables.length) {
    groups.set('composables', {
      id: 'composables',
      label: composables[0]?.meta?.['docs.categoryLabel'] || 'Composables',
      items: composables.map(item => ({
        text: item.title || item.name,
        link: itemHref(item),
      })),
    })
  }

  const ordered = [
    ...groups.values(),
  ].sort((a, b) => {
    const rank = docsGroupRank(a.id) - docsGroupRank(b.id)
    if (rank !== 0)
      return rank
    return a.label.localeCompare(b.label, 'en')
  })

  return [
    {
      text: 'All components',
      link: '/components/',
    },
    ...ordered.map(group => ({
      text: group.label,
      items: group.items,
      collapsed: false,
    })),
  ]
}

export function fileBasename(path: string, ext = ''): string {
  const name = path.split('/').pop() || path
  return ext && name.endsWith(ext)
    ? name.slice(0, -ext.length)
    : name
}

export function resolveExamples(item: RegistryItem): ExampleRef[] {
  return item.files
    .filter(file => file.kind === 'example')
    .map((file) => {
      const name = fileBasename(file.path, '.vue')
      return {
        name,
        title: humanizeExampleName(name, item.name),
        path: file.path,
      }
    })
}

function hasCssVars(cssVars?: Record<string, Record<string, string>>): boolean {
  if (!cssVars)
    return false
  return Object.values(cssVars).some(group => Object.keys(group).length > 0)
}

export function cssVarsToRows(cssVars: Record<string, Record<string, string>> = {}): ApiRow[] {
  const rows: ApiRow[] = []
  for (const theme of Object.keys(cssVars).sort()) {
    const group = cssVars[theme] || {}
    for (const name of Object.keys(group).sort()) {
      rows.push({
        name: `--${theme}-${name}`,
        type: group[name],
        default: group[name],
      })
    }
  }
  return rows
}

export function cssVarsExampleClass(cssVars: Record<string, Record<string, string>> = {}): string | undefined {
  const theme = Object.keys(cssVars).sort()[0]
  if (!theme)
    return undefined
  const name = Object.keys(cssVars[theme] || {}).sort()[0]
  if (!name)
    return undefined
  const stem = name.replace(/-(?:color|bg|background)$/, '')
  return `bg-${theme}-${stem}`
}

function sectionMap(readme: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const section of splitMarkdownH2(stripLeadingH1(readme)))
    map.set(section.title.trim().toLowerCase(), section.body)
  return map
}

function pushHeader(outline: Header[], used: Map<string, number>, title: string, level: number, parent?: Header) {
  const slug = slugifyHeading(title, used)
  const header: Header = {
    level,
    title,
    slug,
    link: `#${slug}`,
    children: [],
  }
  if (parent)
    parent.children.push(header)
  else
    outline.push(header)
  return header
}

export function buildComponentPage(
  item: RegistryItem,
  readme = '',
  config: RegistryConfig = registry,
): ComponentPageModel {
  const { dependencies: frontmatterDependencies, body } = splitReadmeFrontmatter(readme)
  const dependencies = resolvePageDependencies(item, config, frontmatterDependencies)
  const stripped = stripLeadingH1(body)
  const lead = extractLead(stripped)
  const sections = sectionMap(body)
  const examples = resolveExamples(item)
  const usageExample = examples.find(example => example.name === 'usage')
  const featureExamples = examples.filter(example => example.name !== 'usage')
  const sourceFiles = item.files.filter(file => !file.kind || file.kind === 'file')

  let installationMarkdown = sections.get('installation')?.trim() || ''
  if (!installationMarkdown) {
    installationMarkdown = [
      '```bash',
      `pnpm dlx @weme-ui/weme-ui add ${config.name}/${item.name}`,
      '```',
    ].join('\n')
  }

  const usageMarkdown = (sections.get('usage') || '').trim()
  const propsRows = firstTableRows(splitBodySegments(sections.get('props') || ''))
  const eventsRows = firstTableRows(splitBodySegments(sections.get('events') || ''))
  const slotsRows = firstTableRows(splitBodySegments(sections.get('slots') || ''))
  const parametersRows = firstTableRows(splitBodySegments(sections.get('parameters') || ''))
  const returnsSegments = splitBodySegments(sections.get('returns') || '')
  const returnsMarkdown = markdownWithoutTables(returnsSegments)
  const returnsRows = firstTableRows(returnsSegments)
  const exportSections = splitMarkdownH2(stripped)
    .filter(section => !RESERVED_DOC_H2.has(section.title.trim().toLowerCase()))
    .map(section => ({
      title: section.title.trim(),
      markdown: section.body.trim(),
    }))
    .filter(section => section.title && section.markdown)
  const typeParts = splitMarkdownH3(sections.get('types') || '')
  const typeSections = typeParts.sections.map((section) => {
    const segments = splitBodySegments(section.body)
    return {
      title: unwrapInlineCode(section.title.trim()),
      markdown: markdownWithoutTables(segments),
      rows: firstTableRows(segments),
    }
  }).filter(section => section.title && (section.markdown || section.rows.length))

  const accessibilityRaw = sections.get('accessibility') || ''
  const accessibilityParts = splitMarkdownH3(accessibilityRaw)
  const keyboardSection = accessibilityParts.sections.find(section =>
    section.title.trim().toLowerCase() === 'keyboard interactions',
  )
  const keyboardRows = firstTableRows(splitBodySegments(keyboardSection?.body || ''))
  const accessibilityMarkdown = markdownWithoutTables(splitBodySegments(accessibilityParts.lead))

  const cssVarRows = hasCssVars(item.cssVars)
    ? cssVarsToRows(item.cssVars)
    : []
  const exampleClass = cssVarRows.length
    ? cssVarsExampleClass(item.cssVars)
    : undefined
  const cssVarIntro = exampleClass
    ? `可在 \`*.style.ts\` 或 \`class\` 中使用，例如 \`${exampleClass}\`。`
    : ''
  const cssVarNote = cssVarRows.length
    ? `\`error.9\` / \`success.7\` 等为语义色别名（色板阶），详见 [Tokens](${TOKENS_URL})。`
    : ''

  const outline: Header[] = []
  const used = new Map<string, number>()

  pushHeader(outline, used, 'Installation', 2)
  if (usageExample || usageMarkdown)
    pushHeader(outline, used, 'Usage', 2)
  if (featureExamples.length) {
    const examplesHeader = pushHeader(outline, used, 'Examples', 2)
    for (const example of featureExamples)
      pushHeader(outline, used, example.title, 3, examplesHeader)
  }
  if (propsRows.length)
    pushHeader(outline, used, 'Props', 2)
  if (eventsRows.length)
    pushHeader(outline, used, 'Events', 2)
  if (slotsRows.length)
    pushHeader(outline, used, 'Slots', 2)
  if (parametersRows.length)
    pushHeader(outline, used, 'Parameters', 2)
  if (returnsMarkdown || returnsRows.length)
    pushHeader(outline, used, 'Returns', 2)
  for (const section of exportSections)
    pushHeader(outline, used, section.title, 2)
  if (typeSections.length) {
    const typesHeader = pushHeader(outline, used, 'Types', 2)
    for (const section of typeSections)
      pushHeader(outline, used, section.title, 3, typesHeader)
  }
  if (cssVarRows.length)
    pushHeader(outline, used, 'CSS Variables', 2)
  if (accessibilityMarkdown || keyboardRows.length) {
    const accessibilityHeader = pushHeader(outline, used, 'Accessibility', 2)
    if (keyboardRows.length)
      pushHeader(outline, used, 'Keyboard Interactions', 3, accessibilityHeader)
  }
  if (sourceFiles.length)
    pushHeader(outline, used, 'Files', 2)

  return {
    name: item.name,
    title: item.title || item.name,
    description: item.description || '',
    lead,
    dependencies,
    installationMarkdown,
    usageMarkdown,
    usageExample,
    featureExamples,
    propsRows,
    eventsRows,
    slotsRows,
    parametersRows,
    returnsMarkdown,
    returnsRows,
    exportSections,
    typeSections,
    cssVarRows,
    cssVarIntro,
    cssVarNote,
    accessibilityMarkdown,
    keyboardRows,
    sourceFiles,
    outline,
  }
}

export function flattenOutline(headers: Header[]): Header[] {
  const list: Header[] = []
  for (const header of headers) {
    list.push(header)
    if (header.children.length)
      list.push(...flattenOutline(header.children))
  }
  return list
}
