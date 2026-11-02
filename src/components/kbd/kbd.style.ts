import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useKbdStyle = createVariants({
  base: 'text-(subtle center nowrap) leading-none tracking-wide font-(medium sans) rounded flex-(inline center)',

  variants: {
    variant: {
      soft: 'bg-muted',
      plain: '',
    },
    size: {
      sm: 'text-2.5 px-1 py-0.5',
      md: 'text-2.75 px-1.5 py-1',
      lg: 'text-3 px-2 py-1.25',
    },
  },

  defaultVariants: {
    variant: 'soft',
    size: 'md',
  },
})

export type KbdStyleProps = VariantProps<typeof useKbdStyle>
