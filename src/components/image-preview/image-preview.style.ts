import { createVariants } from '~/utils/styles'

export const useImagePreviewStyle = createVariants({
  slots: {
    root: 'relative overflow-hidden',
    trigger: 'not-[[data-disabled]]:cursor-pointer',
    content: 'inset-0 abs z-highest',
    viewport: 'flex flex-col size-full flex-center',
    loading: 'flex flex-1 gap-sm select-none flex-center',
    loadingText: 'text-sm',
    loadingIcon: 'animate-spin',
    preview: 'pointer-events-auto select-none',
    previewImage: '',
    thumbs: 'p-xl flex gap-xl pointer-events-auto bottom-4 justify-center abs',
    thumb:
      'rounded-sm cursor-pointer select-none transition-[opacity,shadow] overflow-hidden data-[highlighted]:(outline-2 outline-accent) not-[[data-highlighted]]:op-50 hover:not-[[data-highlighted]]:op-100',
    thumbImage: 'size-20 pointer-events-none',
    overlay: 'bg-[#00000080] pointer-events-auto inset-0 abs z-high backdrop-blur-3xl',
  },
})

export type ImagePreviewStyleSlots = (typeof useImagePreviewStyle)['slots']
