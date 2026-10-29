import type { AcceptableValue } from 'reka-ui'
import type { RadioGroupItem } from './radio-group.props'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useRadioGroupStyle } from './radio-group.style'
import RadioGroup from './radio-group.vue'

const defaultItems: RadioGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]

function mountRadioGroup(
  groupProps: Record<string, unknown> = {},
  fieldProps: Record<string, unknown> = {},
) {
  const model = ref<AcceptableValue>(
    (groupProps.modelValue as AcceptableValue | undefined) ?? '',
  )

  const Root = defineComponent({
    setup() {
      return () => h(Form, {
        defaultValues: { plan: model.value },
      }, () =>
        h(FormField, {
          name: 'plan',
          label: 'Plan',
          nativeLabel: false,
          ...fieldProps,
        }, {
          default: () => h(RadioGroup, {
            ...groupProps,
            'items': (groupProps.items as RadioGroupItem[] | undefined) ?? defaultItems,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: AcceptableValue) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('radio-group', () => {
  it('applies default horizontal orientation, size, and radius', () => {
    const ui = useRadioGroupStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).not.toContain('flex-col')
    expect(ui.root()).toContain('py-sm')
    expect(ui.root()).toContain('gap-md')
    expect(ui.indicator()).toContain('size-4')
    expect(ui.indicator()).toContain('rounded-full')
    expect(ui.content()).toContain('text-sm')
  })

  it('applies size and orientation variants', () => {
    expect(useRadioGroupStyle({ size: 'sm' }).root()).toContain('gap-sm')
    expect(useRadioGroupStyle({ size: 'lg' }).root()).toContain('gap-lg')
    expect(useRadioGroupStyle({ orientation: 'horizontal' }).root()).not.toContain('flex-col')
    expect(useRadioGroupStyle({ orientation: 'vertical' }).root()).toContain('flex-col')
  })

  it('applies radius on the indicator', () => {
    expect(useRadioGroupStyle({ radius: 'none' }).indicator()).toContain('rounded-none')
    expect(useRadioGroupStyle({ radius: 'full' }).indicator()).toContain('rounded-full')
  })

  it('applies soft, outline, and card appearance compounds', () => {
    expect(useRadioGroupStyle({ variant: 'soft' }).indicator()).toContain('bg-muted')
    expect(useRadioGroupStyle({ variant: 'outline' }).indicator()).toContain('b-base')
    expect(useRadioGroupStyle({ variant: 'outline' }).indicator()).toContain('data-[state=checked]:b-accent')

    const card = useRadioGroupStyle({ variant: 'card' })
    expect(card.item()).toContain('b-base')
    expect(card.item()).toContain('bg-base')
    expect(card.item()).toContain('data-[state=checked]:b-accent')
  })

  it('applies inverted indicator icon colors', () => {
    expect(useRadioGroupStyle({ inverted: true }).indicatorIcon()).toContain('bg-accent-12')
    expect(useRadioGroupStyle({ inverted: false }).indicatorIcon()).toContain('bg-accent-1')
  })

  it('applies card size and radius compounds', () => {
    expect(useRadioGroupStyle({ variant: 'card', size: 'sm' }).item()).toContain('px-sm')
    expect(useRadioGroupStyle({ variant: 'card', size: 'md' }).item()).toContain('px-lg')
    expect(useRadioGroupStyle({ variant: 'card', radius: 'full' }).item()).toContain('rounded-full')
  })

  it('scales the indicator icon in when checked and out when unchecked', () => {
    const icon = useRadioGroupStyle({}).indicatorIcon()
    expect(icon).toContain('scale-0')
    expect(icon).toContain('data-[state=checked]:scale-100')
    expect(icon).toContain('transition')
  })

  it('applies disabled state', () => {
    expect(useRadioGroupStyle({ disabled: true }).root()).toContain('is-disabled')
  })

  it('skips appearance compounds when unstyled', () => {
    const unstyled = useRadioGroupStyle({ unstyled: true, variant: 'card' })
    expect(unstyled.indicator()).not.toContain('bg-muted')
    expect(unstyled.indicatorIcon()).not.toContain('scale-0')
    expect(unstyled.content()).not.toContain('text-foreground')
    expect(unstyled.item()).not.toContain('data-[state=checked]:outline-accent-4')
  })

  describe('given a group inside a form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountRadioGroup()
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('sets data-slot and renders each item as a radio', () => {
      const { wrapper } = mountRadioGroup()
      const root = wrapper.get('[data-slot="radio-group"]')
      expect(root.attributes('role')).toBe('radiogroup')
      expect(root.attributes('data-indicator')).toBe('start')
      expect(wrapper.findAll('[role="radio"]')).toHaveLength(3)
      expect(wrapper.text()).toContain('Design')
      expect(wrapper.text()).toContain('Engineering')
      wrapper.unmount()
    })

    it('selects a value when an item is clicked', async () => {
      const { wrapper, model } = mountRadioGroup()
      await wrapper.findAll('[role="radio"]')[0]!.trigger('click')
      await nextTick()
      expect(model.value).toBe('design')
      wrapper.unmount()
    })

    it('emits change when the value updates', async () => {
      const { wrapper } = mountRadioGroup()
      await wrapper.findAll('[role="radio"]')[1]!.trigger('click')
      await nextTick()
      const payloads = wrapper.findComponent(RadioGroup).emitted('change')?.map(item => item[0])
      expect(payloads).toContain('engineering')
      wrapper.unmount()
    })

    it('does not select when the group is disabled', async () => {
      const { wrapper, model } = mountRadioGroup({ disabled: true })
      await wrapper.findAll('[role="radio"]')[0]!.trigger('click')
      expect(model.value).toBe('')
      wrapper.unmount()
    })

    it('hides the visible indicator when indicator is none', async () => {
      const { wrapper } = mountRadioGroup({
        indicator: 'none',
        modelValue: 'design',
      })
      await nextTick()
      expect(wrapper.get('[data-slot="radio-group"]').attributes('data-indicator')).toBe('none')
      expect(wrapper.find('.sr-only').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('given a standalone radio group', () => {
    it('mounts without FormField', () => {
      const wrapper = mount(RadioGroup, {
        attachTo: document.body,
        props: { items: defaultItems },
      })
      expect(wrapper.find('[data-slot="radio-group"]').exists()).toBe(true)
      expect(wrapper.findAll('[role="radio"]')).toHaveLength(3)
      wrapper.unmount()
    })
  })
})
