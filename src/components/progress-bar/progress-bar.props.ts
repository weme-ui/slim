import type { ProgressRootEmits, ProgressRootProps } from 'reka-ui'
import type { ProgressBarStyleProps, ProgressBarStyleSlots } from './progress-bar.style'

export interface ProgressBarProps extends ProgressRootProps {
  color?: ProgressBarStyleProps['color']
  size?: ProgressBarStyleProps['size']
  label?: string
  description?: string
  hideValue?: boolean
  formatOptions?: Intl.NumberFormatOptions
  class?: any
  ui?: Partial<ProgressBarStyleSlots>
}

export interface ProgressBarEmits extends ProgressRootEmits {}
