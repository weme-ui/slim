import type { IconifyIconProps } from '@iconify/vue'
import type { ColorSwatchPickerRootEmits, ColorSwatchPickerRootProps } from 'reka-ui'
import type {
  ColorSwatchPickerStyleProps,
  ColorSwatchPickerStyleSlots,
} from './color-swatch-picker.style'

export interface ColorSwatchPickerProps extends ColorSwatchPickerRootProps {
  colors?: string[]
  size?: ColorSwatchPickerStyleProps['size']
  radius?: ColorSwatchPickerStyleProps['radius']
  indicatorIcon?: IconifyIconProps['icon']
  class?: any
  ui?: Partial<ColorSwatchPickerStyleSlots>
}

export interface ColorSwatchPickerEmits extends ColorSwatchPickerRootEmits {
  change: [value: string | string[]]
}
