export interface MarkdownH2Section {
  title: string
  body: string
}

export interface MarkdownH3Section {
  title: string
  body: string
}

export interface ApiRow {
  name: string
  description?: string
  type?: string
  default?: string
}

export type BodySegment
  = | { type: 'markdown', content: string }
    | { type: 'table', rows: ApiRow[] }

const NAME_HEADERS = new Set([
  '属性',
  'prop',
  'props',
  'name',
  '插槽',
  'slot',
  'slots',
  'event',
  'events',
  '事件',
  'key',
  'css variable',
  'variable',
])

const DESCRIPTION_HEADERS = new Set(['说明', 'description', 'desc'])
const TYPE_HEADERS = new Set(['类型', 'type'])
const DEFAULT_HEADERS = new Set(['默认值', 'default', 'value'])

const NPM_PACKAGE_NAME = /^(?:@[a-z0-9][\w.~-]*\/)?[a-z0-9][\w.~-]*$/i

export function splitReadmeFrontmatter(source = ''): { dependencies: string[], body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n)?/.exec(source)
  if (!match)
    return { dependencies: [], body: source }

  return {
    dependencies: readFrontmatterDependencies(match[1] ?? ''),
    body: source.slice(match[0].length).replace(/^(?:\r?\n)+/, ''),
  }
}

function readFrontmatterDependencies(raw: string): string[] {
  const trimmed = raw.trim()
  if (!trimmed)
    return []
  if (trimmed.startsWith('{'))
    return readJsonDependencies(trimmed)
  return readYamlDependencies(trimmed)
}

function readJsonDependencies(raw: string): string[] {
  try {
    const data = JSON.parse(raw) as { dependencies?: unknown }
    return normalizeDependencies(data.dependencies)
  }
  catch {
    return []
  }
}

function readYamlDependencies(raw: string): string[] {
  const names: string[] = []
  let inList = false

  for (const line of raw.split(/\r?\n/)) {
    if (!inList) {
      const header = /^dependencies\s*:/.exec(line.trim())
      if (!header)
        continue
      const inline = line.trim().slice(header[0].length).trim()
      if (inline)
        names.push(...readInlineDependencyList(inline))
      else
        inList = true
      continue
    }

    if (/^\s*-\s+/.test(line)) {
      names.push(unquote(line.replace(/^\s*-\s+/, '').trim()))
      continue
    }
    if (line.trim() === '')
      continue
    break
  }

  return normalizeDependencies(names)
}

function readInlineDependencyList(value: string): string[] {
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map(part => unquote(part.trim()))
      .filter(Boolean)
  }
  return [unquote(value)]
}

