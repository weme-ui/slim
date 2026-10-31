import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { SliderStyleProps, SliderStyleSlots } from './slider.style'

export interface SliderProps extends SliderRootProps {
  size?: SliderStyleProps['size']
  showSteps?: boolean
  showMarks?: boolean
  unstyled?: boolean
  class?: any
  ui?: Partial<SliderStyleSlots>
}

export interface SliderEmits extends SliderRootEmits {}
