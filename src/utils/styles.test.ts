import { describe, expect, it } from 'vitest'
import { cn } from './styles'

/** 与 `isUnoTextSize` 的长度单位一一对应，并带上裸数字与仅单位形式。 */
const TEXT_SIZES = [
  '2.75',
  '2.5',
  '3',
  '.5',
  '-2',
  '12px',
  '2.75rem',
  '2.75em',
  '2.75ex',
  '2.75lh',
  '2.75rlh',
  '2.75cap',
  '2.75ch',
  '2.75ic',
  '2.75vw',
  '2.75vh',
  '2.75svw',
  '2.75svh',
  '2.75lvw',
  '2.75lvh',
  '2.75dvw',
  '2.75dvh',
  '2.75cqw',
  '2.75cqh',
  '2.75cqi',
  '2.75cqb',
  '2.75cqmin',
  '2.75cqmax',
  '2.75in',
  '2.75cm',
  '2.75mm',
  '2.75pt',
  '2.75pc',
  '2.75rpx',
  '100%',
  'px',
  'vw',
  'vh',
  'svw',
  'svh',
  'lvw',
  'lvh',
  'dvw',
  'dvh',
] as const

/** 没有数字前缀时不算字号，避免和 `text-subtle` 抢同一组。 */
const TEXT_SIZE_EXCLUSIONS = [
  'cqw',
  'cqh',
  'cqi',
  'cqb',
  'cqmin',
  'cqmax',
] as const

const FOREGROUND_TOKENS = [
  'highlighted',
  'base',
  'subtle',
  'muted',
  'inverted',
] as const
const BACKGROUND_TOKENS = [
  'base',
  'muted',
  'elevated',
  'inverted',
  'foreground',
] as const
const BORDER_TOKENS = ['base', 'elevated', 'inverted'] as const
const COLOR_ALIASES = [
  'accent',
  'neutral',
  'success',
  'info',
  'warning',
  'error',
] as const

const BORDER_NON_COLORS = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'none',
  'hidden',
  'collapse',
  'separate',
  'px',
  'em',
  'rem',
  'full',
  'auto',
] as const

const BORDER_SIDES = [
  't',
  'r',
  'b',
  'l',
  'x',
  'y',
  's',
  'e',
  'bs',
  'be',
] as const

