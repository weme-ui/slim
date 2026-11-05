import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import AspectRatio from './aspect-ratio.vue'

describe('aspect-ratio', () => {
  describe('given a ratio box', () => {
    it('keeps a square ratio by default', () => {
      const wrapper = mount(AspectRatio, {
        attachTo: document.body,
        slots: { default: '<span>Poster</span>' },
      })
      const root = wrapper.element as HTMLElement
      const inner = root.firstElementChild as HTMLElement

      expect(root.getAttribute('data-reka-aspect-ratio-wrapper')).toBe('')
      expect(root.style.position).toBe('relative')
      expect(root.style.paddingBottom).toBe('100%')
      expect(inner.tagName).toBe('DIV')
      expect(inner.style.position).toBe('absolute')
      expect(wrapper.text()).toBe('Poster')
      wrapper.unmount()
    })

    it('sets the padding from the ratio', () => {
      const wrapper = mount(AspectRatio, {
        props: { ratio: 16 / 9 },
        slots: { default: '<span>Wide</span>' },
      })
      expect((wrapper.element as HTMLElement).style.paddingBottom).toBe('56.25%')
      wrapper.unmount()
    })

    it('puts class and as on the inner box', () => {
      const wrapper = mount(AspectRatio, {
        props: { as: 'section', class: 'is-inner', ratio: 4 / 3 },
      })
      const root = wrapper.element as HTMLElement
      const inner = root.firstElementChild as HTMLElement

      expect(root.style.paddingBottom).toBe('75%')
      expect(root.classList.contains('is-inner')).toBe(false)
      expect(inner.tagName).toBe('SECTION')
      expect(inner.classList.contains('is-inner')).toBe(true)
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(AspectRatio, {
        attachTo: document.body,
        props: { ratio: 16 / 9 },
        slots: { default: '<span>Poster</span>' },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
