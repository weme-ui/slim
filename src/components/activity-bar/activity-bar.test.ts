import { mount } from '@vue/test-utils'
import { TooltipProvider } from 'reka-ui'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick } from 'vue'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import Float from '../float/float.vue'
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
        tooltip: 'Open inbox',
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
    expect(ui.item()).toContain(
      'aria-[current=true]:(text-activity-bar-active bg-activity-bar-active)',
    )
    expect(ui.item()).toContain('hover:not-[[aria-current=true]]:text-activity-bar-active')
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
      const nav = bar.get('nav')

      expect(nav.element.tagName).toBe('NAV')
      expect(nav.attributes('data-slot')).toBe('activity-bar')
      expect(bar.find('header').exists()).toBe(false)
      expect(bar.find('footer').exists()).toBe(true)
      expect(bar.find('ul').exists()).toBe(false)
      const buttons = bar.findAll('button')
      expect(buttons).toHaveLength(3)
      expect(buttons[0].attributes('aria-current')).toBe('true')
      expect(buttons[0].attributes('aria-label')).toBe('Go home')
      expect(buttons[0].attributes('data-orientation')).toBe('vertical')
      expect(buttons[1].attributes('aria-label')).toBe('Open inbox')
      expect(buttons[1].attributes('aria-current')).toBeUndefined()
      expect(buttons[1].attributes('disabled')).toBe('')

      const tooltips = bar.findAllComponents(Tooltip)
      expect(tooltips[0].props('content')).toBe('Home')
      expect(tooltips[0].props('side')).toBe('right')
      expect(tooltips[1].props('content')).toBe('Open inbox')

      const icons = bar.findAllComponents(AnimatedToggleIcon)
      expect(icons[0].props('active')).toBe(true)
      expect(icons[0].props('icon')).toBe('ri:home-4-line')
      expect(icons[0].props('activeIcon')).toBe('ri:home-4-fill')
      expect(icons[1].props('active')).toBe(false)
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

      await bar.findAll('button')[1].trigger('click')

      expect(onActive).toHaveBeenCalledOnce()
      expect(onActive).toHaveBeenCalledWith(expect.objectContaining({ id: 'inbox' }))
      expect(bar.emitted('update:active')).toEqual([['inbox'], ['inbox']])
      wrapper.unmount()
    })

    it('waits for onActive before emitting update:active', async () => {
      let resolveActive = () => {}
      const onActive = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveActive = resolve
          }),
      )
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
      const pending = bar.findAll('button')[1].trigger('click')

      await nextTick()
      expect(onActive).toHaveBeenCalledOnce()
      expect(bar.emitted('update:active')).toBeUndefined()

      resolveActive()
      await pending
      expect(bar.emitted('update:active')).toEqual([['inbox'], ['inbox']])
      wrapper.unmount()
    })

    it('does not change the view when only defaultActive is set', async () => {
      const wrapper = mountBar({ defaultActive: 'home' })
      const bar = wrapper.getComponent(ActivityBar)
      const buttons = bar.findAll('button')

      expect(buttons[0].attributes('aria-current')).toBe('true')
      await buttons[2].trigger('click')
      expect(bar.emitted('update:active')).toEqual([['settings'], ['settings']])
      expect(buttons[0].attributes('aria-current')).toBe('true')
      expect(buttons[2].attributes('aria-current')).toBeUndefined()
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

      await bar.findAll('button')[1].trigger('click')

      expect(onActive).not.toHaveBeenCalled()
      expect(bar.emitted('update:active')).toBeUndefined()
      wrapper.unmount()
    })

    it('shows a chip on chipped items in content and footer', () => {
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
      const bar = wrapper.getComponent(ActivityBar)
      const buttons = bar.findAll('button')
      const floats = bar.findAllComponents(Float)

      expect(floats).toHaveLength(2)
      expect(floats[0].props('placement')).toBe('top-right')
      expect(floats[0].props('offset')).toBe('1px')
      expect(buttons[0].find('span').classes()).toEqual(
        expect.arrayContaining(['rounded-full', 'bg-accent', 'size-1.5']),
      )
      expect(buttons[1].find('span').classes()).toEqual(
        expect.arrayContaining(['rounded-full', 'bg-accent', 'size-1.5']),
      )
      wrapper.unmount()
    })

    it('renders content slots around the groups', () => {
      const wrapper = mountBar(
        { active: 'home' },
        {
          'content-top': () => h('span', 'Top'),
          'content-bottom': () => h('span', 'Bottom'),
        },
      )
      const content = wrapper.getComponent(ActivityBar).get('nav').element.children[0]

      expect(content.firstElementChild?.textContent).toBe('Top')
      expect(content.lastElementChild?.textContent).toBe('Bottom')
      wrapper.unmount()
    })

    it('renders the header slot when provided', () => {
      const wrapper = mountBar(
        { active: 'home' },
        {
          header: () => h('span', 'Logo'),
        },
      )
      const bar = wrapper.getComponent(ActivityBar)

      expect(bar.get('header').text()).toBe('Logo')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mountBar({ active: 'home' })
      expect(await axe(wrapper.getComponent(ActivityBar).get('nav').element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
