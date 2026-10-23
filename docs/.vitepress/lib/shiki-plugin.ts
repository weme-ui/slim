import type { Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { highlightCode, renderHighlightedMarkdown } from './highlight-code.ts'
import { buildComponentPage, getDocItems } from './registry.ts'

const VIRTUAL_ID = 'virtual:docs-highlighted'
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`
const SHIKI_PREFIX = '\0shiki:'

function readRepoFile(repoRoot: string, path?: string) {
  if (!path)
    return ''
  try {
    return readFileSync(resolve(repoRoot, path), 'utf8')
  }
  catch {
    return ''
  }
}

function parseIdQuery(id: string) {
  const queryIndex = id.indexOf('?')
  if (queryIndex === -1)
    return { filename: id, query: '' }
  return {
    filename: id.slice(0, queryIndex),
    query: id.slice(queryIndex + 1),
  }
}

export function docsShikiPlugin(repoRoot: string): Plugin {
  return {
    name: 'docs-shiki',
    enforce: 'pre',
    async resolveId(id, importer) {
      if (id === VIRTUAL_ID)
        return RESOLVED_VIRTUAL_ID
      if (id.startsWith('\0'))
        return

      const { filename, query } = parseIdQuery(id)
      if (!new URLSearchParams(query).has('shiki'))
        return

      const resolved = await this.resolve(filename, importer, { skipSelf: true })
      const file = (resolved?.id || filename).split('?')[0]!
      return `${SHIKI_PREFIX}${file}?${query}`
    },
    async load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const installationHtml: Record<string, string> = {}
        const usageHtml: Record<string, string> = {}
        for (const item of getDocItems()) {
          const docFile = item.files.find(file => file.kind === 'doc')
          if (docFile?.path)
            this.addWatchFile(resolve(repoRoot, docFile.path))
          const page = buildComponentPage(item, readRepoFile(repoRoot, docFile?.path))
          installationHtml[item.name] = await renderHighlightedMarkdown(page.installationMarkdown)
          if (page.usageMarkdown)
            usageHtml[item.name] = await renderHighlightedMarkdown(page.usageMarkdown)
        }
        this.addWatchFile(resolve(repoRoot, 'registry.json'))
        return [
          `export const installationHtml = ${JSON.stringify(installationHtml)}`,
          `export const usageHtml = ${JSON.stringify(usageHtml)}`,
        ].join('\n')
      }

      if (!id.startsWith(SHIKI_PREFIX))
        return

      const original = id.slice(SHIKI_PREFIX.length)
      const { filename, query } = parseIdQuery(original)
      const lang = new URLSearchParams(query).get('lang')
      const code = readFileSync(filename, 'utf8')
      this.addWatchFile(filename)
      const html = await highlightCode(code, lang)
      return `export default ${JSON.stringify(html)}\n`
    },
  }
}
