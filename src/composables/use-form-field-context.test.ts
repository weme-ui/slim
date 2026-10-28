import type { FormFieldContextValue } from './use-form-field-context'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import {
  provideFormFieldContext,
  useFormFieldContext,
  useFormFieldControl,
} from './use-form-field-context'

function makeContext(overrides: Partial<FormFieldContextValue> = {}): FormFieldContextValue {
  return {
    fieldId: computed(() => 'field-1'),
    labelId: computed(() => 'label-1'),
    descriptionId: computed(() => 'desc-1'),
    name: ref('email'),
    disabled: computed(() => false),
    required: ref(true),
    loading: computed(() => false),
    valid: computed(() => true),
    invalid: computed(() => true),
    dirty: computed(() => false),
    touched: computed(() => false),
    filled: computed(() => false),
    focused: ref(false),
    dataAttributes: computed(() => ({
      'data-disabled': undefined,
      'data-valid': '',
      'data-invalid': '',
      'data-dirty': undefined,
      'data-touched': undefined,
      'data-filled': undefined,
      'data-focused': undefined,
    })),
    getControlId: () => 'field-1',
    focusControl: () => {},
    resetField: () => {},
    registryControl: () => () => {},
    handleControlFocus: () => {},
    handleControlBlur: () => {},
    ...overrides,
  }
}

function mountWithFieldContext(
  context: FormFieldContextValue,
  consumer: ReturnType<typeof defineComponent>,
  attrs: Record<string, unknown> = {},
) {
  const Provider = defineComponent({
    setup(_, { slots }) {
      provideFormFieldContext(context)
      return () => slots.default?.()
    },
  })

  return mount({
    setup() {
      return () => h(Provider, null, {
        default: () => h(consumer, attrs),
      })
    },
  })
}

describe('useFormFieldContext', () => {
  describe('given a provided field context', () => {
    it('returns the injected value from a descendant', () => {
      const Consumer = defineComponent({
        setup() {
          const context = useFormFieldContext()
          return () => h('div', { 'data-name': context?.name.value })
        },
      })

      const wrapper = mountWithFieldContext(makeContext(), Consumer)
      expect(wrapper.get('[data-name]').attributes('data-name')).toBe('email')
      wrapper.unmount()
    })
  })

  describe('given no field context', () => {
    it('returns null instead of throwing', () => {
      const Consumer = defineComponent({
        setup() {
          const context = useFormFieldContext()
          return () => h('div', {
            'data-missing': context == null
              ? 'true'
              : 'false',
          })
        },
      })

      const wrapper = mount(Consumer)
      expect(wrapper.get('[data-missing]').attributes('data-missing')).toBe('true')
      wrapper.unmount()
    })
  })

  describe('useFormFieldControl', () => {
    it('merges id, name, required, aria, and data attributes', () => {
      const Consumer = defineComponent({
        inheritAttrs: false,
        setup() {
          const { bindings } = useFormFieldControl({})
          return () => h('input', bindings.value)
        },
      })

      const wrapper = mountWithFieldContext(makeContext(), Consumer, {
        'aria-labelledby': 'extra-label',
      })
      const input = wrapper.get('input')

      expect(input.attributes('id')).toBe('field-1')
      expect(input.attributes('name')).toBe('email')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('aria-labelledby')).toBe('extra-label label-1')
      expect(input.attributes('aria-describedby')).toBe('desc-1')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('data-valid')).toBe('')
      expect(input.attributes('data-invalid')).toBe('')
      wrapper.unmount()
    })

    it('omits aria-invalid when the field is disabled', () => {
      const Consumer = defineComponent({
        inheritAttrs: false,
        setup() {
          const { bindings } = useFormFieldControl({})
          return () => h('input', bindings.value)
        },
      })

      const wrapper = mountWithFieldContext(makeContext({
        disabled: computed(() => true),
        invalid: computed(() => true),
      }), Consumer)
      const input = wrapper.get('input')

      expect(input.attributes('disabled')).toBeDefined()
      expect(input.attributes('aria-invalid')).toBeUndefined()
      wrapper.unmount()
    })

    it('keeps host attrs when mounted without FormField', () => {
      const Consumer = defineComponent({
        inheritAttrs: false,
        setup() {
          const { bindings } = useFormFieldControl({})
          return () => h('input', bindings.value)
        },
      })

      const wrapper = mount(Consumer, {
        attrs: { id: 'email', name: 'email' },
      })
      const input = wrapper.get('input')
      expect(input.attributes('id')).toBe('email')
      expect(input.attributes('name')).toBe('email')
      wrapper.unmount()
    })

    it('falls back to props when FormField is absent', () => {
      const Consumer = defineComponent({
        setup() {
          const { id, bindings, dataAttributes } = useFormFieldControl({
            id: 'qty',
            invalid: true,
          })
          return () => h('input', {
            ...bindings.value,
            ...dataAttributes.value,
            id: id.value,
          })
        },
      })

      const wrapper = mount(Consumer)
      const input = wrapper.get('input')
      expect(input.attributes('id')).toBe('qty')
      expect(input.attributes('data-invalid')).toBe('')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('data-focused')).toBeUndefined()
      wrapper.unmount()
    })

    it('sets data-focused on standalone focus and clears it on blur', async () => {
      const Consumer = defineComponent({
        setup() {
          const { dataAttributes, handleControlFocus, handleControlBlur } = useFormFieldControl({})
          return () => h('input', {
            ...dataAttributes.value,
            onFocus: () => handleControlFocus(),
            onBlur: () => handleControlBlur(),
          })
        },
      })

      const wrapper = mount(Consumer)
      const input = wrapper.get('input')
      expect(input.attributes('data-focused')).toBeUndefined()

      await input.trigger('focus')
      expect(wrapper.get('input').attributes('data-focused')).toBe('')

      await input.trigger('blur')
      expect(wrapper.get('input').attributes('data-focused')).toBeUndefined()
      wrapper.unmount()
    })
  })
})
