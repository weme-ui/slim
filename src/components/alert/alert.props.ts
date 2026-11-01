import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { AlertStyleProps, AlertStyleSlots } from './alert.style'

export interface AlertProps extends PrimitiveProps {
  variant?: AlertStyleProps['variant']
  status?: 'info' | 'success' | 'warning' | 'error'
  icon?: IconifyIconProps['icon']
  title?: string
  description?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  closable?: boolean
  closeIcon?: IconifyIconProps['icon']
  externalIcon?: IconifyIconProps['icon']
  class?: any
  ui?: Partial<AlertStyleSlots>
}
