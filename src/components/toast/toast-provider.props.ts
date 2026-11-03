import type { ToastProviderProps as PrimitiveToastProviderProps } from 'reka-ui'
import type { ToastProviderStyleProps } from './toast-provider.style'
import type { ToastProps } from './toast.props'

export interface ToastProviderProps extends PrimitiveToastProviderProps {
  side?: ToastProviderStyleProps['side']
  orientation?: ToastProps['orientation']
  closeIcon?: ToastProps['closeIcon']
  loadingIcon?: ToastProps['loadingIcon']
  closable?: ToastProps['closable']
  gap?: number
}
