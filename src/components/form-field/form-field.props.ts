import type { PrimitiveProps } from 'reka-ui'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { FormFieldStyleProps, FormFieldStyleSlots } from './form-field.style'

export interface FormFieldProps extends PrimitiveProps, Omit<FormFieldSharedProps, 'name'> {
  name: string
  label?: string
  description?: string
  hint?: string
  help?: string
  orientation?: FormFieldStyleProps['orientation']
  nativeLabel?: boolean
  class?: any
  ui?: Partial<FormFieldStyleSlots>
}
