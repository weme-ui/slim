import type { IconifyIconProps } from '@iconify/vue'
import type { ToastStyleProps } from './toast.style'

export interface ToasterProps {
  gap: number
  orientation?: ToastStyleProps['orientation']
  closeIcon?: IconifyIconProps['icon']
  closable?: boolean
  loadingIcon?: IconifyIconProps['icon']
  class?: any
}
