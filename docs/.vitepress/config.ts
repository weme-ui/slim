import type { DefaultTheme, HeadConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { firstGuideLink, getGuideSidebar, GUIDE_BASE } from './lib/guide.ts'
import { buildComponentPage, getComponentSidebar, getRegistryItem } from './lib/registry.ts'
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
const firstGuide = firstGuideLink(docsDir)

const sidebar: DefaultTheme.Sidebar = {}

if (guideSidebar.length)
  sidebar[GUIDE_BASE] = guideSidebar

if (componentSidebar.length) {
  for (const prefix of ['/components/', '/composables/'] as const)
    sidebar[prefix] = componentSidebar
}

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

const umamiHead: HeadConfig[] = [
  [
    'script',
    {
      'defer': '',
      'src': 'https://cloud.umami.is/script.js',
      'data-website-id': '882f9828-d18f-4775-bcf3-f5cdb13d5c90',
    },
  ],
]

export default defineConfig({
  base: siteBase,
  title: 'Slim',
  description: '一套 Vue 组件，用 Reka UI 和 UnoCSS 做的。源码会写进你的项目。',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: assetUrl('favicon.svg'),
      },
    ],
  ],
  transformHead() {
    return umamiHead
  },
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
    logo: {
      src: '/favicon.svg',
      alt: 'Slim',
    },
    nav: [
      { text: 'Get started', link: firstGuide, activeMatch: GUIDE_BASE },
      { text: 'Components', link: '/components/', activeMatch: '/components/' },
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
      {
        name: 'weme-vue-router-stub',
        enforce: 'pre',
        resolveId(id, importer) {
          if (id !== 'vue-router' || !importer)
            return
          const from = importer.replace(/\\/g, '/')
          if (from.includes('/src/components/link/'))
            return resolve(configDir, 'theme/stubs/vue-router.ts')
        },
      },
      {
        name: 'weme-vp-doc-example-island',
        enforce: 'pre',
        transform(code, id) {
          const file = id.split('?')[0]!.replace(/\\/g, '/')
          if (!file.endsWith('/theme-default/styles/components/vp-doc.css'))
            return
          return code.replaceAll('.vp-doc a', '.vp-doc a:not(.example-stage-body *)')
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
