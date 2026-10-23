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

export interface ComponentPageModel {
  name: string
  title: string
  description: string
  lead: string
  dependencies: string[]
  installationMarkdown: string
  usageExample?: ExampleRef
  featureExamples: ExampleRef[]
  propsRows: ApiRow[]
  eventsRows: ApiRow[]
  slotsRows: ApiRow[]
  cssVarRows: ApiRow[]
  cssVarIntro: string
  cssVarNote: string
  accessibilityMarkdown: string
  keyboardRows: ApiRow[]
  sourceFiles: RegistryFile[]
  outline: Header[]
}

const TOKENS_URL = 'https://weme-ui.github.io/weme-ui/unocss-preset/docs/theme/tokens/'

export const registry = registryJson as RegistryConfig

export function getComponentItems(config: RegistryConfig = registry): RegistryItem[] {
  return config.items.filter(item => item.type === 'component')
}

export function getRegistryItem(name: string, config: RegistryConfig = registry): RegistryItem | undefined {
  return getComponentItems(config).find(item => item.name === name)
}

export function componentHref(name: string): string {
  return `/components/${name}`
}

export function firstComponentLink(config: RegistryConfig = registry): string {
  const first = getComponentItems(config)[0]
  return first ? componentHref(first.name) : '/components/'
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
      link: componentHref(item.name),
    })
  }

  return [...groups.values()].map(group => ({
    text: group.label,
    items: group.items,
    collapsed: false,
  }))
}

export function fileBasename(path: string, ext = ''): string {
  const name = path.split('/').pop() || path
  return ext && name.endsWith(ext) ? name.slice(0, -ext.length) : name
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
  const { dependencies, body } = splitReadmeFrontmatter(readme)
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

  const propsRows = firstTableRows(splitBodySegments(sections.get('props') || ''))
  const eventsRows = firstTableRows(splitBodySegments(sections.get('events') || ''))
  const slotsRows = firstTableRows(splitBodySegments(sections.get('slots') || ''))

  const accessibilityRaw = sections.get('accessibility') || ''
  const accessibilityParts = splitMarkdownH3(accessibilityRaw)
  const keyboardSection = accessibilityParts.sections.find(section =>
    section.title.trim().toLowerCase() === 'keyboard interactions',
  )
  const keyboardRows = firstTableRows(splitBodySegments(keyboardSection?.body || ''))
  const accessibilityMarkdown = markdownWithoutTables(splitBodySegments(accessibilityParts.lead))

  const cssVarRows = hasCssVars(item.cssVars) ? cssVarsToRows(item.cssVars) : []
  const exampleClass = cssVarRows.length ? cssVarsExampleClass(item.cssVars) : undefined
  const cssVarIntro = exampleClass
    ? `可在 \`*.style.ts\` 或 \`class\` 中使用，例如 \`${exampleClass}\`。`
    : ''
  const cssVarNote = cssVarRows.length
    ? `\`error.9\` / \`success.7\` 等为语义色别名（色板阶），详见 [Tokens](${TOKENS_URL})。`
    : ''

  const outline: Header[] = []
  const used = new Map<string, number>()

  pushHeader(outline, used, 'Installation', 2)
  if (usageExample || (sections.get('usage') || '').trim())
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
    usageExample,
    featureExamples,
    propsRows,
    eventsRows,
    slotsRows,
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
