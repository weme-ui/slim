import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useColorPickerStyle = createVariants({
  slots: {
    anchor: 'flex items-center gap-2',
    anchorSwatch: 'bg-$reka-color-swatch-color ring-1 ring-inset ring-black-auto-4',
    anchorText: 'text-sm text-default',

    container: 'flex flex-col gap-3 w-66',

    colorAreaWrapper: 'b b-default rounded-lg overflow-hidden',
    colorArea: 'relative size-60 focus:outline-none focus:ring-2 focus:ring-accent',
    colorAreaThumb:
      'block size-5 rounded-full b-white-12 b-3 shadow-md cursor-pointer focus:outline-none',

    sliderWrapper: 'flex gap-3',
    sliderSwatchWrapper: 'size-10 flex flex-center ring-1 ring-border',
    sliderSwatch:
      'size-8 bg-$reka-color-swatch-color ring-1 ring-inset ring-black-auto-4 rounded-inherit',
    sliders: 'relative flex flex-1 flex-col gap-2 justify-center',
    slider: 'flex flex-y-center w-full h-4',
    sliderTrack: 'relative flex-1 h-2',
    sliderThumb:
      'block w-4 h-3 bg-white-12 shadow-md cursor-pointer ring-2 ring-accent transition-transform focus:outline-none focus:scale-110',

    fieldWrapper: 'grid grid-cols-5 gap-2',
    field: '',
    fieldInput:
      'w-full px-2 py-1.5 text-xs text-center bg-muted focus:bg-default focus:outline-accent',
  },

  variants: {
    size: {
      sm: { anchorSwatch: 'size-4' },
      md: { anchorSwatch: 'size-5' },
      lg: { anchorSwatch: 'size-6' },
    },

    radius: {
      xs: {
        anchorSwatch: 'rounded-xs',
        sliderSwatchWrapper: 'rounded-xs',
        sliderTrack: 'rounded-xs',
        sliderThumb: 'rounded-xs',
        fieldInput: 'rounded-xs',
      },
      sm: {
        anchorSwatch: 'rounded-sm',
        sliderSwatchWrapper: 'rounded-sm',
        sliderTrack: 'rounded-sm',
        sliderThumb: 'rounded-sm',
        fieldInput: 'rounded-sm',
      },
      md: {
        anchorSwatch: 'rounded-md',
        sliderSwatchWrapper: 'rounded-md',
        sliderTrack: 'rounded-md',
        sliderThumb: 'rounded-md',
        fieldInput: 'rounded-md',
      },
      lg: {
        anchorSwatch: 'rounded-lg',
        sliderSwatchWrapper: 'rounded-lg',
        sliderTrack: 'rounded-lg',
        sliderThumb: 'rounded-lg',
        fieldInput: 'rounded-lg',
      },
      xl: {
        anchorSwatch: 'rounded-xl',
        sliderSwatchWrapper: 'rounded-xl',
        sliderTrack: 'rounded-xl',
        sliderThumb: 'rounded-xl',
        fieldInput: 'rounded-xl',
      },
      full: {
        anchorSwatch: 'rounded-full',
        sliderSwatchWrapper: 'rounded-full',
        sliderTrack: 'rounded-full',
        sliderThumb: 'rounded-full',
        fieldInput: 'rounded-full',
      },
    },

    disabled: {
      true: { anchor: 'is-disabled' },
    },
  },

  defaultVariants: {
    size: 'md',
    radius: 'md',
  },
})

export type ColorPickerStyleSlots = (typeof useColorPickerStyle)['slots']
export type ColorPickerStyleProps = VariantProps<typeof useColorPickerStyle>
