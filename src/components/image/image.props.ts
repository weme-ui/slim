import type { PrimitiveProps } from 'reka-ui'
import type { ImgHTMLAttributes } from 'vue'
import type { ImageStyleProps } from './image.style'

export type ImageLoadingStatus = 'idle' | 'loading' | 'error' | 'loaded'

export interface ImageProps extends PrimitiveProps {
  fit?: ImageStyleProps['fit']
  src: string
  width?: string | number
  height?: string | number
  fallbackSrc?: string
  fallbackDelayMs?: number
  alt?: string
  loading?: ImgHTMLAttributes['loading']
  referrerPolicy?: ImgHTMLAttributes['referrerpolicy']
  crossOrigin?: ImgHTMLAttributes['crossorigin']
  class?: any
}

export interface ImageEmits {
  loadingStatusChange: [value: ImageLoadingStatus]
}
