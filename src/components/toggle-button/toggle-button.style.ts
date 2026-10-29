import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToggleButtonStyle = createVariants({
  slots: {
    root: 'font-medium flex-(inline center) cursor-pointer select-none text-nowrap relative',
    icon: 'shrink-0',
    label: '',
  },

  variants: {
    variant: {
      soft: {},
      outline: {},
      ghost: {},
    },
    size: {
      sm: { root: 'text-xs', icon: 'size-3' },
      md: { root: 'text-sm', icon: 'size-3.5' },
      lg: { root: 'text-base', icon: 'size-4' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    hasLabel: {
      true: { root: 'w-fit' },
    },
    scalable: { true: {} },
    unstyled: {
      false: { root: 'rounded' },
    },
  },

  compoundVariants: [
    {
      variant: 'soft',
      unstyled: false,
      class: { root: 'bg-muted' },
    },
    {
      variant: 'outline',
      unstyled: false,
      class: { root: 'bg-transparent b b-base data-[state=on]:b-elevated' },
    },
    {
      variant: 'ghost',
      unstyled: false,
      class: { root: 'bg-transparent' },
    },
    {
      variant: ['soft', 'outline', 'ghost'],
      unstyled: false,
      class: { root: 'data-[state=on]:(bg-elevated text-highlighted) text-foreground hover:data-[state=off]:(bg-elevated text-highlighted) focus-visible:(outline-accent-7 z-high)' },
    },

    {
      hasLabel: true,
      size: 'sm',
      class: { root: 'px-sm gap-xs h-6' },
    },
    {
      hasLabel: true,
      size: 'md',
      class: { root: 'px-md gap-sm h-8' },
    },
    {
      hasLabel: true,
      size: 'lg',
      class: { root: 'px-lg gap-md h-10' },
    },
    {
      hasLabel: false,
      size: 'sm',
      class: { root: 'size-6' },
    },
    {
      hasLabel: false,
      size: 'md',
      class: { root: 'size-8' },
    },
    {
      hasLabel: false,
      size: 'lg',
      class: { root: 'size-10' },
    },

    {
      scalable: true,
      disabled: false,
      unstyled: false,
      class: { root: 'transition-all duration-200 ease-out aria-[pressed=true]:scale-97' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
  },
})

export type ToggleButtonStyleSlots = typeof useToggleButtonStyle['slots']
export type ToggleButtonStyleProps = VariantProps<typeof useToggleButtonStyle>
