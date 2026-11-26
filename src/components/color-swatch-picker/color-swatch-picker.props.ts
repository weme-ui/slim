import type { RovingFocusGroupProps } from 'reka-ui'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type {
  ColorSwatchPickerStyleProps,
  ColorSwatchPickerStyleSlots,
} from './color-swatch-picker.style'

export interface ColorSwatchPickerProps
  extends RovingFocusGroupProps, Omit<FormFieldSharedProps, 'readonly' | 'loading'> {
  type?: 'accent' | 'neutral'
  colors?: string[]
  modelValue?: string
  defaultValue?: string
  orientation?: ColorSwatchPickerStyleProps['orientation']
  size?: ColorSwatchPickerStyleProps['size']
  class?: any
  ui?: Partial<ColorSwatchPickerStyleSlots>
}

export interface ColorSwatchPickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
