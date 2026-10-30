#!/usr/bin/env bun
/**
 * Print one registry item and diff it against disk / frontmatter.
 * Usage: bun skills/create-docs/scripts/item.ts <name>
 * Exit 0 only when kind files and dependencies match.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

interface RegistryFile {
  kind?: string
  path: string
}

interface RegistryItem {
  name: string
  type?: string
  title?: string
  dependencies?: string[]
  files: RegistryFile[]
}

interface RegistryConfig {
  items: RegistryItem[]
}

const root = join(import.meta.dirname, '../../..')
const registryPath = join(root, 'registry.json')
const name = process.argv[2]

if (!name) {
  console.error('usage: bun skills/create-docs/scripts/item.ts <name>')
  process.exit(2)
}

const source = readFileSync(registryPath, 'utf8')
const registry = JSON.parse(source) as RegistryConfig
const index = registry.items.findIndex(entry => entry.name === name)

if (index < 0) {
  console.log(JSON.stringify({
    ok: false,
    error: 'not found',
    names: registry.items.map(entry => entry.name),
  }, null, 2))
  process.exit(1)
}

const item = registry.items[index]
const kinds = ['doc', 'example', 'test'] as const
const registered: Record<typeof kinds[number], string[]> = {
  doc: [],
  example: [],
  test: [],
}

for (const file of item.files) {
  if (file.kind === 'doc' || file.kind === 'example' || file.kind === 'test')
    registered[file.kind].push(posix(file.path))
}

const onDisk = diskFiles(item)
const missingFromRegistry = diff(onDisk, registered)
const dangling = diff(registered, onDisk)
const docPath = registered.doc[0] ?? onDisk.find(path => path.endsWith('.md') || path.endsWith('README.md'))
const frontmatter = docPath && existsSync(join(root, docPath))
  ? frontmatterDependencies(readFileSync(join(root, docPath), 'utf8'))
  : []
const dependencies = item.dependencies ?? []
const depsMatch = equal(frontmatter, dependencies)
const ok = missingFromRegistry.length === 0 && dangling.length === 0 && depsMatch
const nameToken = `"name": "${name}"`
const at = source.indexOf(nameToken)

console.log(JSON.stringify({
  ok,
  index,
  line: at >= 0
    ? source.slice(0, at).split('\n').length
    : null,
  neighbors: {
    prev: registry.items[index - 1]?.name ?? null,
    next: registry.items[index + 1]?.name ?? null,
  },
  item,
  registered,
  onDisk,
  missingFromRegistry,
  dangling,
  frontmatter,
  dependencies,
  depsMatch,
}, null, 2))

process.exit(ok ? 0 : 1)

function diskFiles(current: RegistryItem): string[] {
  if (current.type === 'composable') {
    const stem = join(root, 'src/composables', current.name)
    return existing([
      `${stem}.md`,
      `${stem}.test.ts`,
      ...vueFiles(join(root, 'src/composables', current.name, 'examples')),
    ])
  }

  const dir = join(root, 'src/components', current.name)
  return existing([
    join(dir, 'README.md'),
    ...vueFiles(join(dir, 'examples')),
    join(dir, `${current.name}.test.ts`),
  ])
}

function vueFiles(dir: string): string[] {
  if (!existsSync(dir))
    return []
  return readdirSync(dir)
    .filter(file => file.endsWith('.vue'))
    .sort()
    .map(file => join(dir, file))
}

function existing(paths: string[]): string[] {
  return paths.filter(path => existsSync(path)).map(path => posix(relative(root, path)))
}

function diff(left: string[] | Record<typeof kinds[number], string[]>, right: string[] | Record<typeof kinds[number], string[]>): string[] {
  const a = new Set(flat(left))
  const b = new Set(flat(right))
  return [...a].filter(path => !b.has(path))
}

function flat(value: string[] | Record<typeof kinds[number], string[]>): string[] {
  return Array.isArray(value)
    ? value
    : kinds.flatMap(kind => value[kind])
}

function equal(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, i) => value === b[i])
}

function posix(path: string): string {
  return path.split('\\').join('/')
}

function frontmatterDependencies(markdown: string): string[] {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown)
  if (!match)
    return []

  const names: string[] = []
  let inList = false
  for (const line of match[1].split(/\r?\n/)) {
    if (!inList) {
      if (!/^dependencies\s*:/.test(line.trim()))
        continue
      inList = true
      continue
    }
    if (!line.trimStart().startsWith('-'))
      break
    const value = line.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, '')
    if (value)
      names.push(value)
  }
  return names
}
