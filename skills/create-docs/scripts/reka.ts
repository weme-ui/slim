#!/usr/bin/env bun
/**
 * Query the local Reka UI docs index, then fetch one page.
 * Usage:
 *   bun skills/create-docs/scripts/reka.ts <name>
 *   bun skills/create-docs/scripts/reka.ts --refresh
 * Exit 0 when one page is printed, or when --refresh replaces the cache.
 */
import type { Buffer } from 'node:buffer'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

interface Entry {
  title: string
  slug: string
  leaf: string
  path: string
  description: string
}

interface Selection {
  match: Entry | null
  matches: Entry[]
}

interface CurlResult {
  ok: boolean
  body: string
  error: string
}

const root = join(import.meta.dirname, '../../..')
const cachePath = join(root, 'skills/create-docs/refs/reka-ui.txt')
const origin = 'https://reka-ui.com'
const indexUrl = `${origin}/llms.txt`
const headerMark = '# @reka-cache'
const cacheHeader = [
  `${headerMark} 来源：${indexUrl}`,
  `${headerMark} 刷新：bun skills/create-docs/scripts/reka.ts --refresh`,
  `${headerMark} 查询只读本文件，不会请求索引`,
  '',
].join('\n')

// eslint-disable-next-line regexp/no-super-linear-backtracking
const entryPattern =
  /^- \[([^\]]+)\]\((\/docs\/(components|utilities)\/([a-z0-9-]+)\.md)\)(?::\s*(.*))?$/

const args = process.argv.slice(2)
if (args.length === 1 && args[0] === '--refresh') refreshIndex()
else if (args.length === 1 && !args[0].startsWith('-')) queryIndex(args[0])
else usage()

function usage(): never {
  console.error('usage: bun skills/create-docs/scripts/reka.ts <name>')
  console.error('       bun skills/create-docs/scripts/reka.ts --refresh')
  process.exit(2)
}

function finish(payload: unknown, code: number): never {
  console.log(JSON.stringify(payload, null, 2))
  process.exit(code)
}

function refreshIndex(): never {
  const result = curl(indexUrl)
  if (!result.ok || isHtml(result.body) || parseIndex(result.body).length === 0) {
    finish(
      {
        ok: false,
        error: 'refresh failed',
        hint: '旧缓存未改。不要改用浏览器或 WebFetch，也不要在查询路径请求索引。',
        ...(result.error
          ? {
              detail: clip(result.error),
            }
          : {}),
      },
      1,
    )
  }

  const body = result.body.endsWith('\n') ? result.body : `${result.body}\n`
  const next = `${cacheHeader}${body}`
  const tmp = `${cachePath}.${process.pid}.tmp`
  try {
    writeFileSync(tmp, next)
    renameSync(tmp, cachePath)
  } catch (error) {
    rmSync(tmp, { force: true })
    const message = error instanceof Error ? error.message : 'write failed'
    finish(
      {
        ok: false,
        error: 'refresh failed',
        hint: '旧缓存未改。不要改用浏览器或 WebFetch，也不要在查询路径请求索引。',
        detail: message,
      },
      1,
    )
  }

  finish(
    {
      ok: true,
      refreshed: true,
      entries: parseIndex(next).length,
      path: posix(relative(root, cachePath)),
    },
    0,
  )
}

function queryIndex(name: string): never {
  if (!existsSync(cachePath)) {
    finish(
      {
        ok: false,
        error: 'cache missing',
        hint: '跑 bun skills/create-docs/scripts/reka.ts --refresh。查询不会请求索引。',
      },
      1,
    )
  }

  const entries = parseIndex(readFileSync(cachePath, 'utf8'))
  if (entries.length === 0) {
    finish(
      {
        ok: false,
        error: 'cache missing',
        hint: '跑 bun skills/create-docs/scripts/reka.ts --refresh。查询不会请求索引。',
      },
      1,
    )
  }

  const selected = selectEntry(name, entries)
  if (!selected.match) {
    const ambiguous = selected.matches.length > 0
    finish(
      {
        ok: false,
        error: ambiguous ? 'ambiguous' : 'not found',
        query: name,
        matches: selected.matches.map(publish),
        ...(ambiguous
          ? {}
          : {
              slugs: entries.map((entry) => entry.slug).toSorted(),
            }),
        hint: ambiguous
          ? '本地索引命中多个 slug。不要自己抓单页；改读源码，或 Shell 读 node_modules 里的 *Props。'
          : '本地索引没有这个 slug。不要改用浏览器或 WebFetch。',
      },
      1,
    )
  }

  const match = selected.match
  const page = curl(`${origin}${match.path}`)
  if (!page.ok || isHtml(page.body)) {
    finish(
      {
        ok: false,
        error: 'fetch failed',
        query: name,
        match: publish(match),
        hint: '单页超时或非 2xx。改走 node_modules 里的 *Props。禁止改用浏览器或 WebFetch。',
        detail: clip(page.error || (isHtml(page.body) ? 'html body' : 'empty body')),
      },
      1,
    )
  }

  finish(
    {
      ok: true,
      query: name,
      match: publish(match),
      body: page.body,
    },
    0,
  )
}