function unquote(value: string): string {
  if (
    (value.startsWith('\'') && value.endsWith('\''))
    || (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function normalizeDependencies(value: unknown): string[] {
  if (typeof value === 'string')
    return NPM_PACKAGE_NAME.test(value) ? [value] : []
  if (!Array.isArray(value))
    return []
  return value.filter((item): item is string => typeof item === 'string' && NPM_PACKAGE_NAME.test(item))
}

export function stripLeadingH1(source = ''): string {
  if (!source.startsWith('# '))
    return source
  const newline = source.indexOf('\n')
  if (newline < 0)
    return ''
  let end = newline + 1
  while (end < source.length && (source[end] === '\n' || source[end] === '\r'))
    end++
  return source.slice(end)
}

export function extractLead(markdown = ''): string {
  const lines = markdown.split('\n')
  const lead: string[] = []
  for (const line of lines) {
    if (/^## (?!#)/.test(line))
      break
    lead.push(line)
  }
  return lead.join('\n').trim()
}

export function splitMarkdownH2(markdown = ''): MarkdownH2Section[] {
  const lines = markdown.split('\n')
  const sections: MarkdownH2Section[] = []
  let current: MarkdownH2Section | null = null

  for (const line of lines) {
    if (/^## (?!#)/.test(line)) {
      if (current)
        sections.push(current)
      current = {
        title: line.slice(3).trim(),
        body: '',
      }
      continue
    }
    if (!current)
      continue
    current.body += `${current.body ? '\n' : ''}${line}`
  }

  if (current)
    sections.push(current)

  return sections.map(section => ({
    ...section,
    body: section.body.replace(/^\n+/, '').replace(/\n+$/, ''),
  }))
}

export function splitMarkdownH3(markdown = ''): { lead: string, sections: MarkdownH3Section[] } {
  const lines = markdown.split('\n')
  const sections: MarkdownH3Section[] = []
  const leadLines: string[] = []
  let current: MarkdownH3Section | null = null

  for (const line of lines) {
    if (/^### (?!#)/.test(line)) {
      if (current)
        sections.push(current)
      current = {
        title: line.slice(4).trim(),
        body: '',
      }
      continue
    }
    if (!current) {
      leadLines.push(line)
      continue
    }
    current.body += `${current.body ? '\n' : ''}${line}`
  }

  if (current)
    sections.push(current)

  return {
    lead: leadLines.join('\n').replace(/^\n+/, '').replace(/\n+$/, ''),
    sections: sections.map(section => ({
      ...section,
      body: section.body.replace(/^\n+/, '').replace(/\n+$/, ''),
    })),
  }
}

export function slugifyHeading(text: string, used = new Map<string, number>()): string {
  const base = text
    .toLowerCase()
    .replace(/[^\w\u4E00-\u9FFF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  const count = used.get(base) || 0
  used.set(base, count + 1)
  return count === 0 ? base : `${base}-${count}`
}

export function humanizeExampleName(slug: string, itemName?: string): string {
  let value = slug
  if (itemName && value.startsWith(`${itemName}-`))
    value = value.slice(itemName.length + 1)
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function splitBodySegments(body = ''): BodySegment[] {
  const lines = body.split('\n')
  const segments: BodySegment[] = []
  let markdownLines: string[] = []
  let i = 0

  function flushMarkdown() {
    const content = markdownLines.join('\n').trim()
    if (content)
      segments.push({ type: 'markdown', content })
    markdownLines = []
  }

  while (i < lines.length) {
    if (isTableStart(lines, i)) {
      flushMarkdown()
      const { rows, end } = readTable(lines, i)
      if (rows.length)
        segments.push({ type: 'table', rows })
      i = end
      continue
    }
    markdownLines.push(lines[i]!)
    i++
  }

  flushMarkdown()
  return segments
}

function isTableStart(lines: string[], index: number): boolean {
  const line = lines[index]
  const next = lines[index + 1]
  if (!line || !next)
    return false
  return isTableRow(line) && isTableSeparator(next)
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.includes('|', 1)
}

function isTableSeparator(line: string): boolean {
  const cells = splitTableRow(line)
  return cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell.replace(/\s/g, '')))
}

function readTable(lines: string[], start: number): { rows: ApiRow[], end: number } {
  const headers = splitTableRow(lines[start]!).map(normalizeHeader)
  let i = start + 2
  const rows: ApiRow[] = []

  while (i < lines.length && isTableRow(lines[i]!) && !isTableSeparator(lines[i]!)) {
    const cells = splitTableRow(lines[i]!)
    const row: ApiRow = { name: '' }
    headers.forEach((key, index) => {
      const value = cells[index]?.trim() ?? ''
      if (key === 'name')
        row.name = unwrapInlineCode(value)
      else if (key === 'description')
        row.description = value
      else if (key === 'type')
        row.type = unwrapInlineCode(value)
      else if (key === 'default')
        row.default = unwrapInlineCode(value)
    })
    if (row.name)
      rows.push(row)
    i++
  }

  return { rows, end: i }
}

function splitTableRow(line: string): string[] {
  let inner = line.trim()
  if (inner.startsWith('|'))
    inner = inner.slice(1)
  if (inner.endsWith('|'))
    inner = inner.slice(0, -1)

  const cells: string[] = []
  let current = ''
  let escaped = false
  for (const ch of inner) {
    if (escaped) {
      current += ch
      escaped = false
      continue
    }
    if (ch === '\\') {
      escaped = true
      continue
    }
    if (ch === '|') {
      cells.push(current.trim())
      current = ''
      continue
    }
    current += ch
  }
  cells.push(current.trim())
  return cells
}

function normalizeHeader(header: string): 'name' | 'description' | 'type' | 'default' | 'other' {
  const key = header.replace(/[`*_]/g, '').trim().toLowerCase()
  if (NAME_HEADERS.has(key))
    return 'name'
  if (DESCRIPTION_HEADERS.has(key))
    return 'description'
  if (TYPE_HEADERS.has(key))
    return 'type'
  if (DEFAULT_HEADERS.has(key))
    return 'default'
  return 'other'
}

export function unwrapInlineCode(value: string): string {
  const trimmed = value.trim()
  if (trimmed.startsWith('`') && trimmed.endsWith('`') && trimmed.length >= 2)
    return trimmed.slice(1, -1)
  return trimmed
}

export function firstTableRows(segments: BodySegment[]): ApiRow[] {
  return segments.find(segment => segment.type === 'table')?.rows ?? []
}

export function markdownWithoutTables(segments: BodySegment[]): string {
  return segments
    .filter(segment => segment.type === 'markdown')
    .map(segment => segment.content)
    .join('\n\n')
    .trim()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function renderBlocks(source: string): string {
  return source
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => `<p>${renderInlineMarkdown(block).replace(/\n/g, '<br>')}</p>`)
    .join('\n')
}

export interface MarkdownFencePart {
  type: 'text' | 'fence'
  content: string
  lang?: string
}

export function parseMarkdownFences(source: string): MarkdownFencePart[] {
  const parts: MarkdownFencePart[] = []
  const fence = /```(\w*)\n([\s\S]*?)```/g
  let last = 0
  let match = fence.exec(source)
  while (match) {
    if (match.index > last)
      parts.push({ type: 'text', content: source.slice(last, match.index) })
    parts.push({
      type: 'fence',
      lang: match[1] || 'txt',
      content: match[2]!.replace(/\n$/, ''),
    })
    last = match.index + match[0].length
    match = fence.exec(source)
  }
  if (last < source.length)
    parts.push({ type: 'text', content: source.slice(last) })
  return parts
}

export function renderMarkdownBlocks(source: string): string {
  return renderBlocks(source)
}

function renderFenceFallback(lang: string, code: string): string {
  return `<div class="language-${lang}"><pre class="shiki"><code>${escapeHtml(code)}</code></pre></div>`
}

export function renderMarkdown(source = ''): string {
  if (!source.trim())
    return ''

  return parseMarkdownFences(source)
    .map((part) => {
      if (part.type === 'text')
        return renderBlocks(part.content)
      return renderFenceFallback(part.lang || 'txt', part.content)
    })
    .filter(Boolean)
    .join('\n')
}
