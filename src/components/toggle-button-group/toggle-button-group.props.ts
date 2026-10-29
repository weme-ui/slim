import type { IconifyIconProps } from '@iconify/vue'
import type { AcceptableValue, ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { ToggleButtonProps } from '../toggle-button/toggle-button.props'
import type { ToggleButtonGroupStyleSlots } from './toggle-button-group.style'

export interface ToggleButtonGroupItem {
  label?: string
  icon?: IconifyIconProps['icon']
  activeIcon?: IconifyIconProps['icon']
  value: AcceptableValue
  disabled?: boolean
  class?: any
}

export interface ToggleButtonGroupProps extends ToggleGroupRootProps {
  items: ToggleButtonGroupItem[]
  variant?: ToggleButtonProps['variant']
  size?: ToggleButtonProps['size']
  icon?: ToggleButtonProps['icon']
  activeIcon?: ToggleButtonProps['activeIcon']
  scalable?: ToggleButtonProps['scalable']
  unstyled?: ToggleButtonProps['unstyled']
  class?: any
  ui?: Partial<ToggleButtonGroupStyleSlots>
}

export interface ToggleButtonGroupEmits extends ToggleGroupRootEmits {}
