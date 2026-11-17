import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAvatarGroupStyle = createVariants({
  slots: {
    root: 'flex flex-row-reverse justify-end',
    item: 'ring-bg relative first:me-0',
  },

  variants: {
    size: {
      xs: { item: '-me-1.65' },
      sm: { item: '-me-2' },
      md: { item: '-me-3' },
      lg: { item: '-me-3.75' },
      xl: { item: '-me-5.75' },
      '2xl': { item: '-me-6.75' },
      '3xl': { item: '-me-7.75' },
      '4xl': { item: '-me-11' },
    },
  },

  compoundVariants: [
    { size: ['xs', 'sm', 'md'], class: { item: 'ring-1' } },
    { size: ['lg', 'xl'], class: { item: 'ring-1.5' } },
    { size: ['2xl', '3xl', '4xl'], class: { item: 'ring-2' } },
  ],

  defaultVariants: {
    size: 'md',
  },
})

export type AvatarGroupStyleSlots = (typeof useAvatarGroupStyle)['slots']
export type AvatarGroupStyleProps = VariantProps<typeof useAvatarGroupStyle>
