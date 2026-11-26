import type { IconifyIconProps } from '@iconify/vue'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { PopoverEmits, PopoverProps } from '../popover/popover.props'
import type { IconPickerStyleSlots } from './icon-picker.style'

export interface IconPickerValue {
  icon?: string
  color?: string
}

export interface IconPickerProps
  extends
    Pick<PopoverProps, 'content' | 'portal' | 'dismissible' | 'reference'>,
    Omit<FormFieldSharedProps, 'readonly' | 'loading'> {
  modelValue?: IconPickerValue
  defaultValue?: IconPickerValue
  colors?: string[]
  icons?: string[]
  triggerIcon?: IconifyIconProps['icon']
  emptyText?: string
  placeholder?: string
  filterIcon?: IconifyIconProps['icon']
  class?: any
  ui?: Partial<IconPickerStyleSlots>
}

export interface IconPickerEmits extends PopoverEmits {
  'update:modelValue': [value: IconPickerValue]
  change: [value: IconPickerValue]
}
