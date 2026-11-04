import type { AvatarFallbackProps, AvatarImageProps, PrimitiveProps } from 'reka-ui'
import type { AvatarProps } from '../avatar/avatar.props'
import type { AvatarStyleProps } from '../avatar/avatar.style'
import type { AvatarGroupStyleSlots } from './avatar-group.style'

export type AvatarGroupItem = Omit<AvatarProps, 'crossOrigin' | 'referrerPolicy' | 'delayMs'>

export interface AvatarGroupProps extends PrimitiveProps {
  crossOrigin?: AvatarImageProps['crossOrigin']
  referrerPolicy?: AvatarImageProps['referrerPolicy']
  delayMs?: AvatarFallbackProps['delayMs']
  color?: AvatarStyleProps['color']
  size?: AvatarStyleProps['size']
  items?: AvatarGroupItem[]
  max?: number
  class?: any
  ui?: Partial<AvatarGroupStyleSlots>
}
