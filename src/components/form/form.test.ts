import type { FormValidationMode } from '~/composables/use-form-context'
import { flushPromises, mount } from '@vue/test-utils'
import * as v from 'valibot'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h } from 'vue'
import FormField from '../form-field/form-field.vue'
import { formValidators } from './form.props'
import Form from './form.vue'

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
})

function mountEmailForm(mode: FormValidationMode) {
  const onFormSubmit = vi.fn()
  const onSubmit = vi.fn()

  const Root = defineComponent({
    setup() {
      return () => h(Form, {
        defaultValues: { email: '' },
        schema,
        validationMode: mode,
        onSubmit,
        onFormSubmit,
      }, () => [
        h(FormField, { name: 'email', label: 'Email' }, {
          default: ({ field }: { field: any }) => h('input', {
            'aria-label': 'Email',
            'value': field.state.value,
            'onInput': (event: Event) => {
              field.api.handleChange((event.target as HTMLInputElement).value)
            },
            'onBlur': () => {
              field.api.handleBlur()
            },
          }),
        }),
        h('button', { type: 'submit' }, 'Save'),
      ])
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, onFormSubmit, onSubmit }
}

describe('form', () => {
  it('maps schema onto tanstack validators by mode', () => {
    expect(formValidators(undefined, 'onChange')).toBeUndefined()
    expect(formValidators(schema, 'onSubmit')).toEqual({ onSubmit: schema })
    expect(formValidators(schema, 'onBlur')).toEqual({ onBlur: schema, onSubmit: schema })
    expect(formValidators(schema, 'onChange')).toEqual({ onChange: schema, onSubmit: schema })
  })

  describe('given a form with a submit control', () => {
    it('renders layout classes, novalidate, and data-slot', () => {
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          defaultValues: { email: '' },
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })

      const form = wrapper.get('form')
      expect(form.attributes('novalidate')).toBeDefined()
      expect(form.attributes('data-slot')).toBe('form')
      expect(form.attributes('class')).toContain('flex')
      expect(form.attributes('class')).toContain('flex-col')
      expect(form.attributes('class')).toContain('gap-4')
      wrapper.unmount()
    })

    it('emits submit and formSubmit with values after native submit', async () => {
      const onSubmit = vi.fn()
      const onFormSubmit = vi.fn()
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          defaultValues: { email: 'a@b.c' },
          onSubmit,
          onFormSubmit,
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })

      await wrapper.get('form').trigger('submit')
      await flushPromises()
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onFormSubmit).toHaveBeenCalledTimes(1)
      expect(onFormSubmit.mock.calls[0]?.[0]).toEqual({ email: 'a@b.c' })
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          defaultValues: { email: '' },
        },
        slots: {
          default: '<button type="submit">Save</button>',
        },
      })
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })
  })

  describe('given a form with a schema', () => {
    it('does not validate on change when validationMode is onSubmit', async () => {
      const { wrapper, onFormSubmit, onSubmit } = mountEmailForm('onSubmit')
      await wrapper.get('input').setValue('not-an-email')
      await flushPromises()
      expect(wrapper.text()).not.toContain('Invalid email')

      await wrapper.get('form').trigger('submit')
      await flushPromises()
      expect(wrapper.text()).toContain('Invalid email')
      expect(onSubmit).not.toHaveBeenCalled()
      expect(onFormSubmit).not.toHaveBeenCalled()
      wrapper.unmount()
    })

    it('validates on change when validationMode is onChange', async () => {
      const { wrapper, onFormSubmit } = mountEmailForm('onChange')
      await wrapper.get('input').setValue('not-an-email')
      await flushPromises()
      expect(wrapper.text()).toContain('Invalid email')
      expect(onFormSubmit).not.toHaveBeenCalled()
      wrapper.unmount()
    })
  })
})
