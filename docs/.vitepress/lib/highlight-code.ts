import type { BundledLanguage, Highlighter, SpecialLanguage } from 'shiki'
import { createHighlighter } from 'shiki'
import { parseMarkdownFences, renderMarkdownBlocks } from './markdown.ts'

const LIGHT_THEME = 'github-light' as const
const DARK_THEME = 'github-dark' as const

type HighlightLang = BundledLanguage | SpecialLanguage

const LANGS = [
  'vue',
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'bash',
  'shellscript',
  'json',
  'html',
  'css',
  'markdown',
  'yaml',
] as const satisfies readonly BundledLanguage[]

const LANG_ALIASES: Record<string, HighlightLang> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'shellscript',
  shell: 'shellscript',
  bash: 'bash',
  zsh: 'shellscript',
  md: 'markdown',
  yml: 'yaml',
  text: 'text',
  txt: 'text',
  plaintext: 'text',
  vue: 'vue',
  html: 'html',
  css: 'css',
  json: 'json',
  tsx: 'tsx',
  jsx: 'jsx',
}

const COLOR_REPLACEMENTS = {
  'github-light': {
    '#959da5': '#6c676f',
    '#28a745': '#0e790b',
    '#b08800': '#846312',
    '#e36209': '#c13617',
    '#3192aa': '#05728b',
    '#d73a49': '#c62739',
    '#22863a': '#11782a',
    '#6a737d': '#62687b',
    '#1b7c83': '#06747a',
    '#0366d6': '#0663d0',
    '#cb2431': '#c82430',
  },
  'github-dark': {
    '#586069': '#5b93a3',
    '#6a737d': '#818e99',
    '#ea4a5a': '#ef5564',
    '#2188ff': '#268bf9',
  },
} as const

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: [...LANGS],
    })
  }
  return highlighterPromise
}

export function resolveHighlightLang(lang?: string | null): HighlightLang {
  if (!lang)
    return 'text'
  const key = lang.trim().toLowerCase()
  if (key in LANG_ALIASES)
    return LANG_ALIASES[key]!
  if ((LANGS as readonly string[]).includes(key))
    return key as BundledLanguage
  return 'text'
}

function classList(value: unknown): string[] {
  if (Array.isArray(value))
    return value.map(String).filter(Boolean)
  if (typeof value === 'string')
    return value.split(/\s+/).filter(Boolean)
  return []
}

export async function highlightCode(
  code: string,
  lang?: string | null,
): Promise<string> {
  const highlighter = await getHighlighter()
  const resolved = resolveHighlightLang(lang)
  const html = highlighter.codeToHtml(code.replace(/\n$/, ''), {
    lang: resolved,
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
    defaultColor: false,
    colorReplacements: COLOR_REPLACEMENTS,
    transformers: [
      {
        name: 'docs:vp-pre',
        pre(node) {
          const classes = new Set(classList(node.properties.class))
          classes.add('vp-code')
          node.properties.class = [...classes]
          node.properties.dir = 'ltr'
          delete node.properties.style
        },
      },
    ],
  })

  return `<div class="language-${resolved}">${html}</div>`
}

export async function renderHighlightedMarkdown(source = ''): Promise<string> {
  if (!source.trim())
    return ''

  const parts = await Promise.all(parseMarkdownFences(source).map(async (part) => {
    if (part.type === 'text')
      return renderMarkdownBlocks(part.content)
    return highlightCode(part.content, part.lang)
  }))

  return parts.filter(Boolean).join('\n')
}
