import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAvatarGroupStyle = createVariants({
  slots: {
    root: 'flex flex-row-reverse justify-end',
    item: 'ring-2 ring-$background-base relative first:me-0',
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

  defaultVariants: {
    size: 'md',
  },
})

export type AvatarGroupStyleSlots = (typeof useAvatarGroupStyle)['slots']
export type AvatarGroupStyleProps = VariantProps<typeof useAvatarGroupStyle>
