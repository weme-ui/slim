import type { AcceptableValue, RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { RadioGroupStyleProps, RadioGroupStyleSlots } from './radio-group.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItem } from '~/composables/use-group-items'

export type RadioGroupItem = Omit<
  GroupItem<AcceptableValue>,
  | 'type'
  | 'icon'
  | 'selectedIcon'
  | 'iconClass'
  | 'onSelect'
>

export interface RadioGroupProps extends
  Omit<RadioGroupRootProps, 'asChild'>,
  Omit<FormFieldSharedProps, 'readonly' | 'loading'>
{
  items: RadioGroupItem[]
  variant?: RadioGroupStyleProps['variant']
  size?: RadioGroupStyleProps['size']
  orientation?: RadioGroupStyleProps['orientation']
  indicator?: 'start' | 'end' | 'none'
  inverted?: boolean
  unstyled?: boolean
  class?: any
  ui?: Partial<RadioGroupStyleSlots>
}

export interface RadioGroupEmits extends RadioGroupRootEmits {
  change: [value: AcceptableValue]
}
