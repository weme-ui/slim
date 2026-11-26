import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useColorSwatchPickerStyle = createVariants({
  slots: {
    root: 'flex',
    item: 'relative rounded-full outline-transparent transition-outline-color data-[state=checked]:outline-$swatch-color/90 data-[state=unchecked]:hover:outline-$swatch-color/50',
    swatch:
      'ring-1 ring-inset ring-black-auto-3 rounded-inherit bg-$swatch-color pointer-events-none',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    size: {
      sm: {
        root: 'gap-2',
        item: 'outline-offset-1 data-[state=checked]:outline-2 data-[state=unchecked]:hover:outline-2',
        swatch: 'size-4',
      },
      md: {
        root: 'gap-3',
        item: 'outline-offset-2 data-[state=checked]:outline-2.5 data-[state=unchecked]:hover:outline-2.5',
        swatch: 'size-6',
      },
      lg: {
        root: 'gap-4',
        item: 'outline-offset-2.5 data-[state=checked]:outline-3 data-[state=unchecked]:hover:outline-3',
        swatch: 'size-8',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

export type ColorSwatchPickerStyleSlots = (typeof useColorSwatchPickerStyle)['slots']
export type ColorSwatchPickerStyleProps = VariantProps<typeof useColorSwatchPickerStyle>
