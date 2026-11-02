import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSkeletonStyle = createVariants({
  base: 'will-change-transform bg-elevated relative animate-pulse',

  variants: {
    variant: {
      text: 'rounded-full h-3',
      rect: 'rounded',
      circle: 'rounded-full',
    },
  },
})

export type SkeletonStyleProps = VariantProps<typeof useSkeletonStyle>
