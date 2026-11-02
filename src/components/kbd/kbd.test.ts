import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useKbdStyle } from './kbd.style'
import Kbd from './kbd.vue'

const macOS = typeof navigator !== 'undefined' && /Macintosh;/.test(navigator.userAgent)

describe('kbd', () => {
  it('applies default variant and size classes', () => {
    const ui = useKbdStyle({})
    expect(ui).toContain('bg-muted')
    expect(ui).toContain('leading-none')
    expect(ui).toContain('text-2.75')
    expect(ui).toContain('px-1.5')
    expect(ui).toContain('py-1')
    expect(ui).toContain('rounded')
  })

  it('applies variant and size classes', () => {
    expect(useKbdStyle({ variant: 'plain' })).not.toContain('bg-muted')
    expect(useKbdStyle({ size: 'sm' })).toContain('text-2.5')
    expect(useKbdStyle({ size: 'sm' })).toContain('px-1')
    expect(useKbdStyle({ size: 'lg' })).toContain('text-3')
    expect(useKbdStyle({ size: 'lg' })).toContain('px-2')
  })

  describe('given a keycap', () => {
    it('renders a kbd and has no accessibility violations', async () => {
      const wrapper = mount(Kbd, {
        attachTo: document.body,
        props: { value: 'enter' },
      })
      expect(wrapper.element.tagName).toBe('KBD')
      expect(wrapper.text()).toBe('↵')
      expect(wrapper.classes()).toContain('bg-muted')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('maps a chord and unknown keys', async () => {
      const chord = mount(Kbd, {
        props: { value: 'meta_k' },
      })
      await chord.vm.$nextTick()
      expect(chord.text()).toBe(`${macOS ? '⌘' : 'Ctrl'}K`)
      chord.unmount()

      const list = mount(Kbd, {
        props: {
          value: ['shift', 'a'],
        },
      })
      expect(list.text()).toBe('⇧A')
      list.unmount()
    })

    it('puts class on the root', () => {
      const wrapper = mount(Kbd, {
        props: { value: 'tab', class: 'ml-1' },
      })
      expect(wrapper.classes()).toContain('ml-1')
      expect(wrapper.text()).toBe('⇥')
      wrapper.unmount()
    })
  })
})
