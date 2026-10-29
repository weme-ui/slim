import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useRadioGroupStyle = createVariants({
  slots: {
    root: 'flex',
    item: 'flex focus-visible:outline-none',
    indicator: 'flex flex-center',
    indicatorIcon: '',
    content: 'text-left flex flex-1 flex-col select-none items-start',
    label: 'font-medium text-nowrap',
    description: '',
  },

  variants: {
    variant: {
      soft: {},
      outline: {
        indicator: 'b b-base data-[state=checked]:b-accent hover:data-[state=unchecked]:b-elevated',
      },
      card: {},
    },
    size: {
      sm: {
        root: 'py-xs gap-md',
        item: 'gap-sm',
        indicator: 'my-0.5 size-3',
        indicatorIcon: 'size-1.5',
        content: 'text-xs gap-0.5',
      },
      md: {
        root: 'py-sm gap-lg',
        item: 'gap-md',
        indicator: 'my-0.5 size-4',
        indicatorIcon: 'size-2',
        content: 'text-sm gap-1',
        description: 'text-xs',
      },
      lg: {
        root: 'py-md gap-xl',
        item: 'gap-lg',
        indicator: 'my-0.5 size-5',
        indicatorIcon: 'size-3',
        content: 'text-base gap-1.5',
        description: 'text-sm',
      },
    },
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    inverted: { true: {} },
    unstyled: {
      false: {
        indicator: 'rounded-full data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted hover:data-[state=unchecked]:bg-elevated',
        indicatorIcon: 'rounded-inherit shadow-xs origin-center scale-0 data-[state=checked]:scale-100',
        content: 'text-foreground data-[state=checked]:text-highlighted',
        description: 'text-subtle',
      },
    },
  },

  compoundSlots: [
    {
      slots: [
        'root',
        'indicator',
        'indicatorIcon',
        'label',
      ],
      unstyled: false,
      class: 'transition duration-200',
    },
  ],

  compoundVariants: [
    {
      variant: 'card',
      unstyled: false,
      class: {
        item: 'b b-base bg-base data-[state=checked]:b-accent data-[state=checked]:outline-2 data-[state=checked]:outline-accent-4 hover:data-[state=unchecked]:b-elevated',
      },
    },

    {
      inverted: false,
      unstyled: false,
      class: { indicatorIcon: 'bg-accent-1' },
    },
    {
      inverted: true,
      unstyled: false,
      class: { indicatorIcon: 'bg-accent-12' },
    },

    {
      variant: 'card',
      unstyled: false,
      class: { item: 'rounded' },
    },

    {
      size: 'sm',
      variant: 'card',
      unstyled: false,
      class: {
        item: 'px-sm py-xs',
      },
    },
    {
      size: 'md',
      variant: 'card',
      unstyled: false,
      class: { item: 'px-lg py-md' },
    },
    {
      size: 'lg',
      variant: 'card',
      unstyled: false,
      class: { item: 'px-xl py-lg' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    orientation: 'horizontal',
  },
})

export type RadioGroupStyleSlots = typeof useRadioGroupStyle['slots']
export type RadioGroupStyleProps = VariantProps<typeof useRadioGroupStyle>
