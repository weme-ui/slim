import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { h, nextTick } from 'vue'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { useToastProviderStyle } from './toast-provider.style'
import ToastProvider from './toast-provider.vue'
import { useToastStyle } from './toast.style'
import Toast from './toast.vue'

function mountToast(props: Record<string, unknown> = {}, providerProps: Record<string, unknown> = {}) {
  return mount(ToastProvider, {
    attachTo: document.body,
    props: providerProps,
    slots: {
      default: () => h(Toast, props),
    },
  })
}

async function flush() {
  await nextTick()
  await nextTick()
}

describe('toast', () => {
  it('applies the default surface', () => {
    const ui = useToastStyle({})
    expect(ui.root()).toContain('rounded-lg')
    expect(ui.root()).toContain('bg-base')
    expect(ui.root()).toContain('shadow-lg')
    expect(ui.root()).toContain('outline-background-muted/70')
    expect(ui.root()).toContain('b-base')
    expect(ui.icon()).toContain('size-4.5')
    expect(ui.icon()).toContain('text-highlighted')
    expect(ui.title()).toContain('text-sm')
    expect(ui.title()).toContain('font-medium')
    expect(ui.description()).toContain('text-xs')
    expect(ui.description()).toContain('text-subtle')
    expect(ui.close()).toContain('size-5')
    expect(ui.wrapper()).not.toContain('flex-col')
  })

  it('applies variant surfaces', () => {
    expect(useToastStyle({ variant: 'accent' }).root()).toContain('b-accent')
    expect(useToastStyle({ variant: 'accent' }).icon()).toContain('text-accent')
    expect(useToastStyle({ variant: 'neutral' }).content()).toContain('text-neutral-12')
    expect(useToastStyle({ variant: 'info' }).root()).toContain('b-info')
    expect(useToastStyle({ variant: 'success' }).close()).toContain('b-success')
    expect(useToastStyle({ variant: 'warning' }).content()).toContain('text-warning')
    expect(useToastStyle({ variant: 'error' }).icon()).toContain('text-error')
    expect(useToastStyle({ variant: 'loading' }).icon()).toContain('animate-spin')
    expect(useToastStyle({ variant: 'loading' }).root()).toContain('b-base')
  })

  it('stacks the body when orientation is vertical', () => {
    expect(useToastStyle({ orientation: 'vertical' }).wrapper()).toContain('flex-col')
    expect(useToastStyle({ orientation: 'vertical' }).wrapper()).toContain('gap-sm')
  })

  it('places the viewport from side and swipe', () => {
    const bottomRight = useToastProviderStyle({ side: 'bottom-right', swipe: 'right' })
    expect(bottomRight.root()).toContain('right-4')
    expect(bottomRight.root()).toContain('bottom-4')
    expect(bottomRight.toast()).toContain('animate-toast-swipe-right')
    expect(bottomRight.toast()).toContain('bottom-0')

    const top = useToastProviderStyle({ side: 'top', swipe: 'up' })
    expect(top.root()).toContain('top-4')
    expect(top.root()).toContain('left-1/2')
    expect(top.toast()).toContain('animate-toast-swipe-up')

    const bottomLeft = useToastProviderStyle({ side: 'bottom-left', swipe: 'left' })
    expect(bottomLeft.root()).toContain('left-4')
    expect(bottomLeft.toast()).toContain('animate-toast-swipe-left')

    const bottom = useToastProviderStyle({ side: 'bottom', swipe: 'down' })
    expect(bottom.root()).toContain('bottom-4')
    expect(bottom.toast()).toContain('animate-toast-swipe-down')
  })

  describe('given a toast in a provider', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mountToast({
        title: 'Saved',
        description: 'Your changes are stored.',
      })
      await flush()
      const toast = document.body.querySelector('[data-slot="toast"]')
      const viewport = document.body.querySelector('[data-slot="toast-viewport"]')
      expect(toast).toBeTruthy()
      expect(toast?.textContent).toContain('Saved')
      expect(toast?.textContent).toContain('Your changes are stored.')
      expect(viewport).toBeTruthy()
      expect(viewport?.className).toContain('right-4')
      expect(viewport?.className).toContain('bottom-4')
      expect(await axe(toast as HTMLElement)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders a status icon and lets that status replace variant', async () => {
      const wrapper = mountToast({
        title: 'Failed',
        status: 'error',
        variant: 'accent',
      })
      await flush()
      const toast = document.body.querySelector('[data-slot="toast"]')
      expect(toast?.className).toContain('b-error')
      expect(toast?.className).not.toContain('b-accent')
      expect(wrapper.findComponent(Icon).props('name')).toBe('ri:indeterminate-circle-fill')
      wrapper.unmount()
    })

    it('does not render an icon when only icon is set', async () => {
      const wrapper = mountToast({
        title: 'Plain',
        icon: 'ri:star-line',
      })
      await flush()
      expect(wrapper.findComponent(Icon).exists()).toBe(false)
      wrapper.unmount()
    })

    it('spins the loading icon and shows a close button when closable', async () => {
      const wrapper = mountToast({
        title: 'Working',
        status: 'loading',
        closable: true,
      })
      await flush()
      const icon = wrapper.getComponent(Icon)
      expect(icon.props('name')).toBe('ri:loader-line')
      expect(icon.classes()).toContain('animate-spin')
      const toast = document.body.querySelector('[data-slot="toast"]')
      expect(toast?.querySelector('button')).toBeTruthy()
      wrapper.unmount()
    })

    it('renders action buttons', async () => {
      const wrapper = mountToast({
        title: 'Update',
        description: 'A new version is ready.',
        status: 'success',
        actions: [
          { label: 'Undo' },
        ],
      })
      await flush()
      const button = wrapper.getComponent(Button)
      expect(button.props('label')).toBe('Undo')
      expect(button.props('variant')).toBe('soft')
      expect(button.props('size')).toBe('sm')
      expect(button.props('color')).toBe('success')
      wrapper.unmount()
    })
  })
})
