import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToggleButtonGroupStyle = createVariants({
  slots: {
    root: 'flex gap-xs',
    item: '',
    icon: '',
    label: '',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type ToggleButtonGroupStyleSlots = typeof useToggleButtonGroupStyle['slots']
export type ToggleButtonGroupStyleProps = VariantProps<typeof useToggleButtonGroupStyle>
