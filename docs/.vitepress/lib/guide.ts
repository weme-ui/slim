import type { DefaultTheme } from 'vitepress'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

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
    if (line.startsWith(titlePrefix)) {
      return line.slice(titlePrefix.length).trim().replace(/^['"]|['"]$/g, '')
    }
  }
  return titleFromFilename(fallback)
}

export function getGuidePages(docsDir: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []

  for (const file of readdirSync(docsDir).sort()) {
    if (!file.endsWith('.md') || file === 'index.md')
      continue

    const fullPath = join(docsDir, file)
    if (!statSync(fullPath).isFile())
      continue

    const name = file.slice(0, -3)
    if (name.includes('[') || name.includes(']'))
      continue

    items.push({
      text: pageTitle(fullPath, name),
      link: `/${name}`,
    })
  }

  return items
}
