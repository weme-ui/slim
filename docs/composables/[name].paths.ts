import type { PageData } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildComponentPage, getComposableItems, getRegistryItem } from '../.vitepress/lib/registry'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

function readReadme(path?: string) {
  if (!path)
    return ''
  try {
    return readFileSync(resolve(repoRoot, path), 'utf8')
  }
  catch {
    return ''
  }
}

export default {
  watch: [
    '../../registry.json',
    '../../src/composables/*.md',
  ],
  paths() {
    return getComposableItems().map(item => ({
      params: {
        name: item.name,
      },
    }))
  },
  transformPageData(pageData: PageData) {
    const name = pageData.params?.name
    if (!name)
      return
    const item = getRegistryItem(name)
    if (!item)
      return
    const docFile = item.files.find(file => file.kind === 'doc')
    const page = buildComponentPage(item, readReadme(docFile?.path))
    pageData.title = page.title
    pageData.description = page.description
    pageData.headers = page.outline
  },
}