function selectEntry(name: string, entries: Entry[]): Selection {
  const query = normalizeName(name)
  if (!query) return { match: null, matches: [] }

  const direct = entries.filter((entry) => entry.leaf === query).toSorted(bySlug)
  if (direct.length === 1) return { match: direct[0] ?? null, matches: direct }
  if (direct.length > 1) return { match: null, matches: direct }

  const aliases = new Set(derivedKeys(query))
  const aliasHits = entries.filter((entry) => aliases.has(entry.leaf)).toSorted(bySlug)
  if (aliasHits.length === 1) return { match: aliasHits[0] ?? null, matches: aliasHits }
  if (aliasHits.length > 1) return { match: null, matches: aliasHits }

  const fuzzy = entries
    .filter((entry) => query.startsWith(`${entry.leaf}-`) || entry.leaf.startsWith(`${query}-`))
    .toSorted(bySlug)
  if (fuzzy.length === 0) return { match: null, matches: [] }

  const longest = Math.max(...fuzzy.map((entry) => entry.leaf.length))
  const best = fuzzy.filter((entry) => entry.leaf.length === longest)
  if (best.length === 1) return { match: best[0] ?? null, matches: best }
  return { match: null, matches: best }
}

function derivedKeys(query: string): string[] {
  const tokens = query.split('-').filter(Boolean)
  const keys = new Set<string>()
  const withoutButton = tokens.filter((token) => token !== 'button')
  if (withoutButton.length > 0 && withoutButton.length < tokens.length)
    keys.add(withoutButton.join('-'))

  const swapped = tokens.map(swapInputField).join('-')
  if (swapped && swapped !== query) keys.add(swapped)

  if (withoutButton.length > 0 && withoutButton.length < tokens.length) {
    const swappedWithoutButton = withoutButton.map(swapInputField).join('-')
    if (swappedWithoutButton && swappedWithoutButton !== query) keys.add(swappedWithoutButton)
  }

  keys.delete(query)
  return [...keys]
}

function swapInputField(token: string): string {
  if (token === 'input') return 'field'
  if (token === 'field') return 'input'
  return token
}

function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseIndex(text: string): Entry[] {
  const entries: Entry[] = []
  for (const line of stripHeader(text).split(/\r?\n/)) {
    const matched = entryPattern.exec(line)
    if (!matched) continue
    const title = matched[1]
    const path = matched[2]
    const area = matched[3]
    const leaf = matched[4]
    if (!title || !path || !area || !leaf) continue
    entries.push({
      title,
      path,
      leaf,
      slug: `${area}/${leaf}`,
      description: matched[5] ?? '',
    })
  }
  return entries
}

function stripHeader(text: string): string {
  const lines = text.split(/\r?\n/)
  let index = 0
  // oxlint-disable-next-line no-unmodified-loop-condition
  while (index < lines.length && lines[index]?.startsWith(headerMark)) index++
  if (index > 0 && lines[index] === '') index++
  return lines.slice(index).join('\n')
}

function publish(entry: Entry): Pick<Entry, 'title' | 'slug' | 'path' | 'description'> {
  return {
    title: entry.title,
    slug: entry.slug,
    path: entry.path,
    description: entry.description,
  }
}

function curl(url: string): CurlResult {
  const result = spawnSync(
    'curl',
    ['--fail', '--max-time', '20', '--silent', '--show-error', '--location', '--url', url],
    {
      encoding: 'utf8',
      timeout: 25_000,
      maxBuffer: 2 * 1024 * 1024,
    },
  )

  if (result.error) {
    return {
      ok: false,
      body: '',
      error: result.error.message,
    }
  }

  const stdout = asText(result.stdout)
  const stderr = asText(result.stderr).trim()
  if (result.status !== 0) {
    return {
      ok: false,
      body: '',
      error: stderr || `curl exited ${result.status ?? 'null'}`,
    }
  }
  if (!stdout.trim()) {
    return {
      ok: false,
      body: '',
      error: stderr || 'empty body',
    }
  }

  return {
    ok: true,
    body: stdout,
    error: '',
  }
}

function asText(value: string | Buffer | null | undefined): string {
  if (value === null || value === undefined) return ''
  return typeof value === 'string' ? value : value.toString('utf8')
}

function isHtml(body: string): boolean {
  const start = body.trimStart().slice(0, 15).toLowerCase()
  return start.startsWith('<!doctype') || start.startsWith('<html')
}

function clip(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length <= 500) return trimmed
  return `${trimmed.slice(0, 500)}…`
}

function bySlug(left: Entry, right: Entry): number {
  return left.slug.localeCompare(right.slug)
}

function posix(path: string): string {
  return path.split('\\').join('/')
}
