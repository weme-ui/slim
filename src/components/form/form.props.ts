import type { StandardSchemaV1 } from '@tanstack/vue-form'
import type { PrimitiveProps } from 'reka-ui'
import type { FormValidationMode } from '~/composables/use-form-context'

export interface FormProps<TData extends Record<string, any> = Record<string, any>> extends PrimitiveProps {
  defaultValues: TData
  schema?: StandardSchemaV1<TData, TData>
  validationMode?: FormValidationMode
  errors?: Record<string, string | string[]>
  loading?: boolean
  disabled?: boolean
  class?: any
}

export interface FormEmits<TData extends Record<string, any> = Record<string, any>> {
  submit: [event: SubmitEvent]
  formSubmit: [values: TData, event: SubmitEvent]
}

export function formValidators<TData>(
  schema: StandardSchemaV1<TData, TData> | undefined,
  mode: FormValidationMode,
) {
  if (!schema)
    return undefined

  switch (mode) {
    case 'onChange':
      return { onChange: schema, onSubmit: schema }
    case 'onBlur':
      return { onBlur: schema, onSubmit: schema }
    default:
      return { onSubmit: schema }
  }
}
