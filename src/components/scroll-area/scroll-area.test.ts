import { mount } from '@vue/test-utils'
import { ScrollAreaRoot } from 'reka-ui'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useScrollAreaStyle } from './scroll-area.style'
import ScrollArea from './scroll-area.vue'

describe('scroll-area', () => {
  it('applies default viewport, scrollbar, and thumb classes', () => {
    const ui = useScrollAreaStyle({})
    expect(ui.viewport()).toContain('outline-none')
    expect(ui.viewport()).toContain('rounded-inherit')
    expect(ui.viewport()).toContain('size-full')
    expect(ui.scrollbar()).toContain('rounded-full')
    expect(ui.scrollbar()).toContain('bg-scrollbar')
    expect(ui.scrollbar()).toContain('flex')
    expect(ui.thumb()).toContain('rounded-inherit')
    expect(ui.thumb()).toContain('bg-scrollbar-thumb')
  })

  it('applies orientation variants', () => {
    expect(useScrollAreaStyle({ orientation: 'horizontal' }).scrollbar()).toContain('h-1.5')
    expect(useScrollAreaStyle({ orientation: 'vertical' }).scrollbar()).toContain('flex-col')
    expect(useScrollAreaStyle({ orientation: 'vertical' }).scrollbar()).toContain('w-1.5')
  })

  describe('given a default scroll area', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(ScrollArea, {
        attachTo: document.body,
        slots: { default: 'Content' },
      })
      expect(wrapper.attributes('data-slot')).toBe('scroll-area')
      expect(wrapper.find('[data-slot="scroll-area-viewport"]').exists()).toBe(true)
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the default slot', () => {
      const wrapper = mount(ScrollArea, {
        slots: { default: 'Overflow' },
      })
      expect(wrapper.text()).toContain('Overflow')
      wrapper.unmount()
    })

    it('uses a zero hide delay when type is not scroll', () => {
      const wrapper = mount(ScrollArea)
      expect(wrapper.getComponent(ScrollAreaRoot).props('scrollHideDelay')).toBe(0)
      wrapper.unmount()
    })
  })

  describe('given an always-visible scroll area', () => {
    it('renders both scrollbars by default', () => {
      const wrapper = mount(ScrollArea, {
        attachTo: document.body,
        props: { type: 'always' },
        slots: { default: 'Content' },
      })
      expect(wrapper.find('[data-orientation="horizontal"]').exists()).toBe(true)
      expect(wrapper.find('[data-orientation="vertical"]').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('given a vertical scroll area', () => {
    it('renders only the vertical scrollbar', () => {
      const wrapper = mount(ScrollArea, {
        attachTo: document.body,
        props: { type: 'always', orientation: 'vertical' },
        slots: { default: 'Content' },
      })
      expect(wrapper.find('[data-orientation="vertical"]').exists()).toBe(true)
      expect(wrapper.find('[data-orientation="horizontal"]').exists()).toBe(false)
      wrapper.unmount()
    })
  })

  describe('given a horizontal scroll area', () => {
    it('renders only the horizontal scrollbar', () => {
      const wrapper = mount(ScrollArea, {
        attachTo: document.body,
        props: { type: 'always', orientation: 'horizontal' },
        slots: { default: 'Content' },
      })
      expect(wrapper.find('[data-orientation="horizontal"]').exists()).toBe(true)
      expect(wrapper.find('[data-orientation="vertical"]').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
