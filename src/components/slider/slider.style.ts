import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSliderStyle = createVariants({
  slots: {
    wrapper: 'flex relative',
    root: 'flex h-fit select-none relative touch-none',
    track: 'rounded-full flex grow flex-y-center relative overflow-hidden',
    range: 'absolute',
    thumb: 'outline-none rounded-full cursor-grab z-high aria-[pressed=true]:cursor-grabbing',
    steps: 'flex size-full relative z-1',
    step: 'rounded-full absolute',
    marks: 'flex select-none relative',
    mark: 'absolute',
  },

  variants: {
    orientation: {
      horizontal: {
        wrapper: 'flex-col',
        root: 'min-w-60',
        range: 'h-full',
        steps: 'flex-y-center',
        mark: '-translate-x-1/2',
      },
      vertical: {
        wrapper: 'flex-row',
        root: 'min-h-60',
        range: 'w-full',
        steps: 'flex-x-center',
        mark: '-translate-y-1/2',
      },
    },
    size: { sm: {}, md: {}, lg: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
    unstyled: {
      false: {
        track: 'bg-muted transition-colors duration-200 ease-in-out hover:bg-elevated',
        range: 'bg-accent',
        thumb: 'bg-accent-1 ring-2 ring-accent transition-[transform,shadow] duration-200 ease-in-out aria-[pressed=true]:scale-90',
        step: 'bg-accent-1',
        marks: 'text-xs text-subtle',
        mark: 'text-center',
      },
    },
  },

  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        wrapper: 'gap-xs',
        track: 'h-1',
        thumb: 'h-2.5 w-3 -translate-y-0.75',
        step: 'size-0.5',
        marks: 'h-4',
        mark: 'w-3',
      },
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: {
        wrapper: 'gap-sm',
        track: 'h-2',
        thumb: 'h-3.5 w-4.5 -translate-y-0.75',
        step: 'size-0.75',
        marks: 'h-4',
        mark: 'w-4.5',
      },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        wrapper: 'gap-sm',
        track: 'h-3',
        thumb: 'h-4.5 w-5.5 -translate-y-0.75',
        step: 'size-1',
        marks: 'h-4',
        mark: 'w-5.5',
      },
    },

    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        wrapper: 'gap-sm',
        track: 'w-1',
        thumb: 'w-2.5 h-3 -translate-x-0.75',
        step: 'size-0.5',
        marks: 'w-4',
        mark: 'h-3.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: {
        wrapper: 'gap-md',
        track: 'w-2',
        thumb: 'w-3.5 h-4.5 -translate-x-0.75',
        step: 'size-0.75',
        marks: 'w-4',
        mark: 'h-4.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        wrapper: 'gap-md',
        track: 'w-3',
        thumb: 'w-4.5 h-5.5 -translate-x-0.75',
        step: 'size-1',
        marks: 'w-4',
        mark: 'h-5.5',
      },
    },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

export type SliderStyleSlots = typeof useSliderStyle['slots']
export type SliderStyleProps = VariantProps<typeof useSliderStyle>
