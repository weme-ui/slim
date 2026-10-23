import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { firstGuideLink, getGuideSidebar, GUIDE_BASE } from './lib/guide.ts'
import { buildComponentPage, firstComponentLink, getComponentSidebar, getRegistryItem } from './lib/registry.ts'
import { docsShikiPlugin } from './lib/shiki-plugin.ts'

const configDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(configDir, '../..')
const docsDir = resolve(configDir, '..')
const siteBase = '/slim/'

function assetUrl(path: string) {
  return `${siteBase}${path.replace(/^\//, '')}`
}

const guideSidebar = getGuideSidebar(docsDir)
const componentSidebar = getComponentSidebar()
const firstComponent = firstComponentLink()
const firstGuide = firstGuideLink(docsDir)

const sidebar: DefaultTheme.Sidebar = {}

if (guideSidebar.length)
  sidebar[GUIDE_BASE] = guideSidebar

if (componentSidebar.length)
  sidebar['/components/'] = componentSidebar

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

export default defineConfig({
  base: siteBase,
  title: 'Slim',
  description: 'Re-usable UI components with Reka UI and UnoCSS.',
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: assetUrl('favicon-32x32.png') }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: assetUrl('favicon-16x16.png') }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: assetUrl('favicon.svg'), sizes: 'any' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: assetUrl('apple-touch-icon.png') }],
    ['link', { rel: 'manifest', href: assetUrl('site.webmanifest') }],
  ],
  transformPageData(pageData) {
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
  themeConfig: {
    nav: [
      { text: 'Get started', link: firstGuide, activeMatch: GUIDE_BASE },
      { text: 'Components', link: firstComponent, activeMatch: '/components/' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/weme-ui/slim' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: [
        'vitepress',
      ],
    },
    plugins: [
      UnoCSS(),
      docsShikiPlugin(repoRoot),
      {
        name: 'weme-icon-stub',
        enforce: 'pre',
        resolveId(id) {
          if (id.endsWith('icon/icon.vue'))
            return resolve(configDir, 'theme/stubs/icon.vue')
        },
      },
    ],
    resolve: {
      alias: {
        '~': resolve(repoRoot, 'src'),
      },
    },
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
    ssr: {
      noExternal: ['@weme-ui/unocss-preset'],
    },
  },
})
