import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useColorSwatchPickerStyle = createVariants({
  slots: {
    root: 'flex data-[disabled]:is-disabled',
    item: 'relative',
    swatch:
      'ring-1 ring-inset ring-black-auto-3 rounded-inherit bg-$swatch-color pointer-events-none',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    size: {
      sm: { root: 'gap-2', swatch: 'size-4' },
      md: { root: 'gap-3', swatch: 'size-6' },
      lg: { root: 'gap-4', swatch: 'size-8' },
    },
    custom: {
      true: {
        item: 'rounded-md b b-transparent transition-colors data-[state=unchecked]:hover:b-default data-[state=checked]:(b-default bg-muted)',
      },
      false: {
        item: 'rounded-full outline-transparent transition-outline-color data-[state=checked]:outline-$swatch-color/90 data-[state=unchecked]:hover:outline-$swatch-color/50',
      },
    },
  },

  compoundVariants: [
    {
      size: 'sm',
      custom: false,
      class: {
        item: 'outline-offset-1 data-[state=checked]:outline-2 data-[state=unchecked]:hover:outline-2',
      },
    },
    {
      size: 'md',
      custom: false,
      class: {
        item: 'outline-offset-2 data-[state=checked]:outline-2.5 data-[state=unchecked]:hover:outline-2.5',
      },
    },
    {
      size: 'lg',
      custom: false,
      class: {
        item: 'outline-offset-2.5 data-[state=checked]:outline-3 data-[state=unchecked]:hover:outline-3',
      },
    },

    {
      size: 'sm',
      custom: true,
      class: {
        item: 'p-0.5',
      },
    },
    {
      size: 'md',
      custom: true,
      class: {
        item: 'p-1',
      },
    },
    {
      size: 'lg',
      custom: true,
      class: {
        item: 'p-1.5',
      },
    },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    custom: false,
  },
})

export type ColorSwatchPickerStyleSlots = (typeof useColorSwatchPickerStyle)['slots']
export type ColorSwatchPickerStyleProps = VariantProps<typeof useColorSwatchPickerStyle>
