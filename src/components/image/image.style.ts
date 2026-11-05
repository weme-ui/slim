import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useImageStyle = createVariants({
  base: 'rounded-none',

  variants: {
    fit: {
      none: 'object-none',
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      scale: 'object-scale-down',
    },
  },

  defaultVariants: {
    fit: 'contain',
  },
})

export type ImageStyleProps = VariantProps<typeof useImageStyle>
