import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Icon from '../icon/icon.vue'
import { useBadgeStyle } from './badge.style'
import Badge from './badge.vue'

describe('badge', () => {
  it('applies default solid, default color, and md size', () => {
    const ui = useBadgeStyle({})
    expect(ui.root()).toContain('leading-none')
    expect(ui.root()).toContain('font-medium')
    expect(ui.root()).toContain('rounded')
    expect(ui.root()).toContain('text-xs')
    expect(ui.root()).toContain('px-1.5')
    expect(ui.root()).toContain('h-6')
    expect(ui.root()).toContain('bg-inverted')
    expect(ui.root()).toContain('text-inverted')
    expect(ui.root()).not.toContain('cursor-pointer')
    expect(ui.icon()).toContain('shrink-0')
    expect(ui.icon()).toContain('mr-1')
    expect(ui.icon()).toContain('size-3')
  })

  it('applies size variants', () => {
    const sm = useBadgeStyle({ size: 'sm' })
    expect(sm.root()).toContain('h-5')
    expect(sm.root()).toContain('px-1')
    expect(sm.icon()).toContain('size-3')

    const lg = useBadgeStyle({ size: 'lg' })
    expect(lg.root()).toContain('text-sm')
    expect(lg.root()).toContain('px-3')
    expect(lg.root()).toContain('h-8')
    expect(lg.icon()).toContain('mr-1.5')
    expect(lg.icon()).toContain('size-4')
  })

  it('applies appearance variants', () => {
    expect(useBadgeStyle({ variant: 'solid' }).root()).toContain('bg-inverted')
    expect(useBadgeStyle({ variant: 'soft' }).root()).toContain('bg-muted')
    expect(useBadgeStyle({ variant: 'outline' }).root()).toContain('b-base')
    expect(useBadgeStyle({ variant: 'plain' }).root()).toContain('text-highlighted')
    expect(useBadgeStyle({ variant: 'plain' }).root()).not.toContain('bg-inverted')
    expect(useBadgeStyle({ variant: 'inverted' }).root()).toContain('bg-base')
  })

  it('applies color variants', () => {
    expect(useBadgeStyle({ color: 'default' }).root()).toContain('bg-inverted')
    expect(useBadgeStyle({ color: 'accent' }).root()).toContain('plain-accent')
    expect(useBadgeStyle({ color: 'neutral' }).root()).toContain('plain-neutral')
    expect(useBadgeStyle({ color: 'info' }).root()).toContain('plain-info')
    expect(useBadgeStyle({ color: 'success' }).root()).toContain('plain-success')
    expect(useBadgeStyle({ color: 'warning' }).root()).toContain('plain-warning')
    expect(useBadgeStyle({ color: 'error' }).root()).toContain('plain-error')
  })

  it('applies clickable styles', () => {
    const solid = useBadgeStyle({ clickable: true })
    expect(solid.root()).toContain('cursor-pointer')
    expect(solid.root()).toContain('aria-[pressed=true]:scale-97')
    expect(solid.root()).toContain('hover:(bg-inverted/90 text-inverted)')

    const soft = useBadgeStyle({ variant: 'soft', clickable: true })
    expect(soft.root()).toContain('hover:(bg-elevated text-highlighted)')

    const accent = useBadgeStyle({ color: 'accent', clickable: true })
    expect(accent.root()).toContain('fancy-accent')
  })

  describe('given a default badge', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Badge, {
        attachTo: document.body,
        props: { label: 'New' },
      })
      expect(wrapper.attributes('data-slot')).toBe('badge')
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.text()).toContain('New')
      expect(wrapper.attributes('aria-pressed')).toBeUndefined()
      expect(wrapper.find('[data-slot="link-overlay"]').exists()).toBe(false)
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the icon before the label', () => {
      const wrapper = mount(Badge, {
        props: { label: 'New', icon: 'ri:star-line' },
      })
      expect(wrapper.findComponent(Icon).props('name')).toBe('ri:star-line')
      expect(wrapper.text()).toContain('New')
      wrapper.unmount()
    })

    it('uses the default slot instead of icon and label', () => {
      const wrapper = mount(Badge, {
        props: { label: 'New', icon: 'ri:star-line' },
        slots: { default: 'Custom' },
      })
      expect(wrapper.text()).toContain('Custom')
      expect(wrapper.text()).not.toContain('New')
      expect(wrapper.findComponent(Icon).exists()).toBe(false)
      wrapper.unmount()
    })

    it('renders the icon slot when the default slot is absent', () => {
      const wrapper = mount(Badge, {
        props: { label: 'New' },
        slots: { icon: '<span class="custom-icon">*</span>' },
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.findComponent(Icon).exists()).toBe(false)
      expect(wrapper.text()).toContain('New')
      wrapper.unmount()
    })
  })

  describe('given a clickable badge', () => {
    it('sets aria-pressed while the pointer is down', async () => {
      const wrapper = mount(Badge, {
        props: { label: 'Filter', clickable: true },
      })
      expect(wrapper.attributes('aria-pressed')).toBe('false')
      expect(wrapper.find('[data-slot="link-overlay"]').exists()).toBe(true)

      await wrapper.trigger('mousedown')
      expect(wrapper.attributes('aria-pressed')).toBe('true')

      await wrapper.trigger('mouseup')
      expect(wrapper.attributes('aria-pressed')).toBe('false')
      wrapper.unmount()
    })

    it('renders a link overlay when href is set', () => {
      const wrapper = mount(Badge, {
        props: {
          label: 'Docs',
          href: '/docs',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      })
      const link = wrapper.get('[data-slot="link-overlay"]')
      expect(link.attributes('href')).toBe('/docs')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(wrapper.attributes('aria-pressed')).toBe('false')
      wrapper.unmount()
    })
  })
})
