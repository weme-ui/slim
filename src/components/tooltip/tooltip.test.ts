import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { TooltipProvider } from 'reka-ui'
import { afterEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick } from 'vue'
import { useTooltipStyle } from './tooltip.style'
import Tooltip from './tooltip.vue'

let wrapper: VueWrapper | undefined

function mountTooltip(
  props: Record<string, unknown> = {},
  slots: Record<string, () => unknown> = {},
) {
  const Root = defineComponent({
    setup() {
      return () => h(TooltipProvider, { delayDuration: 0 }, {
        default: () => h(Tooltip, props, {
          default: () => 'Hover',
          ...slots,
        }),
      })
    },
  })

  wrapper = mount(Root, { attachTo: document.body })
  return wrapper
}

function tooltipContent() {
  return document.body.querySelector('[data-slot="tooltip-content"]')
}

async function flush() {
  await nextTick()
  await nextTick()
}

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('tooltip', () => {
  it('applies default content and trigger classes', () => {
    const ui = useTooltipStyle({})
    expect(ui.trigger()).toContain('focus-visible:outline-none')
    expect(ui.content()).toContain('bg-tooltip')
    expect(ui.content()).toContain('text-tooltip')
    expect(ui.content()).toContain('text-xs')
    expect(ui.content()).toContain('rounded')
    expect(ui.content()).toContain('z-highest')
    expect(ui.icon()).toContain('shrink-0')
    expect(ui.icon()).not.toContain('animate-spin')
    expect(ui.arrow()).toContain('fill-tooltip')
  })

  it('spins the icon when loading', () => {
    expect(useTooltipStyle({ loading: true }).icon()).toContain('animate-spin')
  })

  describe('given an open tooltip', () => {
    it('sets data-slot on content and has no accessibility violations', async () => {
      const root = mountTooltip({ content: 'Hint', defaultOpen: true })
      await flush()
      const content = tooltipContent()
      expect(content).toBeTruthy()
      expect(content?.textContent).toContain('Hint')
      expect(await axe(root.element)).toHaveNoViolations()
    })

    it('maps compound side to popper side and align', async () => {
      mountTooltip({
        content: 'Hint',
        defaultOpen: true,
        side: 'bottom-left',
        contentProps: { avoidCollisions: false },
      })
      await flush()
      const content = tooltipContent()
      expect(content?.getAttribute('data-side')).toBe('bottom')
      expect(content?.getAttribute('data-align')).toBe('start')
    })

    it('renders icon and prefers loading icon when loading', async () => {
      mountTooltip({
        content: 'Hint',
        defaultOpen: true,
        icon: 'ri:information-line',
      })
      await flush()
      expect(tooltipContent()?.querySelector('[data-slot="icon"]')).toBeTruthy()
      wrapper?.unmount()

      mountTooltip({
        content: 'Hint',
        defaultOpen: true,
        icon: 'ri:information-line',
        loading: true,
      })
      await flush()
      const icon = tooltipContent()?.querySelector('[data-slot="icon"]')
      expect(icon).toBeTruthy()
      expect(icon?.className).toContain('animate-spin')
    })

    it('renders content slot instead of content prop', async () => {
      mountTooltip(
        { content: 'Fallback', defaultOpen: true },
        {
          content: () => 'Custom',
        },
      )
      await flush()
      expect(tooltipContent()?.textContent).toContain('Custom')
      expect(tooltipContent()?.textContent).not.toContain('Fallback')
    })

    it('renders an arrow by default and hides it when arrowProps is false', async () => {
      mountTooltip({ content: 'Hint', defaultOpen: true })
      await flush()
      expect(tooltipContent()?.querySelector('svg')).toBeTruthy()
      wrapper?.unmount()

      mountTooltip({ content: 'Hint', defaultOpen: true, arrowProps: false })
      await flush()
      expect(tooltipContent()?.querySelector('svg')).toBeFalsy()
    })
  })
})
