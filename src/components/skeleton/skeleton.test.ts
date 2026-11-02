import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useSkeletonStyle } from './skeleton.style'
import Skeleton from './skeleton.vue'

describe('skeleton', () => {
  it('applies base classes without a variant', () => {
    const ui = useSkeletonStyle({})
    expect(ui).toContain('animate-pulse')
    expect(ui).toContain('bg-elevated')
    expect(ui).toContain('relative')
    expect(ui).toContain('will-change-transform')
    expect(ui).not.toContain('rounded-full')
  })

  it('applies variant classes', () => {
    expect(useSkeletonStyle({ variant: 'text' })).toContain('rounded-full')
    expect(useSkeletonStyle({ variant: 'text' })).toContain('h-3')
    expect(useSkeletonStyle({ variant: 'rect' })).toContain('rounded')
    expect(useSkeletonStyle({ variant: 'rect' })).not.toContain('rounded-full')
    expect(useSkeletonStyle({ variant: 'circle' })).toContain('rounded-full')
    expect(useSkeletonStyle({ variant: 'circle' })).not.toContain('h-3')
  })

  describe('given a skeleton', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Skeleton, {
        attachTo: document.body,
        props: { class: 'h-4 w-32' },
      })
      expect(wrapper.attributes('data-slot')).toBe('skeleton-rect')
      expect(wrapper.classes()).toContain('animate-pulse')
      expect(wrapper.classes()).toContain('rounded')
      expect(wrapper.classes()).toContain('h-4')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('uses the variant in data-slot and classes', () => {
      const text = mount(Skeleton, {
        props: { variant: 'text', class: 'w-32' },
      })
      expect(text.attributes('data-slot')).toBe('skeleton-text')
      expect(text.classes()).toContain('h-3')
      text.unmount()

      const circle = mount(Skeleton, {
        props: { variant: 'circle', class: 'size-10' },
      })
      expect(circle.attributes('data-slot')).toBe('skeleton-circle')
      expect(circle.classes()).toContain('rounded-full')
      expect(circle.classes()).toContain('size-10')
      circle.unmount()
    })
  })
})
