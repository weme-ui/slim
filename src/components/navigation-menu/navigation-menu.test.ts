import type { NavigationMenuItem } from './navigation-menu-item.props'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import Badge from '../badge/badge.vue'
import Chip from '../chip/chip.vue'
import Icon from '../icon/icon.vue'
import { useNavigationMenuItemStyle } from './navigation-menu-item.style'
import { useNavigationMenuStyle } from './navigation-menu.style'
import NavigationMenu from './navigation-menu.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: { template: '<div />' },
    },
  ],
})

beforeAll(async () => {
  await router.push('/')
  await router.isReady()
})

const items = [
  { type: 'label', label: 'General', icon: 'ri:list-check' },
  {
    label: 'Home',
    to: '/home',
    icon: 'ri:home-4-line',
    activeIcon: 'ri:home-4-fill',
  },
  { type: 'separator', label: 'Divider' },
  {
    label: 'Inbox',
    to: '/inbox',
    icon: 'ri:inbox-line',
    disabled: true,
  },
] satisfies NavigationMenuItem[]

function mountMenu(
  props: Record<string, unknown> = {},
  slots?: Record<string, (...args: any[]) => unknown>,
) {
  return mount(NavigationMenu, {
    attachTo: document.body,
    props: { items, ...props },
    slots,
    global: {
      plugins: [router],
    },
  })
}

