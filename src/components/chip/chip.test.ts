import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useChipStyle } from './chip.style'
import Chip from './chip.vue'

describe('chip', () => {
  it('applies the default variant and md size', () => {
    const ui = useChipStyle({})
    expect(ui.root()).toContain('flex-inline')
    expect(ui.indicator()).toContain('rounded-full')
    expect(ui.indicator()).toContain('bg-inverted')
    expect(ui.indicator()).toContain('size-2')
    expect(ui.label()).toContain('text-sm')
    expect(ui.label()).toContain('ml-sm')
    expect(ui.indicatorWrapper()).not.toContain('animate-ping')
  })

  it('applies size variants', () => {
    const sm = useChipStyle({ size: 'sm' })
    expect(sm.indicator()).toContain('size-1.5')
    expect(sm.label()).toContain('text-xs')

    const lg = useChipStyle({ size: 'lg' })
    expect(lg.indicator()).toContain('size-3')
    expect(lg.label()).toContain('text-sm')
  })

  it('applies color variants on the indicator', () => {
    expect(useChipStyle({ variant: 'default' }).indicator()).toContain('bg-inverted')
    expect(useChipStyle({ variant: 'accent' }).indicator()).toContain('bg-accent')
    expect(useChipStyle({ variant: 'neutral' }).indicator()).toContain('bg-neutral')
    expect(useChipStyle({ variant: 'info' }).indicator()).toContain('bg-info')
    expect(useChipStyle({ variant: 'success' }).indicator()).toContain('bg-success')
    expect(useChipStyle({ variant: 'warning' }).indicator()).toContain('bg-warning')
    expect(useChipStyle({ variant: 'error' }).indicator()).toContain('bg-error')
  })

  it('applies the ping wrapper when animate is true', () => {
    const ui = useChipStyle({ animate: true })
    expect(ui.indicatorWrapper()).toContain('animate-ping')
    expect(ui.indicatorWrapper()).toContain('before:bg-inverted/50')
  })

  describe('given a labeled chip', () => {
    it('sets data-slot, aria-label, and has no accessibility violations', async () => {
      const wrapper = mount(Chip, {
        attachTo: document.body,
        props: { label: 'Online' },
      })
      expect(wrapper.attributes('data-slot')).toBe('chip')
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.attributes('aria-label')).toBe('Online')
      expect(wrapper.text()).toContain('Online')
      expect(wrapper.find('[class*="animate-ping"]').exists()).toBe(false)
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('puts class on the indicator', () => {
      const wrapper = mount(Chip, {
        props: { label: 'Online', class: 'is-extra' },
      })
      expect(wrapper.classes()).not.toContain('is-extra')
      expect(wrapper.find('.is-extra').exists()).toBe(true)
      wrapper.unmount()
    })

    it('uses the default slot instead of label', () => {
      const wrapper = mount(Chip, {
        props: { label: 'Online' },
        slots: { default: 'Away' },
      })
      expect(wrapper.text()).toContain('Away')
      expect(wrapper.text()).not.toContain('Online')
      wrapper.unmount()
    })

    it('lets an aria-label attribute override label', () => {
      const wrapper = mount(Chip, {
        props: { label: 'Online' },
        attrs: { 'aria-label': 'Status' },
      })
      expect(wrapper.attributes('aria-label')).toBe('Status')
      wrapper.unmount()
    })
  })

  describe('given an animated chip', () => {
    it('wraps the indicator in a ping layer', () => {
      const wrapper = mount(Chip, {
        props: { label: 'Live', animate: true },
      })
      expect(wrapper.find('[class*="animate-ping"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Live')
      wrapper.unmount()
    })
  })

  describe('given a dot without a label', () => {
    it('does not render label text', () => {
      const wrapper = mount(Chip, {
        attrs: { 'aria-label': 'Online' },
      })
      expect(wrapper.text()).toBe('')
      expect(wrapper.attributes('aria-label')).toBe('Online')
      wrapper.unmount()
    })
  })
})
