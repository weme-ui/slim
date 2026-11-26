import { createVariants } from '~/utils/styles'

export const useIconPickerStyle = createVariants({
  slots: {
    trigger: 'text-$swatch-color',
    popover: 'relative flex flex-col p-unset min-w-80',

    filter: 'relative flex flex-center gap-2 p-3 b-b b-b-border',
    filterIcon: 'size-4 text-muted',
    filterInput: 'flex-1 bg-transparent outline-none text-sm placeholder:text-muted',
    filterTotal: 'text-xs text-muted select-none',

    colorSettings: 'flex flex-col gap-2',
    colorSettingsTrigger:
      'size-3 rounded-lg bg-$swatch-color data-[mode=pick]:bg-neutral-7 b b-black-auto-3',
    colorSettingsSwatch: 'grid grid-cols-5',
    colorSettingsMode: 'flex flex-y-center gap-2 pt-2 b-t b-t-border',
    colorSettingsModeLabel: 'text-xs text-subtle',

    viewport: 'bg-neutral-2 dark:bg-neutral-1 h-60 overflow-y-auto scroll-smooth select-none',
    list: 'grid grid-cols-10 gap-3 p-3',
    item: 'flex flex-center text-4.5 p-1 text-default rounded-md b b-transparent outline-transparent data-[active]:(outline-2 outline-accent) hover:(bg-muted b-default) data-[active]:(bg-muted b-default)',

    empty: 'h-full text-center',
    emptyIcon: 'flex flex-center pb-2',
  },
})

export type IconPickerStyleSlots = (typeof useIconPickerStyle)['slots']
