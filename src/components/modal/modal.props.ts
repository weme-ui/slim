import type { IconifyIconProps } from '@iconify/vue'
import type {
  DialogContentEmits,
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootEmits,
  DialogRootProps,
} from 'reka-ui'
import type { EmitsToProps } from '~/utils/props'
import type { ModalStyleProps, ModalStyleSlots } from './modal.style'

export interface ModalProps extends DialogRootProps {
  icon?: IconifyIconProps['icon']
  title?: string
  description?: string
  side?: ModalStyleProps['side']
  size?: ModalStyleProps['size']
  loadingIcon?: IconifyIconProps['icon']
  closeIcon?: IconifyIconProps['icon']
  content?: Omit<DialogContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<DialogContentEmits>>
  portal?: boolean | Partial<DialogPortalProps>
  overlay?: boolean | Partial<DialogOverlayProps>
  dismissible?: boolean
  closable?: boolean
  loading?: boolean
  class?: any
  ui?: Partial<ModalStyleSlots>
}

export interface ModalEmits extends DialogRootEmits {
  'close:prevent': []
}
