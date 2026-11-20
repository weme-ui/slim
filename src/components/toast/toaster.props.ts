import type { IconifyIconProps } from '@iconify/vue'
import type { ToastStyleProps } from './toast.style'

export interface ToasterProps {
  gap: number
  orientation?: ToastStyleProps['orientation']
  closeIcon?: IconifyIconProps['icon']
  dismissible?: boolean
  loadingIcon?: IconifyIconProps['icon']
  class?: any
}