describe('twMergeConfig', () => {
  describe('theme.text', () => {
    it('keeps numeric and length font sizes together with text color', () => {
      for (const size of TEXT_SIZES) {
        expect(cn('text-subtle', `text-${size}`), size).toBe(`text-subtle text-${size}`)
        expect(cn('c-subtle', `text-${size}`), size).toBe(`c-subtle text-${size}`)
        expect(cn('color-subtle', `text-${size}`), size).toBe(`color-subtle text-${size}`)
      }
    })

    it('merges those font sizes with named sizes', () => {
      for (const size of TEXT_SIZES) {
        expect(cn('text-xs', `text-${size}`), size).toBe(`text-${size}`)
        expect(cn(`text-${size}`, 'text-sm'), size).toBe('text-sm')
        expect(cn('text-base', `text-${size}`, 'text-2xl'), size).toBe('text-2xl')
      }

      expect(cn('text-2.75', 'text-3')).toBe('text-3')
    })

    it('does not treat a bare container-query unit as a font size', () => {
      for (const size of TEXT_SIZE_EXCLUSIONS) {
        expect(cn('text-xs', `text-${size}`), size).toBe(`text-xs text-${size}`)
      }
    })
  })

  describe('fancy / plain', () => {
    it('merges surface shortcuts with each other in either order', () => {
      expect(cn('fancy-info', 'fancy-error-outline')).toBe('fancy-error-outline')
      expect(cn('plain-neutral', 'plain-accent')).toBe('plain-accent')
      expect(cn('fancy-info-soft', 'plain-error')).toBe('plain-error')
      expect(cn('plain-amber-soft', 'fancy-primary')).toBe('fancy-primary')
      expect(cn('plain-info', 'fancy-info', 'plain-error')).toBe('plain-error')
    })

    it('ignores an empty surface token', () => {
      expect(cn('fancy-', 'plain-info')).toBe('fancy- plain-info')
      expect(cn('plain-', 'fancy-info')).toBe('plain- fancy-info')
    })

    it('leaves unrelated utilities in place', () => {
      expect(cn('fancy-info', 'text-subtle', 'bg-muted', 'plain-error')).toBe('text-subtle bg-muted plain-error')
    })
  })

  describe('bg-color', () => {
    it('merges background tokens and color aliases', () => {
      for (const token of BACKGROUND_TOKENS)
        expect(cn('bg-muted', `bg-${token}`), token).toBe(`bg-${token}`)

      for (const alias of COLOR_ALIASES)
        expect(cn('bg-elevated', `bg-${alias}`), alias).toBe(`bg-${alias}`)

      for (let scale = 1; scale <= 12; scale++)
        expect(cn('bg-base', `bg-accent-${scale}`), String(scale)).toBe(`bg-accent-${scale}`)

      expect(cn('bg-muted', 'bg-elevated/80')).toBe('bg-elevated/80')
      expect(cn('bg-elevated/80', 'bg-muted')).toBe('bg-muted')
    })

    it('keeps background position, image, and size utilities', () => {
      expect(cn('bg-center', 'bg-muted')).toBe('bg-center bg-muted')
      expect(cn('bg-none', 'bg-elevated')).toBe('bg-none bg-elevated')
      expect(cn('bg-cover', 'bg-base')).toBe('bg-cover bg-base')
      expect(cn('bg-repeat', 'bg-inverted')).toBe('bg-repeat bg-inverted')
    })
  })

  describe('text-color', () => {
    it('merges text, c, and color prefixes for foreground tokens and aliases', () => {
      for (const token of FOREGROUND_TOKENS) {
        // `text-base` 是字号，不和文字色抢同一组；`c-base` / `color-base` 仍是颜色。
        expect(cn('text-subtle', `text-${token}`), token).toBe(token === 'base'
          ? `text-subtle text-${token}`
          : `text-${token}`)
        expect(cn('c-subtle', `c-${token}`), token).toBe(`c-${token}`)
        expect(cn('color-subtle', `color-${token}`), token).toBe(`color-${token}`)
        expect(cn('text-subtle', `c-${token}`), token).toBe(`c-${token}`)
        expect(cn('c-subtle', `color-${token}`), token).toBe(`color-${token}`)
        expect(cn(`color-${token}`, 'text-muted'), token).toBe('text-muted')
      }

      for (const alias of COLOR_ALIASES) {
        expect(cn('text-subtle', `c-${alias}`), alias).toBe(`c-${alias}`)
        expect(cn(`color-${alias}`, 'text-muted'), alias).toBe('text-muted')
      }

      for (let scale = 1; scale <= 12; scale++) {
        expect(cn(`c-accent-${scale}`, 'text-subtle'), String(scale)).toBe('text-subtle')
        expect(cn(`color-error-${scale}`, 'c-muted'), String(scale)).toBe('c-muted')
      }

      expect(cn('c-subtle/80', 'text-muted')).toBe('text-muted')
      expect(cn('text-subtle/50', 'c-highlighted')).toBe('c-highlighted')
    })

    it('keeps alias scales outside 1–12 and non-foreground values', () => {
      expect(cn('c-accent-0', 'text-subtle')).toBe('c-accent-0 text-subtle')
      expect(cn('c-accent-13', 'text-subtle')).toBe('c-accent-13 text-subtle')
      expect(cn('c-accent-1.5', 'text-subtle')).toBe('c-accent-1.5 text-subtle')
      expect(cn('color-primary', 'c-subtle')).toBe('color-primary c-subtle')
      expect(cn('c-elevated', 'text-subtle')).toBe('c-elevated text-subtle')
    })

    it('keeps named font sizes together with text color', () => {
      expect(cn('text-xs', 'text-subtle')).toBe('text-xs text-subtle')
      expect(cn('text-sm', 'text-muted')).toBe('text-sm text-muted')
      expect(cn('text-xs', 'text-sm')).toBe('text-sm')
      expect(cn('color-base', 'text-xs')).toBe('color-base text-xs')
    })
  })

  describe('border-color', () => {
    it('merges border tokens, aliases, and the border prefix', () => {
      for (const token of BORDER_TOKENS) {
        expect(cn('b-base', `b-${token}`), token).toBe(`b-${token}`)
        expect(cn('border-base', `border-${token}`), token).toBe(`border-${token}`)
        expect(cn('b-base', `border-${token}`), token).toBe(`border-${token}`)
        expect(cn(`border-${token}`, 'b-elevated'), token).toBe('b-elevated')
      }

      for (const alias of COLOR_ALIASES) {
        expect(cn('b-base', `b-${alias}`), alias).toBe(`b-${alias}`)
        expect(cn(`b-${alias}-4`, 'b-elevated'), alias).toBe('b-elevated')
      }

      for (let scale = 1; scale <= 12; scale++)
        expect(cn(`b-accent-${scale}`, 'b-base'), String(scale)).toBe('b-base')

      expect(cn('b-transparent', 'b-base')).toBe('b-base')
      expect(cn('b-red', 'b-base')).toBe('b-base')
      expect(cn('b-accent-13', 'b-base')).toBe('b-base')
      expect(cn('hover:b-base', 'hover:b-error')).toBe('hover:b-error')
      expect(cn('b-base', 'hover:b-elevated')).toBe('b-base hover:b-elevated')
    })

    it('keeps width, style, and side utilities beside a border color', () => {
      for (const width of ['0', '2', '2.5'])
        expect(cn(`b-${width}`, 'b-base'), width).toBe(`b-${width} b-base`)

      for (const value of BORDER_NON_COLORS)
        expect(cn(`b-${value}`, 'b-accent'), value).toBe(`b-${value} b-accent`)

      for (const side of BORDER_SIDES) {
        expect(cn(`b-${side}`, 'b-base'), side).toBe(`b-${side} b-base`)
        expect(cn(`b-${side}-2`, 'b-error'), side).toBe(`b-${side}-2 b-error`)
      }

      expect(cn('b', 'b-base')).toBe('b b-base')
      expect(cn('b-t-base', 'b-error')).toBe('b-t-base b-error')
    })
  })
})
