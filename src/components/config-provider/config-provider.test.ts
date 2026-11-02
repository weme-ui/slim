import { mount } from '@vue/test-utils'
import { TooltipProvider } from 'reka-ui'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import ConfigProvider from './config-provider.vue'

describe('config-provider', () => {
  describe('given a default provider', () => {
    it('renders the default slot', () => {
      const wrapper = mount(ConfigProvider, {
        attachTo: document.body,
        slots: {
          default: '<p>app</p>',
        },
      })

      expect(wrapper.text()).toBe('app')
      wrapper.unmount()
    })

    it('forwards tooltip settings to TooltipProvider', () => {
      const wrapper = mount(ConfigProvider, {
        props: {
          tooltip: { delayDuration: 0, skipDelayDuration: 10 },
        },
        slots: {
          default: '<p>app</p>',
        },
      })

      const provider = wrapper.findComponent(TooltipProvider)
      expect(provider.exists()).toBe(true)
      expect(provider.props('delayDuration')).toBe(0)
      expect(provider.props('skipDelayDuration')).toBe(10)
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(ConfigProvider, {
        attachTo: document.body,
        slots: {
          default: '<p>app</p>',
        },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