describe('navigation-menu', () => {
  it('applies the root layout classes', () => {
    const ui = useNavigationMenuStyle()
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('flex-col')
    expect(ui.root()).toContain('gap-3')
    expect(ui.root()).toContain('relative')
  })

  it('forwards menu ui slots onto lists, rows, and separators', () => {
    const wrapper = mountMenu({
      ui: {
        list: 'menu-list',
        item: 'menu-item',
        icon: 'menu-icon',
        separator: 'menu-separator',
      },
      items: [
        { type: 'label', label: 'General', icon: 'ri:list-check' },
        { type: 'separator', label: 'Divider' },
        {
          label: 'Settings',
          to: '/settings',
          class: 'parent-row',
          children: [{ label: 'Roles', to: '/roles', class: 'child-row' }],
        },
      ] satisfies NavigationMenuItem[],
    })
    const rows = wrapper.findAll('[data-slot="navigation-menu-item"]')

    expect(wrapper.get('ul').classes()).toContain('menu-list')
    expect(rows[0].find('div').classes()).toContain('menu-item')
    expect(rows[0].findComponent(Icon).classes()).toContain('menu-icon')
    expect(rows[1].classes()).toContain('menu-separator')
    expect(rows[1].classes()).not.toContain('menu-item')

    const child = rows[2].find('[data-slot="navigation-menu-item"]')
    expect(child.classes()).toContain('menu-item')
    expect(child.get('a').classes()).toEqual(expect.arrayContaining([
      'menu-item',
      'parent-row',
      'child-row',
    ]))
    wrapper.unmount()
  })

  it('applies link, label, and separator item classes', () => {
    const link = useNavigationMenuItemStyle({})
    expect(link.root()).toContain('flex-col')
    expect(link.base()).toContain('data-[active]:(text-highlighted font-medium')
    expect(link.base()).toContain('not-[data-active]:text-foreground')
    expect(link.base()).toContain('hover:not-[data-active]:(text-highlighted bg-muted/50)')
    expect(link.icon()).toContain('size-4')
    expect(link.label()).toContain('select-none')

    const muted = useNavigationMenuItemStyle({ variant: 'muted', type: 'label' })
    expect(muted.base()).toContain('text-xs')
    expect(muted.base()).toContain('uppercase')
    expect(muted.icon()).toContain('size-3')

    const separator = useNavigationMenuItemStyle({ type: 'separator' })
    expect(separator.root()).toContain('my-2')
    expect(separator.root()).toContain('b-b')
    expect(separator.root()).toContain('h-px')

    const disabled = useNavigationMenuItemStyle({ disabled: true })
    expect(disabled.root()).toContain('is-disabled')
  })

  describe('given a navigation menu', () => {
    it('renders grouped links and marks the active item', async () => {
      const wrapper = mountMenu({ defaultActive: '/home' })

      expect(wrapper.element.tagName).toBe('DIV')
      expect(wrapper.attributes('data-slot')).toBe('navigation-menu')
      expect(wrapper.findAll('ul')).toHaveLength(1)

      const rows = wrapper.findAll('[data-slot="navigation-menu-item"]')
      expect(rows).toHaveLength(4)
      expect(rows[0].attributes('data-type')).toBe('label')
      expect(rows[0].text()).toContain('General')
      expect(rows[0].findComponent(Icon).props('name')).toBe('ri:list-check')
      expect(rows[1].attributes('data-type')).toBe('link')
      expect(rows[1].get('a').text()).toContain('Home')
      expect(rows[1].get('a').attributes('data-active')).toBe('')
      expect(rows[1].findComponent(AnimatedToggleIcon).props('active')).toBe(true)
      expect(rows[1].get('a').attributes('href')).toBe('/home')
      expect(rows[2].attributes('data-type')).toBe('separator')
      expect(rows[2].find('a').exists()).toBe(false)
      expect(rows[3].classes()).toContain('is-disabled')
      expect(rows[3].get('a').attributes('disabled')).toBeUndefined()
      await rows[1].get('a').trigger('click')
      expect(wrapper.emitted('update:active')).toBeUndefined()
      wrapper.unmount()
    })

    it('splits an array of groups into lists', () => {
      const wrapper = mountMenu({
        items: [
          [{ label: 'Home', to: '/home' }],
          [{ label: 'Inbox', to: '/inbox' }],
        ] satisfies NavigationMenuItem[][],
      })

      expect(wrapper.findAll('ul')).toHaveLength(2)
      wrapper.unmount()
    })

    it('opens external links in a new tab and shows the external icon', () => {
      const wrapper = mountMenu({
        items: [{ label: 'Docs', to: 'https://example.com' }] satisfies NavigationMenuItem[],
      })
      const link = wrapper.get('a')

      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBeUndefined()
      expect(wrapper.findComponent(Icon).props('name')).toBe('mingcute:external-link-line')
      wrapper.unmount()
    })

    it('prefers a chip over a badge', () => {
      const wrapper = mountMenu({
        items: [
          {
            label: 'Inbox',
            to: '/inbox',
            badge: '4',
            chip: true,
          },
        ] satisfies NavigationMenuItem[],
      })

      expect(wrapper.findComponent(Chip).props('size')).toBe('sm')
      expect(wrapper.findComponent(Badge).exists()).toBe(false)
      wrapper.unmount()

      const badge = mountMenu({
        defaultActive: '/inbox',
        items: [{ label: 'Inbox', to: '/inbox', badge: '4' }] satisfies NavigationMenuItem[],
      })
      expect(badge.findComponent(Badge).props('label')).toBe('4')
      expect(badge.findComponent(Badge).props('size')).toBe('sm')
      expect(badge.findComponent(Badge).props('variant')).toBe('inverted')
      badge.unmount()
    })

    it('marks third-level items with the parent active state', () => {
      const nested = [
        {
          label: 'Settings',
          to: '/settings',
          children: [
            {
              label: 'Roles',
              to: '/roles',
              children: [{ label: 'Add role', to: '/roles/add' }],
            },
          ],
        },
      ] satisfies NavigationMenuItem[]
      const matched = mountMenu({ items: nested, defaultActive: '/roles' })
      const matchedLinks = matched.findAll('a')

      expect(matchedLinks[1].attributes('data-active')).toBe('')
      expect(matchedLinks[2].attributes('data-active')).toBe('')
      expect(matched.findAll('ul')[2].classes()).toContain('pl-6')
      matched.unmount()

      const missed = mountMenu({ items: nested, defaultActive: '/roles/add' })
      expect(missed.findAll('a')[2].attributes('data-active')).toBeUndefined()
      missed.unmount()
    })

    it('shares append when items have no id', () => {
      const wrapper = mountMenu(
        {
          items: [
            { label: 'Home', to: '/home' },
            { label: 'Inbox', to: '/inbox' },
          ] satisfies NavigationMenuItem[],
        },
        {
          append: () => h('span', { class: 'shared' }, 'Shared'),
        },
      )

      expect(wrapper.findAll('.shared')).toHaveLength(2)
      wrapper.unmount()
    })

    it('renders an append slot for the matching id', () => {
      const wrapper = mountMenu(
        {
          items: [{ id: 'inbox', label: 'Inbox', to: '/inbox' }] satisfies NavigationMenuItem[],
        },
        {
          'append-inbox': () => h('span', 'Extra'),
        },
      )

      expect(wrapper.text()).toContain('Extra')
      wrapper.unmount()
    })

    it('replaces generated lists and passes slot props', () => {
      const wrapper = mountMenu(
        { defaultActive: '/home' },
        {
          default: (slotProps: {
            groups: unknown[][]
            active?: string
            isActive: (item: { to?: string }) => boolean
          }) =>
            h(
              'p',
              `${slotProps.groups.length}:${slotProps.active}:${slotProps.isActive({ to: '/home' })}`,
            ),
        },
      )

      expect(wrapper.find('ul').exists()).toBe(false)
      expect(wrapper.text()).toBe('1:/home:true')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mountMenu({
        defaultActive: '/home',
        items: [
          { type: 'label', label: 'General' },
          { label: 'Home', to: '/home' },
        ] satisfies NavigationMenuItem[],
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
