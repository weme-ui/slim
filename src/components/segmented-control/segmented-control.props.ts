import type { RovingFocusGroupEmits, RovingFocusGroupProps } from 'reka-ui'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItem } from '~/composables/use-group-items'
import type {
  SegmentedControlStyleProps,
  SegmentedControlStyleSlots,
} from './segmented-control.style'

export type SegmentedControlValue = string | number

export type SegmentedControlItem = Omit<GroupItem<SegmentedControlValue>, 'type' | 'description'>

export interface SegmentedControlProps
  extends RovingFocusGroupProps, Omit<FormFieldSharedProps, 'readonly' | 'loading'> {
  items: SegmentedControlItem[]
  modelValue?: SegmentedControlValue
  defaultValue?: SegmentedControlValue
  orientation?: SegmentedControlStyleProps['orientation']
  size?: SegmentedControlStyleProps['size']
  class?: any
  ui?: Partial<SegmentedControlStyleSlots>
}

export interface SegmentedControlEmits extends RovingFocusGroupEmits {
  'update:modelValue': [value: SegmentedControlValue]
  change: [value: SegmentedControlValue]
}
