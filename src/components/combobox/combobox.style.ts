import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useComboboxStyle = createVariants({
  slots: {
    root: 'group relative',
    anchor: 'rounded-inherit flex size-full flex-y-center',
    values: 'flex cursor-default flex-y-center relative',
    value: 'flex text-nowrap flex-y-center',
    valueIcon: '',
    valueCount: '',
    placeholder: '',
    prefix: '',
    prefixIcon: '',
    suffix: 'ml-auto outline-none',
    suffixIcon: '',
    clearBtn: '',
    filterInput: 'outline-none bg-base left-0 right-0 top-0 fixed z-high',
    content: 'outline-none will-change-[height,transform,opacity] max-h-60 w-$reka-combobox-trigger-width origin-$reka-combobox-content-transform-origin fixed z-high overflow-hidden',
    viewport: 'flex flex-col relative',
    empty: '',
    emptyIcon: '',
    group: 'flex flex-col',
    label: '',
    item: 'group/item flex cursor-default select-none relative',
    itemIcon: '',
    itemContent: '',
    itemLabel: '',
    itemDescription: '',
    itemIndicator: 'ml-auto',
    separator: 'pointer-events-none',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    size: { sm: {}, md: {}, lg: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', suffixIcon: 'animate-spin' },
    },
    invalid: { true: {} },
    hasDescription: {
      true: {
        itemContent: 'pr-2 flex flex-col',
      },
      false: {
        item: 'flex-y-center',
      },
    },
    unstyled: {
      false: {
        root: 'b',
        values: 'text-subtle',
        valueCount: 'bg-elevated group-data-[focused]:bg-muted group-not-[[data-focused]]:group-hover:bg-muted',
        placeholder: 'text-subtle',
        filterInput: 'b-b b-base/60 placeholder:text-subtle',
        content: 'bg-base shadow-xs',
        label: 'text-subtle',
        item: 'data-[highlighted]:bg-muted',
        itemLabel: 'group-data-[highlighted]/item:font-medium',
        itemIcon: 'text-subtle group-data-[highlighted]/item:text-highlighted',
        itemDescription: 'text-subtle',
        itemIndicator: 'text-accent',
        clearBtn: 'p-0.5 rounded-full op-0 flex transition-[opacity,background-color] flex-center hover:bg-accent-3 group-data-[focused]:op-100',
        separator: 'my-1 b-b b-base',
      },
    },
  },

  compoundSlots: [
    {
      slots: [
        'root',
        'prefix',
        'suffix',
        'item',
        'itemIcon',
        'valueCount',
      ],
      unstyled: false,
      class: 'transition-colors duration-200',
    },
    {
      slots: ['prefix', 'suffix'],
      invalid: false,
      class: 'group-data-[focused]:text-highlighted not-[[data-focused]]:text-subtle',
    },

    {
      slots: [
        'prefixIcon',
        'suffixIcon',
        'emptyIcon',
        'itemIcon',
        'itemIndicator',
        'clearBtn',
      ],
      class: 'shrink-0',
    },

    {
      slots: [
        'root',
        'valueCount',
        'content',
        'item',
      ],
      unstyled: false,
      class: 'rounded',
    },
  ],

  compoundVariants: [
    {
      variant: 'soft',
      unstyled: false,
      class: { root: 'b-transparent bg-muted' },
    },
    {
      variant: 'outline',
      unstyled: false,
      class: { root: 'b-base bg-base', content: 'b b-base' },
    },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        root: 'bg-muted data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        root: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:b-elevated',
      },
    },

    {
      invalid: true,
      unstyled: false,
      class: { root: 'b-error outline-2 outline-error-4' },
    },

    {
      size: 'sm',
      unstyled: false,
      class: { anchor: 'px-1.5', filterInput: 'px-2 py-1.5' },
    },
    {
      size: 'md',
      unstyled: false,
      class: { anchor: 'px-2.5', filterInput: 'px-3 py-2.5' },
    },
    {
      size: 'lg',
      unstyled: false,
      class: { anchor: 'px-3', filterInput: 'px-4 py-3' },
    },

    {
      size: 'sm',
      unstyled: false,
      class: {
        root: 'text-xs h-6',
        anchor: 'gap-xs',
        value: 'gap-xs -me-1.25',
        valueCount: 'ml-2 text-xs py-0.25 px-1.5',
        viewport: 'mt-11',
        group: 'p-0.5',
        label: 'text-xs py-1.5 px-2.5',
        itemDescription: 'text-xs',
        item: 'gap-xs text-xs py-1.5 px-2.5',
      },
    },
    {
      size: 'md',
      unstyled: false,
      class: {
        root: 'text-sm h-8',
        anchor: 'gap-sm',
        value: 'gap-sm -me-1.5',
        valueCount: 'ml-4 text-xs py-0.5 px-1.5',
        viewport: 'mt-13.5',
        group: 'p-1',
        label: 'text-sm py-2.5 px-3.5',
        itemDescription: 'text-xs',
        item: 'gap-sm text-sm py-2.5 px-3.5',
      },
    },
    {
      size: 'lg',
      unstyled: false,
      class: {
        root: 'text-base h-10',
        anchor: 'gap-md',
        value: 'gap-sm -me-2',
        valueCount: 'ml-4 text-xs py-0.5 px-1.5',
        viewport: 'mt-14.5',
        group: 'p-1.5',
        label: 'text-base py-3 px-4',
        itemDescription: 'text-sm',
        item: 'gap-md text-base py-3 px-4',
      },
    },

    {
      size: 'sm',
      hasDescription: true,
      unstyled: false,
      class: { itemIcon: 'mt-0.5' },
    },
    {
      size: 'md',
      hasDescription: true,
      unstyled: false,
      class: { itemIcon: 'mt-0.75' },
    },
    {
      size: 'lg',
      hasDescription: true,
      unstyled: false,
      class: { itemIcon: 'mt-1' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
  },
})

export type ComboboxStyleSlots = typeof useComboboxStyle['slots']
export type ComboboxStyleProps = VariantProps<typeof useComboboxStyle>
