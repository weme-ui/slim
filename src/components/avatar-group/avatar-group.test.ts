import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { useAvatarGroupStyle } from './avatar-group.style'
import AvatarGroup from './avatar-group.vue'

const items = [{ fallback: 'A' }, { fallback: 'B' }, { fallback: 'C' }, { fallback: 'D' }]

describe('avatar-group', () => {
  it('applies default size classes', () => {
    const ui = useAvatarGroupStyle({})
    expect(ui.root()).toContain('flex-row-reverse')
    expect(ui.root()).toContain('justify-end')
    expect(ui.item()).toContain('ring-2')
    expect(ui.item()).toContain('ring-$background-base')
    expect(ui.item()).toContain('-me-3')
    expect(ui.item()).toContain('first:me-0')
  })

  it('applies size variants', () => {
    expect(useAvatarGroupStyle({ size: 'xs' }).item()).toContain('-me-1.65')
    expect(useAvatarGroupStyle({ size: 'sm' }).item()).toContain('-me-2')
    expect(useAvatarGroupStyle({ size: 'md' }).item()).toContain('-me-3')
    expect(useAvatarGroupStyle({ size: 'lg' }).item()).toContain('-me-3.75')
    expect(useAvatarGroupStyle({ size: 'xl' }).item()).toContain('-me-5.75')
    expect(useAvatarGroupStyle({ size: '2xl' }).item()).toContain('-me-6.75')
    expect(useAvatarGroupStyle({ size: '3xl' }).item()).toContain('-me-7.75')
    expect(useAvatarGroupStyle({ size: '4xl' }).item()).toContain('-me-11')
  })

  describe('given a limited group', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const wrapper = mount(AvatarGroup, {
        attachTo: document.body,
        props: { items, max: 3 },
      })
      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.attributes('data-slot')).toBe('avatar-group')
      expect(wrapper.classes()).toContain('flex-row-reverse')
      const avatars = wrapper.findAll('[data-slot="avatar"]')
      expect(avatars).toHaveLength(4)
      expect(avatars[0]?.text()).toBe('+1')
      expect(avatars[0]?.classes()).not.toContain('-me-3')
      expect(avatars[1]?.text()).toBe('A')
      expect(avatars[1]?.classes()).toContain('-me-3')
      expect(avatars[1]?.classes()).toContain('size-8')
      expect(avatars[2]?.text()).toBe('B')
      expect(avatars[3]?.text()).toBe('C')
      expect(wrapper.text()).not.toContain('D')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('lets an item override group color and size', () => {
      const wrapper = mount(AvatarGroup, {
        props: {
          color: 'accent',
          size: 'sm',
          items: [{ fallback: 'A', color: 'success', size: 'lg' }, { fallback: 'B' }],
        },
      })
      const avatars = wrapper.findAll('[data-slot="avatar"]')
      expect(avatars[0]?.classes()).toContain('size-10')
      expect(avatars[0]?.classes()).toContain('-me-2')
      expect(avatars[0]?.find('span').classes()).toContain('text-success')
      expect(avatars[1]?.classes()).toContain('size-6')
      expect(avatars[1]?.find('span').classes()).toContain('text-accent')
      wrapper.unmount()
    })

    it('renders the default slot instead of items', () => {
      const wrapper = mount(AvatarGroup, {
        props: { items, max: 1 },
        slots: { default: '<span class="custom-group">自定义</span>' },
      })
      expect(wrapper.find('.custom-group').exists()).toBe(true)
      expect(wrapper.find('[data-slot="avatar"]').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
