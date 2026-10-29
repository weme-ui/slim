import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useSwitchStyle } from './switch.style'
import Switch from './switch.vue'

function mountSwitch(
  switchProps: Record<string, unknown> = {},
  fieldProps: Record<string, unknown> = {},
) {
  const model = ref((switchProps.modelValue as boolean | undefined) ?? false)

  const Root = defineComponent({
    setup() {
      return () => h(Form, {
        defaultValues: { notifications: model.value },
      }, () =>
        h(FormField, { name: 'notifications', label: 'Notifications', ...fieldProps }, {
          default: () => h(Switch, {
            ...switchProps,
            'modelValue': model.value,
            'onUpdate:modelValue': (value: boolean) => {
              model.value = value
            },
          }),
        }))
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('switch', () => {
  it('applies default soft variant and size', () => {
    const ui = useSwitchStyle({})
    expect(ui.root()).toContain('h-5')
    expect(ui.root()).toContain('w-9')
    expect(ui.root()).toContain('rounded-full')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('group/switch')
    expect(ui.thumb()).toContain('bg-base')
    expect(ui.thumb()).toContain('size-4')
  })

  it('applies size variants', () => {
    expect(useSwitchStyle({ size: 'sm' }).root()).toContain('h-4')
    expect(useSwitchStyle({ size: 'sm' }).root()).toContain('w-7')
    expect(useSwitchStyle({ size: 'sm' }).thumb()).toContain('size-3')
    expect(useSwitchStyle({ size: 'lg' }).root()).toContain('h-6')
    expect(useSwitchStyle({ size: 'lg' }).thumb()).toContain('size-5')
  })

  it('applies outline variant border compounds', () => {
    const outline = useSwitchStyle({ variant: 'outline' }).root()
    expect(outline).toContain('data-[state=unchecked]:b')
    expect(outline).toContain('data-[state=unchecked]:b-base')

    const soft = useSwitchStyle({ variant: 'soft' }).root()
    expect(soft).not.toContain('data-[state=unchecked]:b-base')
  })

  it('applies inverted thumb colors', () => {
    expect(useSwitchStyle({ inverted: true }).thumb()).toContain('bg-inverted')
    expect(useSwitchStyle({ inverted: false }).thumb()).toContain('bg-base')
  })

  it('applies disabled and loading states', () => {
    expect(useSwitchStyle({ disabled: true }).root()).toContain('is-disabled')

    const loading = useSwitchStyle({ loading: true })
    expect(loading.root()).toContain('is-loading')
    expect(loading.indicator()).toContain('animate-spin')
  })

  it('skips appearance compounds when unstyled', () => {
    const unstyled = useSwitchStyle({ unstyled: true, inverted: true, variant: 'outline' })
    expect(unstyled.root()).not.toContain('bg-muted')
    expect(unstyled.root()).not.toContain('rounded-full')
    expect(unstyled.root()).not.toContain('rounded')
    expect(unstyled.root()).not.toContain('data-[state=unchecked]:b-base')
    expect(unstyled.thumb()).not.toContain('bg-inverted')
    expect(unstyled.thumb()).not.toContain('bg-base')
  })

  describe('given a switch inside a labeled form field', () => {
    it('has no accessibility violations', async () => {
      const { wrapper } = mountSwitch({ modelValue: false })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('exposes role switch, data-slot, and aria-checked', () => {
      const { wrapper } = mountSwitch({ modelValue: true })
      const root = wrapper.get('[data-slot="switch"]')
      expect(root.element.tagName).toBe('BUTTON')
      expect(root.attributes('role')).toBe('switch')
      expect(root.attributes('aria-checked')).toBe('true')
      expect(root.attributes('data-state')).toBe('checked')
      wrapper.unmount()
    })

    it('toggles modelValue when clicked', async () => {
      const { wrapper, model } = mountSwitch({ modelValue: false })
      await wrapper.get('[data-slot="switch"]').trigger('click')
      expect(model.value).toBe(true)
      wrapper.unmount()
    })

    it('emits change when the value updates', async () => {
      const { wrapper } = mountSwitch({ modelValue: false })
      await wrapper.get('[data-slot="switch"]').trigger('click')
      const emitted = wrapper.findComponent(Switch).emitted('change') as any[][]
      expect(emitted.at(-1)?.[0]).toBe(true)
      wrapper.unmount()
    })

    it('toggles modelValue on Enter keydown', async () => {
      const { wrapper, model } = mountSwitch({ modelValue: false })
      await wrapper.get('[data-slot="switch"]').trigger('keydown.enter')
      expect(model.value).toBe(true)
      wrapper.unmount()
    })

    it('does not toggle when FormField is disabled', async () => {
      const { wrapper, model } = mountSwitch(
        { modelValue: false },
        { disabled: true },
      )
      await wrapper.get('[data-slot="switch"]').trigger('click')
      expect(model.value).toBe(false)
      wrapper.unmount()
    })

    it('sets aria-pressed on mousedown and clears on mouseup', async () => {
      const { wrapper } = mountSwitch({ modelValue: false })
      const root = wrapper.get('[data-slot="switch"]')
      await root.trigger('mousedown')
      await nextTick()
      expect(root.attributes('aria-pressed')).toBe('true')
      await root.trigger('mouseup')
      await nextTick()
      expect(root.attributes('aria-pressed')).not.toBe('true')
      wrapper.unmount()
    })

    it('renders the loading icon when loading', async () => {
      const { wrapper } = mountSwitch({ modelValue: true, loading: true })
      await nextTick()
      expect(wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })

    it('renders checkedIcon when checked', async () => {
      const { wrapper } = mountSwitch({
        modelValue: true,
        checkedIcon: 'ri:check-line',
      })
      await nextTick()
      expect(wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })

    it('renders uncheckedIcon when unchecked', async () => {
      const { wrapper } = mountSwitch({
        modelValue: false,
        uncheckedIcon: 'ri:close-line',
      })
      await nextTick()
      expect(wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })

    it('skips svg-img-alt for icon indicators', async () => {
      // Iconify SVG uses role="img" without alt.
      const { wrapper } = mountSwitch({
        modelValue: true,
        loading: true,
      })
      await nextTick()
      expect(await axe(wrapper.element, {
        rules: {
          'svg-img-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })

  describe('given a standalone switch', () => {
    it('mounts without FormField', () => {
      const wrapper = mount(Switch, { attachTo: document.body })
      expect(wrapper.find('[data-slot="switch"]').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
