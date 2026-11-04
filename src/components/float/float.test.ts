import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useFloatStyle } from './float.style'
import Float from './float.vue'

describe('float', () => {
  it('applies the default top-right placement', () => {
    const classes = useFloatStyle({})
    expect(classes).toContain('abs')
    expect(classes).toContain('flex-center')
    expect(classes).toContain('inset-bs-$offset-y')
    expect(classes).toContain('inset-e-$offset-x')
    expect(classes).toContain('-translate-y-[50%]')
    expect(classes).toContain('translate-x-[50%]')
  })

  it('applies center and bottom-left placements', () => {
    const center = useFloatStyle({ placement: 'center' })
    expect(center).toContain('inset-block-[50%]')
    expect(center).toContain('inset-inline-[50%]')
    expect(center).toContain('-translate-x-[50%]')
    expect(center).toContain('-translate-y-[50%]')

    const corner = useFloatStyle({ placement: 'bottom-left' })
    expect(corner).toContain('inset-be-$offset-y')
    expect(corner).toContain('inset-s-$offset-x')
    expect(corner).toContain('translate-y-[50%]')
    expect(corner).toContain('-translate-x-[50%]')
  })

  describe('given a default float', () => {
    it('sets data-slot, offset variables, and has no accessibility violations', async () => {
      const wrapper = mount(Float, {
        attachTo: document.body,
        slots: { default: 'Mark' },
      })
      expect(wrapper.attributes('data-slot')).toBe('float')
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.attributes('style')).toContain('--offset: 0')
      expect(wrapper.attributes('style')).toContain('--offset-x: 0')
      expect(wrapper.attributes('style')).toContain('--offset-y: 0')
      expect(wrapper.text()).toContain('Mark')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('lets offsetX and offsetY override the shared offset', () => {
      const wrapper = mount(Float, {
        props: { offset: '2px', offsetX: '4px', offsetY: '6px' },
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('--offset: 2px')
      expect(style).toContain('--offset-x: 4px')
      expect(style).toContain('--offset-y: 6px')
      wrapper.unmount()
    })

    it('falls back to offset when an axis offset is omitted', () => {
      const wrapper = mount(Float, {
        props: { offset: '2px', offsetX: '4px' },
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('--offset-x: 4px')
      expect(style).toContain('--offset-y: 2px')
      wrapper.unmount()
    })
  })
})
