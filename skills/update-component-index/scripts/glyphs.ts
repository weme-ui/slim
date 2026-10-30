#!/usr/bin/env bun
/**
 * Diff registry type:component names against ComponentGlyph.vue v-if branches.
 * Usage: bun skills/update-component-index/scripts/glyphs.ts [name]
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

interface RegistryItem {
  name: string
  type?: string
}

const root = join(import.meta.dirname, '../../..')
const registry = JSON.parse(readFileSync(join(root, 'registry.json'), 'utf8')) as { items: RegistryItem[] }
const glyphSource = readFileSync(
  join(root, 'docs/.vitepress/theme/components/ComponentGlyph.vue'),
  'utf8',
)
const components = registry.items
  .filter(item => item.type === 'component')
  .map(item => item.name)
const glyphs = [
  ...glyphSource.matchAll(/name === '([^']+)'/g),
].map(match => match[1])
const glyphSet = new Set(glyphs)
const missing = components.filter(name => !glyphSet.has(name))
const extra = glyphs.filter(name => !components.includes(name))
const name = process.argv[2]
const index = name
  ? components.indexOf(name)
  : -1
const prefix = name?.split('-')[0]
const analogs = name
  ? unique([
      ...glyphs.filter(glyph => glyph === name || (prefix != null && glyph.startsWith(`${prefix}-`))),
      ...components.filter(item => item === name || (prefix != null && item.startsWith(`${prefix}-`))),
    ])
  : []

const payload = {
  ok: missing.length === 0 && extra.length === 0 && (!name || glyphs.includes(name)),
  components: components.length,
  glyphs: glyphs.length,
  missing,
  extra,
  ...(name
    ? {
        name,
        hasItem: index >= 0,
        hasGlyph: glyphs.includes(name),
        neighbors: {
          prev: index > 0
            ? components[index - 1]
            : null,
          next: index >= 0
            ? components[index + 1] ?? null
            : null,
        },
        analogs,
      }
    : {}),
}

console.log(JSON.stringify(payload, null, 2))
process.exit(payload.ok ? 0 : 1)

function unique(values: string[]): string[] {
  return [
    ...new Set(values),
  ]
}
