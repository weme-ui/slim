import { describe, it, expect } from 'vitest'
import { twMerge } from './styles'

describe('styles', () => {
  it('should be not merge theme colors and text sizes', () => {
    const result = twMerge('text-nowrap text-red text-inverted text-3')
    expect(result).toMatchInlineSnapshot(`"text-nowrap text-inverted text-3"`)
  })

  it('should be merge button shortcuts', () => {
    const result = twMerge('btn-default btn-default-outline')
    expect(result).toMatchInlineSnapshot(`"btn-default-outline"`)
  })

  it('should be merge box shortcuts', () => {
    const result = twMerge('box-default box-default-outline')
    expect(result).toMatchInlineSnapshot(`"box-default-outline"`)
  })

  it('should be merge anchor shortcuts', () => {
    const result = twMerge('anchor-default anchor-default-outline')
    expect(result).toMatchInlineSnapshot(`"anchor-default-outline"`)
  })
})
