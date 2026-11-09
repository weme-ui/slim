import type { IconifyIconProps } from '@iconify/vue'
import type {
  ToastActionProps as PrimitiveToastActionProps,
  ToastRootEmits,
  ToastRootProps,
  ToastStatus,
} from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { ToastStyleProps, ToastStyleSlots } from './toast.style'

export type ToastActionProps = Omit<ButtonProps, 'as' | 'asChild' | 'variant'> &
  Omit<PrimitiveToastActionProps, 'as' | 'asChild'>

export interface ToastData {
  icon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  actions?: ToastActionProps[]
  closable?: boolean
  class?: any
  ui?: Partial<ToastStyleSlots>
}

export interface ToastProps extends ToastRootProps {
  icon?: IconifyIconProps['icon']
  title?: string
  description?: string
  status?: ToastStatus
  variant?: ToastStyleProps['variant']
  orientation?: ToastStyleProps['orientation']
  closeIcon?: IconifyIconProps['icon']
  closable?: boolean
  loadingIcon?: IconifyIconProps['icon']
  actions?: ToastActionProps[]
  expanded?: boolean
  class?: any
  ui?: Partial<ToastStyleSlots>
}

export interface ToastEmits extends ToastRootEmits {}
