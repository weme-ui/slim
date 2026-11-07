import { mount } from '@vue/test-utils'
import { TooltipProvider } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick } from 'vue'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import Tooltip from '../tooltip/tooltip.vue'
import { useActivityBarStyle } from './activity-bar.style'
import ActivityBar from './activity-bar.vue'

const groups = [
  {
    slot: 'content' as const,
    items: [
      {
        id: 'home',
        label: 'Home',
        tooltip: 'Go home',
        icon: 'ri:home-4-line',
        activeIcon: 'ri:home-4-fill',
      },
      {
        id: 'inbox',
        label: 'Inbox',
        icon: 'ri:inbox-line',
        disabled: true,
      },
    ],
  },
  {
    slot: 'footer' as const,
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: 'ri:settings-3-line',
      },
    ],
  },
]

function mountBar(props: Record<string, unknown> = {}, slots?: Record<string, () => unknown>) {
  const Root = defineComponent({
    setup() {
      return () => h(TooltipProvider, () => h(ActivityBar, { groups, ...props }, slots))
    },
  })

  return mount(Root, { attachTo: document.body })
}

describe('activity-bar', () => {
  it('applies activity bar layout classes', () => {
    const ui = useActivityBarStyle()
    expect(ui.root()).toContain('w-activity-bar')
    expect(ui.root()).toContain('relative')
    expect(ui.root()).toContain('flex-col')
    expect(ui.header()).toContain('flex-center')
    expect(ui.content()).toContain('grow')
    expect(ui.footer()).toContain('flex-col')
    expect(ui.group()).toContain('py-2')
    expect(ui.group()).toContain('gap-2')
    expect(ui.item()).toContain('data-[active]:(text-activity-bar-active bg-activity-bar-active)')
    expect(ui.item()).toContain('hover:not-[[data-active]]:text-activity-bar-active')
    expect(ui.item()).toContain('rounded-lg')
    expect(ui.item()).toContain('disabled:is-disabled')
    expect(ui.item()).toContain('relative')
    expect(ui.itemIcon()).toContain('size-4')
    expect(ui.itemChip()).toContain('rounded-full')
    expect(ui.itemChip()).toContain('bg-accent')
    expect(ui.itemChip()).toContain('size-1.5')
  })

  describe('given an activity bar', () => {
    it('renders a nav with grouped buttons', () => {
      const wrapper = mountBar({ active: 'home' })
      const bar = wrapper.getComponent(ActivityBar)

      expect(bar.element.tagName).toBe('NAV')
      expect(bar.attributes('data-slot')).toBe('activity-bar')
      expect(bar.find('header').exists()).toBe(false)
      expect(bar.find('footer').exists()).toBe(true)
      expect(bar.findAll('ul')).toHaveLength(2)
      expect(bar.findAll('button')).toHaveLength(3)
      expect(bar.findAll('button')[0]!.attributes('data-active')).toBe('')
      expect(bar.findAll('button')[1]!.attributes('disabled')).toBe('')

      const tooltips = bar.findAllComponents(Tooltip)
      expect(tooltips[0]!.props('content')).toBe('Go home')
      expect(tooltips[0]!.props('side')).toBe('right')
      expect(tooltips[1]!.props('content')).toBe('Inbox')

      const icons = bar.findAllComponents(AnimatedToggleIcon)
      expect(icons[0]!.props('active')).toBe(true)
      expect(icons[0]!.props('icon')).toBe('ri:home-4-line')
      expect(icons[0]!.props('activeIcon')).toBe('ri:home-4-fill')
      expect(icons[1]!.props('active')).toBe(false)
      wrapper.unmount()
    })

    it('emits update:active twice and calls onActive', async () => {
      const onActive = vi.fn()
      const wrapper = mountBar({
        active: 'home',
        groups: [
          {
            slot: 'content',
            items: [
              { id: 'home', label: 'Home', icon: 'ri:home-4-line' },
              {
                id: 'inbox',
                label: 'Inbox',
                icon: 'ri:inbox-line',
                onActive,
              },
            ],
          },
        ],
      })
      const bar = wrapper.getComponent(ActivityBar)

      await bar.findAll('button')[1]!.trigger('click')

      expect(onActive).toHaveBeenCalledOnce()
      expect(onActive).toHaveBeenCalledWith(expect.objectContaining({ id: 'inbox' }))
      expect(bar.emitted('update:active')).toEqual([
        ['inbox'],
        ['inbox'],
      ])
      wrapper.unmount()
    })

    it('waits for onActive before emitting update:active', async () => {
      let resolveActive = () => {}
      const onActive = vi.fn(() => new Promise<void>((resolve) => {
        resolveActive = resolve
      }))
      const wrapper = mountBar({
        active: 'home',
        groups: [
          {
            slot: 'content',
            items: [
              { id: 'home', label: 'Home', icon: 'ri:home-4-line' },
              {
                id: 'inbox',
                label: 'Inbox',
                icon: 'ri:inbox-line',
                onActive,
              },
            ],
          },
        ],
      })
      const bar = wrapper.getComponent(ActivityBar)
      const pending = bar.findAll('button')[1]!.trigger('click')

      await nextTick()
      expect(onActive).toHaveBeenCalledOnce()
      expect(bar.emitted('update:active')).toBeUndefined()

      resolveActive()
      await pending
      expect(bar.emitted('update:active')).toEqual([
        ['inbox'],
        ['inbox'],
      ])
      wrapper.unmount()
    })

    it('does not change the view when only defaultActive is set', async () => {
      const wrapper = mountBar({ defaultActive: 'home' })
      const bar = wrapper.getComponent(ActivityBar)
      const buttons = bar.findAll('button')

      expect(buttons[0]!.attributes('data-active')).toBe('')
      await buttons[2]!.trigger('click')
      expect(bar.emitted('update:active')).toEqual([
        ['settings'],
        ['settings'],
      ])
      expect(buttons[0]!.attributes('data-active')).toBe('')
      expect(buttons[2]!.attributes('data-active')).toBeUndefined()
      wrapper.unmount()
    })

    it('ignores a disabled item', async () => {
      const onActive = vi.fn()
      const wrapper = mountBar({
        active: 'home',
        groups: [
          {
            slot: 'content',
            items: [
              { id: 'home', label: 'Home', icon: 'ri:home-4-line' },
              {
                id: 'inbox',
                label: 'Inbox',
                icon: 'ri:inbox-line',
                disabled: true,
                onActive,
              },
            ],
          },
        ],
      })
      const bar = wrapper.getComponent(ActivityBar)

      await bar.findAll('button')[1]!.trigger('click')

      expect(onActive).not.toHaveBeenCalled()
      expect(bar.emitted('update:active')).toBeUndefined()
      wrapper.unmount()
    })

    it('shows a chip only on content items', () => {
      const wrapper = mountBar({
        active: 'home',
        groups: [
          {
            slot: 'content',
            items: [
              {
                id: 'home',
                label: 'Home',
                icon: 'ri:home-4-line',
                chipped: true,
              },
            ],
          },
          {
            slot: 'footer',
            items: [
              {
                id: 'settings',
                label: 'Settings',
                icon: 'ri:settings-3-line',
                chipped: true,
              },
            ],
          },
        ],
      })
      const buttons = wrapper.getComponent(ActivityBar).findAll('button')

      expect(buttons[0]!.find('span').classes()).toEqual(expect.arrayContaining([
        'rounded-full',
        'bg-accent',
        'size-1.5',
      ]))
      expect(buttons[1]!.find('span').exists()).toBe(false)
      wrapper.unmount()
    })

    it('renders the header slot when provided', () => {
      const wrapper = mountBar({ active: 'home' }, {
        header: () => h('span', 'Logo'),
      })
      const bar = wrapper.getComponent(ActivityBar)

      expect(bar.get('header').text()).toBe('Logo')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mountBar({ active: 'home' })
      // Icon buttons have no accessible name. `label` only becomes Tooltip content.
      expect(await axe(wrapper.getComponent(ActivityBar).element, {
        rules: {
          'button-name': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
