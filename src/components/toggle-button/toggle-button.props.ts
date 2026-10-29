import type { IconifyIconProps } from '@iconify/vue'
import type { ToggleEmits, ToggleProps } from 'reka-ui'
import type { ToggleButtonStyleProps, ToggleButtonStyleSlots } from './toggle-button.style'

export interface ToggleButtonProps extends ToggleProps {
  variant?: ToggleButtonStyleProps['variant']
  size?: ToggleButtonStyleProps['size']
  radius?: ToggleButtonStyleProps['radius']
  label?: string
  icon?: IconifyIconProps['icon']
  activeIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  scalable?: boolean
  class?: any
  ui?: Partial<ToggleButtonStyleSlots>
}

export interface ToggleButtonEmits extends ToggleEmits {}
