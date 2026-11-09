import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Icon from '../icon/icon.vue'
import { useAlertStyle } from './alert.style'
import Alert from './alert.vue'

describe('alert', () => {
  it('applies the default soft surface', () => {
    const ui = useAlertStyle({})
    expect(ui.root()).toContain('rounded')
    expect(ui.root()).toContain('grow-1')
    expect(ui.root()).toContain('py-md')
    expect(ui.root()).toContain('pl-lg')
    expect(ui.root()).toContain('pr-md')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('text-highlighted')
    expect(ui.title()).toContain('font-medium')
    expect(ui.description()).toContain('op-65')
    expect(ui.icon()).toContain('size-4')
    expect(ui.close()).toContain('size-5')
  })

  it('applies variant surfaces', () => {
    expect(useAlertStyle({ variant: 'solid' }).root()).toContain('bg-foreground-highlighted')
    expect(useAlertStyle({ variant: 'solid' }).root()).toContain('text-foreground-inverted')
    expect(useAlertStyle({ variant: 'soft' }).root()).toContain('bg-muted')
    expect(useAlertStyle({ variant: 'outline' }).root()).toContain('b-base')
    expect(useAlertStyle({ variant: 'inverse' }).root()).toContain('bg-foreground-inverted')
  })

  it('applies status surfaces', () => {
    expect(useAlertStyle({ status: 'info', clickable: false }).root()).toContain('plain-info-soft')
    expect(useAlertStyle({ status: 'success', clickable: false }).root()).toContain(
      'plain-success-soft',
    )
    expect(useAlertStyle({ status: 'warning', clickable: false }).root()).toContain(
      'plain-warning-soft',
    )
    expect(useAlertStyle({ status: 'error', clickable: false }).root()).toContain(
      'plain-error-soft',
    )
    expect(useAlertStyle({ status: 'info', clickable: true }).root()).toContain('fancy-info-soft')
  })

  it('applies clickable, icon, and inline states', () => {
    const clickable = useAlertStyle({ clickable: true })
    expect(clickable.root()).toContain('transition-colors')
    expect(clickable.root()).toContain('hover:bg-elevated')

    const withIcon = useAlertStyle({ withIcon: true })
    expect(withIcon.root()).toContain('p-md')
    expect(withIcon.root()).not.toContain('pl-lg')

    const inline = useAlertStyle({ inline: true })
    expect(inline.root()).toContain('flex-y-center')
    expect(inline.title()).not.toContain('font-medium')
    expect(useAlertStyle({ inline: false }).description()).toContain('op-65')
  })

  describe('given a titled alert', () => {
    it('sets data-slot, labelling, and has no accessibility violations', async () => {
      const wrapper = mount(Alert, {
        attachTo: document.body,
        attrs: { id: 'notice' },
        props: {
          title: 'Heads up',
          description: 'You can change this later.',
        },
      })
      const root = wrapper.get('[data-slot="alert"]')
      expect(root.attributes('data-slot')).toBe('alert')
      expect(root.attributes('id')).toBe('notice')
      expect(root.attributes('aria-labelledby')).toBe('notice-title')
      expect(root.attributes('aria-describedby')).toBe('notice-desc')
      expect(wrapper.get('h2').attributes('id')).toBe('notice-title')
      expect(wrapper.get('#notice-desc').element.tagName).toBe('P')
      expect(wrapper.get('#notice-desc').text()).toContain('You can change this later.')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('emphasizes stacked copy and centers a single line', () => {
      const stacked = mount(Alert, {
        props: { title: 'Title', description: 'Body' },
      })
      expect(stacked.get('h2').classes()).toContain('font-medium')
      expect(stacked.get('[data-slot="alert"]').classes()).not.toContain('flex-y-center')
      stacked.unmount()

      const single = mount(Alert, {
        props: { title: 'Only title' },
      })
      expect(single.get('[data-slot="alert"]').classes()).toContain('flex-y-center')
      expect(single.find('[id$="-desc"]').exists()).toBe(false)
      single.unmount()
    })
  })

  describe('given a status', () => {
    it('renders the status icon instead of icon', () => {
      const info = mount(Alert, {
        props: { status: 'info', title: 'Info' },
      })
      expect(info.findComponent(Icon).props('name')).toBe('ri:information-line')
      info.unmount()

      const overridden = mount(Alert, {
        props: { status: 'success', icon: 'ri:star-line', title: 'Ok' },
      })
      expect(overridden.findComponent(Icon).props('name')).toBe('ri:checkbox-circle-line')
      overridden.unmount()

      const custom = mount(Alert, {
        props: { icon: 'ri:alarm-line', title: 'Reminder' },
      })
      expect(custom.findComponent(Icon).props('name')).toBe('ri:alarm-line')
      custom.unmount()
    })
  })

  describe('given a closable alert', () => {
    it('hides after the close button is pressed', async () => {
      const wrapper = mount(Alert, {
        attachTo: document.body,
        props: { closable: true, title: 'Notice' },
      })
      expect(wrapper.get('button').attributes('type')).toBe('button')
      await wrapper.get('button').trigger('click')
      expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
      expect(wrapper.find('[data-slot="alert"]').exists()).toBe(false)
      wrapper.unmount()
    })
  })

  describe('given a link', () => {
    it('renders a link overlay and the external icon when the link opens in a new tab', () => {
      const wrapper = mount(Alert, {
        props: {
          title: 'Docs',
          href: 'https://example.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      })
      const link = wrapper.get('[data-slot="link-overlay"]')
      expect(link.attributes('href')).toBe('https://example.com')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(wrapper.findComponent(Icon).props('name')).toBe('ri:external-link-line')
      wrapper.unmount()

      const plain = mount(Alert, {
        props: { title: 'Docs', href: '/docs' },
      })
      expect(plain.get('[data-slot="link-overlay"]').attributes('href')).toBe('/docs')
      expect(plain.findComponent(Icon).exists()).toBe(false)
      plain.unmount()
    })
  })

  describe('given visible is false', () => {
    it('does not render', () => {
      const wrapper = mount(Alert, {
        props: { visible: false, title: 'Hidden' },
      })
      expect(wrapper.find('[data-slot="alert"]').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
