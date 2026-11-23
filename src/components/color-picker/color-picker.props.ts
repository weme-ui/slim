import type { PopoverEmits, PopoverProps } from '../popover/popover.props'
import type { ColorPickerStyleProps, ColorPickerStyleSlots } from './color-picker.style'

export interface ColorPickerProps extends Pick<
  PopoverProps,
  'content' | 'portal' | 'dismissible' | 'reference'
> {
  modelValue?: string
  defaultValue?: string
  size?: ColorPickerStyleProps['size']
  radius?: ColorPickerStyleProps['radius']
  disabled?: boolean
  class?: any
  ui?: Partial<ColorPickerStyleSlots>
}

export interface ColorPickerEmits extends PopoverEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
