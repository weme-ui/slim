import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSegmentedControlStyle = createVariants({
  slots: {
    root: 'p-1 rounded bg-muted flex place-self-start relative',
    item: 'text-foreground rounded-inherit flex select-none transition-colors flex-center relative z-1 data-[state=checked]:text-highlighted hover:text-highlighted disabled:is-disabled',
    icon: 'shrink-0',
    label: 'text-subtle font-medium text-nowrap data-[state=checked]:(text-highlighted font-medium) data-[state=unchecked]:hover:text-foreground',
    indicator: 'rounded-inherit bg-foreground-inverted shadow-sm ease-in-out abs',
  },

  variants: {
    orientation: {
      horizontal: {
        indicator: 'will-change-[width,left] w-$indicator-size transition-[width,left] left-$indicator-offset',
      },
      vertical: {
        root: 'flex-col',
        indicator: 'will-change-[height,top] h-$indicator-size transition-[height,top] left-1 right-1 top-$indicator-offset',
      },
    },
    size: {
      sm: {
        root: 'gap-xs',
        item: 'text-xs px-sm gap-xs h-4',
        indicator: 'h-4',
      },
      md: {
        root: 'gap-sm',
        item: 'text-sm px-md gap-sm h-6',
        indicator: 'h-6',
      },
      lg: {
        root: 'gap-md',
        item: 'text-base px-lg gap-md h-8',
        indicator: 'h-8',
      },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

export type SegmentedControlStyleSlots = typeof useSegmentedControlStyle['slots']
export type SegmentedControlStyleProps = VariantProps<typeof useSegmentedControlStyle>
