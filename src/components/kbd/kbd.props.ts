import type { PrimitiveProps } from 'reka-ui'
import type { KbdStyleProps } from './kbd.style'
import type { KbdKey } from '~/composables/use-kbd'

type KbdValue = KbdKey | KbdKey[] | string | string[]

export interface KbdProps extends PrimitiveProps {
  variant?: KbdStyleProps['variant']
  size?: KbdStyleProps['size']
  value?: KbdValue
  class?: any
}
