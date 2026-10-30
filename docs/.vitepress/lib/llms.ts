import type { Connect, Plugin, ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'
import type { ExampleRef, RegistryItem } from './registry.ts'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { getGuidePages, GUIDE_BASE } from './guide.ts'
import {
  extractLead,
  splitMarkdownH2,
  splitReadmeFrontmatter,
  stripLeadingH1,
} from './markdown.ts'
import {
  getComponentSidebar,
  getDocItems,
  resolveExamples,
} from './registry.ts'

export interface LlmsPage {
  path: string
  title: string
  description: string
  body: string
}

export interface LlmsPluginOptions {
  repoRoot: string
  docsDir: string
  base: string
  domain?: string
  title: string
  description: string
}

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

function yamlQuote(value: string) {
  return JSON.stringify(value)
}

function fence(lang: string, source: string) {
  const code = source.replace(/\n+$/, '')
  return `\`\`\`${lang}\n${code}\n\`\`\``
}

function guideFileFromLink(link: string) {
  if (link === GUIDE_BASE)
    return 'get-started/index.md'
  return `${link.replace(/^\//, '').replace(/\/$/, '')}.md`
}

function itemFilePath(item: RegistryItem) {
  return item.type === 'composable'
    ? `composables/${item.name}.md`
    : `components/${item.name}.md`
}

function fillReadmeExamples(body: string, examples: ExampleRef[], repoRoot: string) {
  const usage = examples.find(example => example.name === 'usage')
  const features = examples.filter(example => example.name !== 'usage')
  const sections = splitMarkdownH2(stripLeadingH1(body))
  let result = body

  if (usage) {
    const usageSection = sections.find(section => section.title.toLowerCase() === 'usage')
    if (usageSection && !usageSection.body.trim()) {
      const code = fence('vue', readRepoFile(repoRoot, usage.path))
      result = result.replace(/^## Usage[ \t]*$/m, `## Usage\n\n${code}`)
    }
  }

  const hasExamples = sections.some(section => section.title.toLowerCase() === 'examples')
  if (features.length && !hasExamples) {
    const blocks = features.map((example) => {
      const code = fence('vue', readRepoFile(repoRoot, example.path))
      return `### ${example.title}\n\n${code}`
    })
    result = `${result.trim()}\n\n## Examples\n\n${blocks.join('\n\n')}\n`
  }

  return result
}

export function buildLlmsMarkdown(item: RegistryItem, repoRoot: string) {
  const docFile = item.files.find(file => file.kind === 'doc')
  const { body } = splitReadmeFrontmatter(readRepoFile(repoRoot, docFile?.path))
  return fillReadmeExamples(body, resolveExamples(item), repoRoot).trim()
}

function guideDescription(markdown: string) {
  const { body } = splitReadmeFrontmatter(markdown)
  return extractLead(stripLeadingH1(body)).split('\n')[0]?.trim() || ''
}

export function collectLlmsPages(repoRoot: string, docsDir: string): LlmsPage[] {
  const pages: LlmsPage[] = []

  for (const item of getGuidePages(docsDir)) {
    if (!item.link || !item.text)
      continue
    const path = guideFileFromLink(item.link)
    const markdown = readRepoFile(docsDir, path)
    const { body } = splitReadmeFrontmatter(markdown)
    pages.push({
      path,
      title: item.text,
      description: guideDescription(markdown),
      body: (body.trim() || markdown).trim(),
    })
  }

  for (const item of getDocItems()) {
    pages.push({
      path: itemFilePath(item),
      title: item.title || item.name,
      description: item.description || '',
      body: buildLlmsMarkdown(item, repoRoot),
    })
  }

  return pages
}

function joinUrl(domain: string | undefined, base: string, filePath: string) {
  const prefix = domain
    ? `${domain}${base}`
    : base
  return `${prefix}${filePath}`.replace(/([^:/])\/{2,}/g, '$1/')
}

function pageMarkdown(page: LlmsPage, options: Pick<LlmsPluginOptions, 'base' | 'domain'>) {
  const url = joinUrl(options.domain, options.base, page.path)
  const lines = [
    '---',
    `title: ${yamlQuote(page.title)}`,
    page.description
      ? `description: ${yamlQuote(page.description)}`
      : '',
    `url: ${url}`,
    '---',
    '',
    page.body,
    '',
  ]
  return lines.filter(line => line !== '').join('\n')
}

function tocEntry(page: LlmsPage, options: Pick<LlmsPluginOptions, 'base' | 'domain'>) {
  const href = joinUrl(options.domain, options.base, page.path)
  const description = page.description
    ? `: ${page.description}`
    : ''
  return `- [${page.title}](${href})${description}`
}

function matchPage(link: string | undefined, pages: Map<string, LlmsPage>) {
  if (!link)
    return
  const file = link.endsWith('.txt')
    ? undefined
    : link === GUIDE_BASE
      ? 'get-started/index.md'
      : `${link.replace(/^\//, '').replace(/\/$/, '')}.md`
  return file
    ? pages.get(file)
    : undefined
}

function renderToc(
  sidebar: DefaultTheme.SidebarItem[],
  pages: Map<string, LlmsPage>,
  options: Pick<LlmsPluginOptions, 'base' | 'domain'>,
) {
  const lines: string[] = []

  for (const group of sidebar) {
    if (group.items?.length) {
      const entries = group.items
        .map(item => matchPage(item.link, pages))
        .filter((page): page is LlmsPage => Boolean(page))
        .map(page => tocEntry(page, options))
      if (!entries.length)
        continue
      if (group.text)
        lines.push(`### ${group.text}`, '')
      lines.push(...entries, '')
      continue
    }

    const page = matchPage(group.link, pages)
    if (page)
      lines.push(tocEntry(page, options), '')
  }

  return lines.join('\n').trim()
}

export function llmsSidebar(docsDir: string): DefaultTheme.SidebarItem[] {
  const guidePages = getGuidePages(docsDir)
  return [
    ...guidePages.length
      ? [
          {
            text: 'Get started',
            items: guidePages,
          },
        ]
      : [],
    ...getComponentSidebar().filter(item => item.link !== '/components/'),
  ]
}

export function renderLlmsTxt(pages: LlmsPage[], options: LlmsPluginOptions) {
  const byPath = new Map(pages.map(page => [page.path, page]))
  const toc = renderToc(llmsSidebar(options.docsDir), byPath, options)
  return [
    `# ${options.title}`,
    '',
    `> ${options.description}`,
    '',
    '## Table of Contents',
    '',
    toc,
    '',
  ].join('\n')
}

export function renderLlmsFullTxt(pages: LlmsPage[], options: Pick<LlmsPluginOptions, 'base' | 'domain'>) {
  return pages
    .map(page => pageMarkdown(page, options))
    .join('\n---\n\n')
}

function pageAliases(page: LlmsPage) {
  const aliases = [page.path]
  if (page.path.endsWith('/index.md'))
    aliases.push(page.path.replace(/\/index\.md$/, '.md'))
  return aliases
}

function writeLlmsOutput(outDir: string, pages: LlmsPage[], options: LlmsPluginOptions) {
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'llms.txt'), renderLlmsTxt(pages, options))
  writeFileSync(join(outDir, 'llms-full.txt'), renderLlmsFullTxt(pages, options))

  for (const page of pages) {
    const markdown = pageMarkdown(page, options)
    for (const file of pageAliases(page)) {
      const target = join(outDir, file)
      mkdirSync(dirname(target), { recursive: true })
      writeFileSync(target, markdown)
    }
  }
}

