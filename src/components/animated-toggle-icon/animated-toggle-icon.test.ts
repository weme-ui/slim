import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import AnimatedToggleIcon from './animated-toggle-icon.vue'

describe('animated-toggle-icon', () => {
  describe('given an unselected icon', () => {
    it('sets data-slot and omits data-active', async () => {
      const wrapper = mount(AnimatedToggleIcon, {
        attachTo: document.body,
        props: {
          icon: 'ri:checkbox-blank-line',
          active: false,
        },
      })
      await nextTick()
      const root = wrapper.get('[data-slot="animated-toggle-icon"]')
      expect(root.attributes('data-active')).toBeUndefined()
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(AnimatedToggleIcon, {
        attachTo: document.body,
        props: {
          'icon': 'ri:checkbox-blank-line',
          'active': false,
          'aria-hidden': true,
        },
      })
      await nextTick()
      expect(await axe(wrapper.element, {
        rules: {
          // Iconify SVG uses role="img" without alt.
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })

  describe('given a active icon', () => {
    it('sets data-active', async () => {
      const wrapper = mount(AnimatedToggleIcon, {
        attachTo: document.body,
        props: {
          icon: 'ri:checkbox-blank-line',
          activeIcon: 'ri:checkbox-line',
          active: true,
        },
      })
      await nextTick()
      expect(wrapper.get('[data-slot="animated-toggle-icon"]').attributes('data-active')).toBe('')
      wrapper.unmount()
    })
  })
})
