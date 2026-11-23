import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useColorSwatchPickerStyle = createVariants({
  slots: {
    root: 'flex gap-2',
    item: 'relative outline-transparent transition-outline-color data-[highlighted]:outline-$reka-color-swatch-picker-item-color/40 data-[state=checked]:outline-$reka-color-swatch-picker-item-color/40',
    swatch: 'peer ring-1 ring-inset ring-black-auto-4 rounded-inherit bg-$reka-color-swatch-color',
    indicator:
      'absolute absolute-center text-white-12 peer-data-[color-contrast=dark]:text-black-12',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    size: {
      sm: {
        item: 'data-[highlighted]:outline-2 data-[state=checked]:outline-2',
        swatch: 'size-6',
        indicator: '[&_svg]:size-3',
      },
      md: {
        item: 'data-[highlighted]:outline-2.5 data-[state=checked]:outline-2.5',
        swatch: 'size-8',
        indicator: '[&_svg]:size-4',
      },
      lg: {
        item: 'data-[highlighted]:outline-3 data-[state=checked]:outline-3',
        swatch: 'size-10',
        indicator: '[&_svg]:size-5',
      },
    },
    radius: {
      xs: { item: 'rounded-xs' },
      sm: { item: 'rounded-sm' },
      md: { item: 'rounded-md' },
      lg: { item: 'rounded-lg' },
      xl: { item: 'rounded-xl' },
      full: { item: 'rounded-full' },
    },
  },

  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
})

export type ColorSwatchPickerStyleSlots = (typeof useColorSwatchPickerStyle)['slots']
export type ColorSwatchPickerStyleProps = VariantProps<typeof useColorSwatchPickerStyle>