function watchLlmsSources(server: ViteDevServer, options: LlmsPluginOptions) {
  const roots = [
    join(options.docsDir, 'get-started'),
    join(options.repoRoot, 'src/components'),
    join(options.repoRoot, 'src/composables'),
    join(options.repoRoot, 'registry.json'),
  ]
  for (const root of roots)
    server.watcher.add(root)
}

function isViteModuleRequest(req: Connect.IncomingMessage) {
  const url = req.url ?? ''
  const query = url.split('?')[1] ?? ''
  if (/(?:^|&)(?:import|direct|vue|t=)/.test(query))
    return true
  const accept = req.headers.accept ?? ''
  if (accept.includes('javascript'))
    return true
  return req.headers['sec-fetch-dest'] === 'script'
}

function serveLlmsMiddleware(options: LlmsPluginOptions): Plugin['configureServer'] {
  return (server) => {
    watchLlmsSources(server, options)

    return () => {
      server.middlewares.use((req, res, next) => {
        if (isViteModuleRequest(req)) {
          next()
          return
        }

        const url = req.url?.split('?')[0] ?? ''
        const base = options.base.endsWith('/')
          ? options.base
          : `${options.base}/`
        if (!url.startsWith(base) || (!url.endsWith('.md') && !url.endsWith('.txt'))) {
          next()
          return
        }

        const relative = decodeURIComponent(url.slice(base.length))
        const pages = collectLlmsPages(options.repoRoot, options.docsDir)

        if (relative === 'llms.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(renderLlmsTxt(pages, options))
          return
        }
        if (relative === 'llms-full.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(renderLlmsFullTxt(pages, options))
          return
        }

        const page = pages.find(item => pageAliases(item).includes(relative))
        if (!page) {
          next()
          return
        }

        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(pageMarkdown(page, options))
      })
    }
  }
}

export function docsLlmsPlugin(options: LlmsPluginOptions): Plugin {
  let outDir = ''
  let isSsrBuild = false

  return {
    name: 'weme-llms-pages',
    enforce: 'post',
    configResolved(config) {
      outDir = config.build.outDir
      isSsrBuild = Boolean(config.build.ssr)
    },
    configureServer: serveLlmsMiddleware(options),
    closeBundle() {
      if (isSsrBuild || !outDir)
        return
      writeLlmsOutput(outDir, collectLlmsPages(options.repoRoot, options.docsDir), options)
    },
  }
}
