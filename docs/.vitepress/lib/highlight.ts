export type ApiTokenKind
  = | 'string'
    | 'number'
    | 'literal'
    | 'keyword'
    | 'type'
    | 'punct'
    | 'text'

const LITERALS = new Set(['true', 'false'])
const KEYWORDS = new Set([
  'function',
  'typeof',
  'keyof',
  'infer',
  'extends',
  'in',
  'out',
  'is',
  'asserts',
  'readonly',
  'unique',
  'never',
  'unknown',
  'void',
  'undefined',
  'null',
  'new',
  'as',
  'satisfies',
  'implements',
  'interface',
  'type',
])
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isEmptyApiValue(value?: string): boolean {
  const trimmed = value?.trim() ?? ''
  return !trimmed || trimmed === '—' || trimmed === '-' || trimmed === '–'
}

export function tokenizeApiValue(source: string): { kind: ApiTokenKind, value: string }[] {
  const tokens: { kind: ApiTokenKind, value: string }[] = []
  let i = 0

  while (i < source.length) {
    const ch = source[i]!

    if (/\s/.test(ch)) {
      let end = i + 1
      while (end < source.length && /\s/.test(source[end]!))
        end++
      tokens.push({ kind: 'text', value: source.slice(i, end) })
      i = end
      continue
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      const quote = ch
      let end = i + 1
      while (end < source.length) {
        if (source[end] === '\\') {
          end += 2
          continue
        }
        if (source[end] === quote) {
          end++
          break
        }
        end++
      }
      tokens.push({ kind: 'string', value: source.slice(i, end) })
      i = end
      continue
    }

    if (/\d/.test(ch)) {
      let end = i + 1
      while (end < source.length && /[\d._]/.test(source[end]!))
        end++
      tokens.push({ kind: 'number', value: source.slice(i, end) })
      i = end
      continue
    }

    if (/[a-z_$]/i.test(ch)) {
      let end = i + 1
      while (end < source.length && /[\w$]/.test(source[end]!))
        end++
      while (source[end] === '.' && end + 1 < source.length && /[a-z_$]/i.test(source[end + 1]!)) {
        end++
        while (end < source.length && /[\w$]/.test(source[end]!))
          end++
      }
      const value = source.slice(i, end)
      const leaf = value.split('.').pop() ?? value
      const kind: ApiTokenKind = LITERALS.has(value) || LITERALS.has(leaf)
        ? 'literal'
        : KEYWORDS.has(value) || KEYWORDS.has(leaf)
          ? 'keyword'
          : 'type'
      tokens.push({ kind, value })
      i = end
      continue
    }

    if (source.startsWith('...', i)) {
      tokens.push({ kind: 'punct', value: '...' })
      i += 3
      continue
    }
    if (source.startsWith('=>', i) || source.startsWith('?:', i)) {
      tokens.push({ kind: 'punct', value: source.slice(i, i + 2) })
      i += 2
      continue
    }

    tokens.push({ kind: 'punct', value: ch })
    i++
  }

  return tokens
}

export function highlightApiValue(source = ''): string {
  if (isEmptyApiValue(source))
    return '<span class="tok tok-empty">-</span>'

  return tokenizeApiValue(source).map((token) => {
    const text = escapeHtml(token.value)
    if (token.kind === 'text')
      return text
    return `<span class="tok tok-${token.kind}">${text}</span>`
  }).join('')
}
