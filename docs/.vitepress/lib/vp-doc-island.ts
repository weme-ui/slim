import type { Plugin } from 'vite'
import postcss from 'postcss'

/**
 * Live examples render inside `.example-stage-body` (ExamplePreview.vue).
 * VitePress `.vp-doc` prose is unlayered and more specific than component
 * utilities, so every prose subject is excluded from that subtree.
 * `:where()` keeps the extra exclusion at zero specificity.
 */
const STAGE = '.example-stage-body'
const GUARD = `:not(:where(${STAGE} *))`

export function vpDocExampleIslandPlugin(): Plugin {
  return {
    name: 'weme-vp-doc-example-island',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0]?.replace(/\\/g, '/')
      if (!file)
        return
      if (file.endsWith('/theme-default/styles/components/vp-doc.css'))
        return guardVpDocCss(code)
      if (file.endsWith('/.vitepress/theme/style.css'))
        return guardVpDocCss(code, { onlyVpDoc: true })
    },
  }
}

export function guardVpDocCss(css: string, options?: { onlyVpDoc?: boolean }) {
  const onlyVpDoc = options?.onlyVpDoc ?? false
  const root = postcss.parse(css)
  root.walkRules((rule) => {
    const parent = rule.parent
    if (parent?.type === 'atrule' && parent.name.toLowerCase().endsWith('keyframes'))
      return
    rule.selector = guardSelectorList(rule.selector, onlyVpDoc)
  })
  return root.toString()
}

function guardSelectorList(list: string, onlyVpDoc: boolean) {
  const { masked, comments } = maskComments(list)
  let out = ''
  let start = 0
  let depth = 0
  let quote = ''
  let i = 0

  const push = (chunk: string) => {
    if (onlyVpDoc && !chunk.includes('.vp-doc'))
      out += chunk
    else
      out += guardSelector(chunk)
  }

  while (i < masked.length) {
    const ch = masked[i]!
    if (quote) {
      if (ch === '\\') {
        i += 2
        continue
      }
      if (ch === quote)
        quote = ''
      i++
      continue
    }
    if (ch === '"' || ch === '\'') {
      quote = ch
      i++
      continue
    }
    if (ch === '(' || ch === '[') {
      depth++
      i++
      continue
    }
    if (ch === ')' || ch === ']') {
      depth = Math.max(0, depth - 1)
      i++
      continue
    }
    if (ch === ',' && depth === 0) {
      push(masked.slice(start, i))
      out += ','
      start = i + 1
    }
    i++
  }

  push(masked.slice(start))
  return restoreComments(out, comments)
}

function guardSelector(selector: string) {
  if (!selector.trim())
    return selector

  let depth = 0
  let quote = ''
  let subjectStart = 0
  let i = 0

  while (i < selector.length) {
    if (quote === '' && depth === 0 && selector.startsWith('\0', i)) {
      i = skipPlaceholder(selector, i)
      continue
    }
    const ch = selector[i]!
    if (quote) {
      if (ch === '\\') {
        i += 2
        continue
      }
      if (ch === quote)
        quote = ''
      i++
      continue
    }
    if (ch === '"' || ch === '\'') {
      quote = ch
      i++
      continue
    }
    if (ch === '(' || ch === '[') {
      depth++
      i++
      continue
    }
    if (ch === ')' || ch === ']') {
      depth = Math.max(0, depth - 1)
      i++
      continue
    }
    if (depth === 0 && (ch === '>' || ch === '+' || ch === '~')) {
      i++
      i = skipAfterCombinator(selector, i)
      subjectStart = i
      continue
    }
    if (depth === 0 && isSpace(ch)) {
      const before = i
      while (i < selector.length && isSpace(selector[i]!))
        i++
      if (hasTokenBefore(selector, before) && hasTokenAfter(selector, i))
        subjectStart = i
      continue
    }
    i++
  }

  let end = findPseudoElement(selector, subjectStart)
  while (end > subjectStart && isSpace(selector[end - 1]!))
    end--

  const subject = selector.slice(subjectStart, end)
  if (!subject.trim() || subject.includes(GUARD))
    return selector
  return selector.slice(0, end) + GUARD + selector.slice(end)
}

function findPseudoElement(selector: string, from: number) {
  let depth = 0
  let quote = ''
  let i = from
  while (i < selector.length) {
    if (quote === '' && depth === 0 && selector.startsWith('\0', i)) {
      i = skipPlaceholder(selector, i)
      continue
    }
    const ch = selector[i]!
    if (quote) {
      if (ch === '\\') {
        i += 2
        continue
      }
      if (ch === quote)
        quote = ''
      i++
      continue
    }
    if (ch === '"' || ch === '\'') {
      quote = ch
      i++
      continue
    }
    if (ch === '(' || ch === '[') {
      depth++
      i++
      continue
    }
    if (ch === ')' || ch === ']') {
      depth = Math.max(0, depth - 1)
      i++
      continue
    }
    if (depth === 0 && selector.startsWith('::', i))
      return i
    i++
  }
  return selector.length
}

function skipAfterCombinator(selector: string, index: number) {
  let i = index
  while (i < selector.length) {
    if (selector.startsWith('\0', i)) {
      i = skipPlaceholder(selector, i)
      continue
    }
    if (!isSpace(selector[i]!))
      break
    i++
  }
  return i
}

function hasTokenBefore(selector: string, index: number) {
  for (let i = 0; i < index; i++) {
    if (!isSpace(selector[i]!))
      return true
  }
  return false
}

function hasTokenAfter(selector: string, index: number) {
  for (let i = index; i < selector.length; i++) {
    if (!isSpace(selector[i]!))
      return true
  }
  return false
}

function skipPlaceholder(selector: string, index: number) {
  const end = selector.indexOf('\0', index + 1)
  if (end === -1)
    return selector.length
  return end + 1
}

function isSpace(ch: string) {
  return ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r' || ch === '\f'
}

function maskComments(input: string) {
  const comments: string[] = []
  const masked = input.replace(/\/\*[\s\S]*?\*\//g, (comment) => {
    const token = `\0${comments.length}\0`
    comments.push(comment)
    return token
  })
  return { masked, comments }
}

function restoreComments(input: string, comments: string[]) {
  return input.replace(/\0(\d+)\0/g, (_, index: string) => comments[Number(index)] ?? '')
}
