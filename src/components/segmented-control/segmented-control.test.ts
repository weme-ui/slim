import type { SegmentedControlItem, SegmentedControlValue } from './segmented-control.props'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useSegmentedControlStyle } from './segmented-control.style'
import SegmentedControl from './segmented-control.vue'

const defaultItems: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

function mountControl(controlProps: Record<string, unknown> = {}) {
  const model = ref<SegmentedControlValue | undefined>(
    controlProps.modelValue as SegmentedControlValue | undefined,
  )

  const Root = defineComponent({
    setup() {
      return () => h(SegmentedControl, {
        ...controlProps,
        'items': (controlProps.items as SegmentedControlItem[] | undefined) ?? defaultItems,
        'modelValue': model.value,
        'onUpdate:modelValue': (value: SegmentedControlValue) => {
          model.value = value
        },
      })
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('segmented-control', () => {
  it('applies default horizontal orientation and md size', () => {
    const ui = useSegmentedControlStyle({})
    expect(ui.root()).toContain('p-1')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('gap-sm')
    expect(ui.root()).not.toContain('flex-col')
    expect(ui.item()).toContain('text-sm')
    expect(ui.item()).toContain('h-6')
    expect(ui.indicator()).toContain('h-6')
    expect(ui.indicator()).toContain('left-$indicator-offset')
  })

  it('applies size variants', () => {
    const sm = useSegmentedControlStyle({ size: 'sm' })
    expect(sm.root()).toContain('gap-xs')
    expect(sm.item()).toContain('text-xs')
    expect(sm.item()).toContain('h-4')
    expect(sm.indicator()).toContain('h-4')

    const lg = useSegmentedControlStyle({ size: 'lg' })
    expect(lg.root()).toContain('gap-md')
    expect(lg.item()).toContain('text-base')
    expect(lg.item()).toContain('h-8')
    expect(lg.indicator()).toContain('h-8')
  })

  it('applies vertical orientation', () => {
    const ui = useSegmentedControlStyle({ orientation: 'vertical' })
    expect(ui.root()).toContain('flex-col')
    expect(ui.indicator()).toContain('top-$indicator-offset')
    expect(useSegmentedControlStyle({ orientation: 'horizontal' }).root()).not.toContain('flex-col')
  })

  it('applies disabled state', () => {
    expect(useSegmentedControlStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  describe('given a segmented control', () => {
    it('sets data-slot and renders each item as a radio', () => {
      const { wrapper } = mountControl({ defaultValue: 'week' })
      const root = wrapper.get('[data-slot="segmented-control"]')
      expect(root.attributes('role')).toBe('radiogroup')
      expect(wrapper.findAll('[data-slot="segmented-control-item"]')).toHaveLength(3)
      expect(wrapper.findAll('[role="radio"]')).toHaveLength(3)
      expect(wrapper.text()).toContain('Day')
      expect(wrapper.text()).toContain('Week')
      wrapper.unmount()
    })

    it('selects the default value', () => {
      const wrapper = mount(SegmentedControl, {
        attachTo: document.body,
        props: {
          items: defaultItems,
          defaultValue: 'week',
        },
      })
      const checked = wrapper.get('[data-state="checked"]')
      expect(checked.text()).toContain('Week')
      expect(checked.attributes('aria-checked')).toBe('true')
      expect(checked.attributes('aria-label')).toBe('Week')
      wrapper.unmount()
    })

    it('selects a value when an item is clicked', async () => {
      const { wrapper, model } = mountControl()
      await wrapper.findAll('[role="radio"]')[1]!.trigger('click')
      await nextTick()
      expect(model.value).toBe('week')
      wrapper.unmount()
    })

    it('emits change when the value updates', async () => {
      const { wrapper } = mountControl()
      await wrapper.findAll('[role="radio"]')[2]!.trigger('click')
      await nextTick()
      const payloads = wrapper.findComponent(SegmentedControl).emitted('change')?.map(item => item[0])
      expect(payloads).toContain('month')
      wrapper.unmount()
    })

    it('does not select when the group is disabled', async () => {
      const { wrapper, model } = mountControl({ disabled: true })
      await wrapper.findAll('[role="radio"]')[0]!.trigger('click')
      expect(model.value).toBeUndefined()
      expect(wrapper.findComponent(SegmentedControl).emitted('change')).toBeUndefined()
      wrapper.unmount()
    })

    it('does not select a disabled item', async () => {
      const selected: Array<SegmentedControlValue | undefined> = []
      const { wrapper, model } = mountControl({
        items: [
          { label: 'Day', value: 'day' },
          {
            label: 'Week',
            value: 'week',
            disabled: true,
            onSelect: (value: SegmentedControlValue | undefined) => {
              selected.push(value)
            },
          },
          { label: 'Month', value: 'month' },
        ] satisfies SegmentedControlItem[],
      })
      await wrapper.findAll('[role="radio"]')[1]!.trigger('click')
      expect(model.value).toBeUndefined()
      expect(selected).toEqual([])
      wrapper.unmount()
    })

    it('calls onSelect before the value changes', async () => {
      const selected: Array<SegmentedControlValue | undefined> = []
      const { wrapper, model } = mountControl({
        items: [
          { label: 'Day', value: 'day' },
          {
            label: 'Week',
            value: 'week',
            onSelect: (value: SegmentedControlValue | undefined) => {
              selected.push(value)
            },
          },
        ] satisfies SegmentedControlItem[],
      })
      await wrapper.findAll('[role="radio"]')[1]!.trigger('click')
      await nextTick()
      expect(selected).toEqual(['week'])
      expect(model.value).toBe('week')
      wrapper.unmount()
    })
  })

  describe('given a control inside a form field', () => {
    it('has no accessibility violations', async () => {
      const model = ref<SegmentedControlValue | undefined>('day')
      const Root = defineComponent({
        setup() {
          return () => h(Form, {
            defaultValues: { range: model.value },
          }, () =>
            h(FormField, {
              name: 'range',
              label: 'Range',
              nativeLabel: false,
            }, {
              default: () => h(SegmentedControl, {
                'items': defaultItems,
                'modelValue': model.value,
                'onUpdate:modelValue': (value: SegmentedControlValue) => {
                  model.value = value
                },
              }),
            }))
        },
      })
      const wrapper = mount(Root, { attachTo: document.body })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
