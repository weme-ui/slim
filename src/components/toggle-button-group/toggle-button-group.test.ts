import type { AcceptableValue } from 'reka-ui'
import type { ToggleButtonGroupItem } from './toggle-button-group.props'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useToggleButtonGroupStyle } from './toggle-button-group.style'
import ToggleButtonGroup from './toggle-button-group.vue'

const defaultItems: ToggleButtonGroupItem[] = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

function mountGroup(groupProps: Record<string, unknown> = {}) {
  const model = ref<AcceptableValue | AcceptableValue[] | undefined>(
    groupProps.modelValue as AcceptableValue | AcceptableValue[] | undefined,
  )

  const Root = defineComponent({
    setup() {
      return () => h(ToggleButtonGroup, {
        ...groupProps,
        'items': (groupProps.items as ToggleButtonGroupItem[] | undefined) ?? defaultItems,
        'modelValue': model.value,
        'onUpdate:modelValue': (value: AcceptableValue | AcceptableValue[]) => {
          model.value = value
        },
      })
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('toggle-button-group', () => {
  it('applies default horizontal orientation', () => {
    const ui = useToggleButtonGroupStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('gap-xs')
    expect(ui.root()).not.toContain('flex-col')
  })

  it('applies vertical orientation', () => {
    const ui = useToggleButtonGroupStyle({ orientation: 'vertical' })
    expect(ui.root()).toContain('flex-col')
    expect(useToggleButtonGroupStyle({ orientation: 'horizontal' }).root()).not.toContain('flex-col')
  })

  describe('given a labeled toggle button group', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const { wrapper } = mountGroup({ type: 'single' })
      const root = wrapper.get('[data-slot="toggle-button-group"]')
      expect(root.attributes('data-slot')).toBe('toggle-button-group')
      expect(root.attributes('role')).toBe('group')
      // role="group" + roving focus attrs come from Reka ToggleGroupRoot; axe flags aria-allowed-attr.
      expect(await axe(wrapper.element, {
        rules: {
          'aria-allowed-attr': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders each item as a toggle button', () => {
      const { wrapper } = mountGroup({ type: 'single' })
      expect(wrapper.findAll('[data-slot="toggle-button"]')).toHaveLength(3)
      expect(wrapper.text()).toContain('Left')
      expect(wrapper.text()).toContain('Center')
      expect(wrapper.text()).toContain('Right')
      wrapper.unmount()
    })

    it('selects a value when an item is clicked', async () => {
      const { wrapper, model } = mountGroup({ type: 'single' })
      await wrapper.findAll('[data-slot="toggle-button"]')[1]!.trigger('click')
      await nextTick()
      expect(model.value).toBe('center')
      wrapper.unmount()
    })

    it('exposes data-state on when selected', async () => {
      const { wrapper } = mountGroup({ type: 'single', modelValue: 'left' })
      await nextTick()
      const items = wrapper.findAll('[data-slot="toggle-button"]')
      expect(items[0]!.attributes('data-state')).toBe('on')
      expect(items[1]!.attributes('data-state')).toBe('off')
      wrapper.unmount()
    })
  })

  describe('given a disabled group', () => {
    it('does not select when an item is clicked', async () => {
      const { wrapper, model } = mountGroup({ type: 'single', disabled: true })
      await wrapper.findAll('[data-slot="toggle-button"]')[0]!.trigger('click')
      await nextTick()
      expect(model.value).toBeUndefined()
      wrapper.unmount()
    })
  })

  describe('given a multiple group', () => {
    it('collects selected values into an array', async () => {
      const { wrapper, model } = mountGroup({
        type: 'multiple',
        modelValue: [],
      })
      await wrapper.findAll('[data-slot="toggle-button"]')[0]!.trigger('click')
      await nextTick()
      await wrapper.findAll('[data-slot="toggle-button"]')[2]!.trigger('click')
      await nextTick()
      expect(model.value).toEqual(['left', 'right'])
      wrapper.unmount()
    })
  })
})
