import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Icon from '../icon/icon.vue'
import { useAvatarStyle } from './avatar.style'
import Avatar from './avatar.vue'

const pixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

describe('avatar', () => {
  it('applies default color and size classes', () => {
    const ui = useAvatarStyle({})
    expect(ui.root()).toContain('rounded-full')
    expect(ui.root()).toContain('size-8')
    expect(ui.image()).toContain('object-cover')
    expect(ui.fallback()).toContain('text-highlighted')
    expect(ui.fallback()).toContain('bg-muted')
    expect(ui.fallback()).toContain('text-3')
    expect(ui.icon()).toContain('shrink-0')
  })

  it('applies color variants', () => {
    expect(useAvatarStyle({ color: 'accent' }).fallback()).toContain('text-accent')
    expect(useAvatarStyle({ color: 'accent' }).fallback()).toContain('bg-accent-3')
    expect(useAvatarStyle({ color: 'neutral' }).fallback()).toContain('text-neutral-11')
    expect(useAvatarStyle({ color: 'neutral' }).fallback()).toContain('bg-neutral-3')
    expect(useAvatarStyle({ color: 'info' }).fallback()).toContain('text-info')
    expect(useAvatarStyle({ color: 'info' }).fallback()).toContain('bg-info-3')
    expect(useAvatarStyle({ color: 'success' }).fallback()).toContain('text-success')
    expect(useAvatarStyle({ color: 'success' }).fallback()).toContain('bg-success-3')
    expect(useAvatarStyle({ color: 'warning' }).fallback()).toContain('text-warning')
    expect(useAvatarStyle({ color: 'warning' }).fallback()).toContain('bg-warning-3')
    expect(useAvatarStyle({ color: 'error' }).fallback()).toContain('text-error')
    expect(useAvatarStyle({ color: 'error' }).fallback()).toContain('bg-error-3')
    expect(useAvatarStyle({ color: 'inverse' }).fallback()).toContain('text-foreground-inverted')
    expect(useAvatarStyle({ color: 'inverse' }).fallback()).toContain('bg-foreground-highlighted')
  })

  it('applies size variants', () => {
    expect(useAvatarStyle({ size: 'xs' }).root()).toContain('size-5')
    expect(useAvatarStyle({ size: 'xs' }).fallback()).toContain('text-2.5')
    expect(useAvatarStyle({ size: 'sm' }).root()).toContain('size-6')
    expect(useAvatarStyle({ size: 'sm' }).fallback()).toContain('text-3')
    expect(useAvatarStyle({ size: 'md' }).root()).toContain('size-8')
    expect(useAvatarStyle({ size: 'lg' }).root()).toContain('size-10')
    expect(useAvatarStyle({ size: 'lg' }).fallback()).toContain('text-3.5')
    expect(useAvatarStyle({ size: 'xl' }).root()).toContain('size-16')
    expect(useAvatarStyle({ size: 'xl' }).fallback()).toContain('text-6')
    expect(useAvatarStyle({ size: '2xl' }).root()).toContain('size-20')
    expect(useAvatarStyle({ size: '2xl' }).fallback()).toContain('text-10')
    expect(useAvatarStyle({ size: '3xl' }).root()).toContain('size-24')
    expect(useAvatarStyle({ size: '3xl' }).fallback()).toContain('text-12')
    expect(useAvatarStyle({ size: '4xl' }).root()).toContain('size-32')
    expect(useAvatarStyle({ size: '4xl' }).fallback()).toContain('text-16')
  })

  describe('given a fallback avatar', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(Avatar, {
        attachTo: document.body,
        props: { fallback: 'WX' },
      })
      expect(wrapper.element.tagName).toBe('SPAN')
      expect(wrapper.attributes('data-slot')).toBe('avatar')
      expect(wrapper.text()).toBe('WX')
      expect(wrapper.classes()).toContain('size-8')
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.findComponent(Icon).exists()).toBe(false)
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the fallback slot instead of fallback text', () => {
      const wrapper = mount(Avatar, {
        props: { fallback: 'WX' },
        slots: { fallback: '文' },
      })
      expect(wrapper.text()).toBe('文')
      wrapper.unmount()
    })

    it('renders the default slot after the fallback', () => {
      const wrapper = mount(Avatar, {
        props: { fallback: 'WX' },
        slots: { default: '文' },
      })
      expect(wrapper.text()).toBe('WX文')
      wrapper.unmount()
    })

    it('renders the default icon when fallback is omitted', () => {
      const wrapper = mount(Avatar, {
        props: { icon: 'ri:user-smile-line' },
      })
      expect(wrapper.findComponent(Icon).props('name')).toBe('ri:user-smile-line')
      wrapper.unmount()
    })

    it('uses the icon slot instead of the default icon', () => {
      const wrapper = mount(Avatar, {
        slots: { icon: '<span class="custom-icon">+</span>' },
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.findComponent(Icon).exists()).toBe(false)
      wrapper.unmount()
    })
  })

  describe('given an image avatar', () => {
    it('renders the image and emits loading status', async () => {
      const wrapper = mount(Avatar, {
        props: {
          src: pixel,
          crossOrigin: 'anonymous',
          referrerPolicy: 'no-referrer',
        },
      })
      const image = wrapper.get('img')
      expect(image.attributes('src')).toBe(pixel)
      expect(image.attributes('crossorigin')).toBe('anonymous')
      expect(image.attributes('referrerpolicy')).toBe('no-referrer')
      expect(image.attributes('role')).toBe('img')
      await new Promise(resolve => setTimeout(resolve, 0))
      const statuses = wrapper.emitted('loadingStatusChange')?.map(item => item[0])
      expect(statuses?.length).toBeGreaterThan(0)
      expect(statuses?.every(status => ['idle', 'loading', 'loaded', 'error'].includes(status as string))).toBe(true)
      wrapper.unmount()
    })
  })
})
