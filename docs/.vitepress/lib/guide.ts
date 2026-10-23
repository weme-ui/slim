import type { DefaultTheme } from 'vitepress'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export const GUIDE_BASE = '/get-started/'

function titleFromFilename(name: string) {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function pageTitle(filePath: string, fallback: string) {
  const content = readFileSync(filePath, 'utf8')
  for (const line of content.split('\n')) {
    if (line.startsWith('# '))
      return line.slice(2).trim()
    const titlePrefix = 'title:'
    if (line.startsWith(titlePrefix))
      return line.slice(titlePrefix.length).trim().replace(/^['"]|['"]$/g, '')
  }
  return titleFromFilename(fallback)
}

function pageLink(name: string) {
  return name === 'index'
    ? GUIDE_BASE
    : `${GUIDE_BASE}${name}`
}

export function getGuideDir(docsDir: string) {
  return join(docsDir, 'get-started')
}

export function getGuidePages(docsDir: string): DefaultTheme.SidebarItem[] {
  const guideDir = getGuideDir(docsDir)
  if (!existsSync(guideDir) || !statSync(guideDir).isDirectory())
    return []

  const files = readdirSync(guideDir)
    .filter((file) => {
      if (!file.endsWith('.md'))
        return false
      const name = file.slice(0, -3)
      return !name.includes('[') && !name.includes(']')
    })
    .sort((a, b) => {
      if (a === 'index.md')
        return -1
      if (b === 'index.md')
        return 1
      return a.localeCompare(b)
    })

  const items: DefaultTheme.SidebarItem[] = []

  for (const file of files) {
    const fullPath = join(guideDir, file)
    if (!statSync(fullPath).isFile())
      continue

    const name = file.slice(0, -3)
    items.push({
      text: pageTitle(fullPath, name),
      link: pageLink(name),
    })
  }

  return items
}

export function getGuideSidebar(docsDir: string): DefaultTheme.SidebarItem[] {
  const items = getGuidePages(docsDir)
  if (!items.length)
    return []

  return [
    {
      text: 'Get started',
      items,
    },
  ]
}

export function firstGuideLink(docsDir: string): string {
  return getGuidePages(docsDir)[0]?.link || GUIDE_BASE
}
