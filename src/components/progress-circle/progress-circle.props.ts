import type { ProgressRootEmits, ProgressRootProps } from 'reka-ui'
import type { ProgressCircleStyleProps, ProgressCircleStyleSlots } from './progress-circle.style'

export interface ProgressCircleProps extends ProgressRootProps {
  color?: ProgressCircleStyleProps['color']
  size?: ProgressCircleStyleProps['size']
  formatOptions?: Intl.NumberFormatOptions
  hideValue?: boolean
  class?: any
  ui?: Partial<ProgressCircleStyleSlots>
}

export interface ProgressCircleEmits extends ProgressRootEmits {}
