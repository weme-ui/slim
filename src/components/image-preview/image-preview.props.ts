import type { IconifyIconProps } from '@iconify/vue'
import type { ImageProps } from '../image/image.props'
import type { ImagePreviewStyleSlots } from './image-preview.style'

export interface ImagePreviewItem {
  src: string
  alt?: string
}

export interface ImagePreviewProps extends Omit<ImageProps, 'class'> {
  open?: boolean
  previews?: ImagePreviewItem[]
  loadingText?: string
  loadingIcon?: IconifyIconProps['icon']
  closeOnEscape?: boolean
  disabled?: boolean
  class?: any
  ui?: Partial<ImagePreviewStyleSlots>
}

export interface ImagePreviewEmits {
  'update:open': [value: boolean]
}
