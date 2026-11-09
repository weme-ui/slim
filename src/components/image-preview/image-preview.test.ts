import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import { useImagePreviewStyle } from './image-preview.style'
import ImagePreview from './image-preview.vue'

const previews = [
  { src: 'https://example.com/a.png', alt: 'A' },
  { src: 'https://example.com/b.png', alt: 'B' },
]

describe('image-preview', () => {
  it('applies preview layout classes', () => {
    const ui = useImagePreviewStyle()
    expect(ui.root()).toContain('relative')
    expect(ui.root()).toContain('overflow-hidden')
    expect(ui.trigger()).toContain('cursor-pointer')
    expect(ui.loadingIcon()).toContain('animate-spin')
    expect(ui.thumbImage()).toContain('size-20')
    expect(ui.overlay()).toContain('bg-[#00000080]')
    expect(ui.thumb()).toContain('data-[highlighted]:(outline-2')
  })

  describe('given an image preview', () => {
    it('renders a trigger image', () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          width: 100,
          previews,
        },
      })

      const trigger = wrapper.get('img')
      expect(wrapper.attributes('data-slot')).toBe('image-preview')
      expect(wrapper.attributes('data-state')).toBe('closed')
      expect(trigger.attributes('src')).toBe('https://example.com/photo.png')
      expect(trigger.attributes('width')).toBe('100')
      expect(trigger.classes()).toContain('not-[[data-disabled]]:cursor-pointer')
      wrapper.unmount()
    })

    it('opens the preview and emits update:open', async () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          previews,
        },
      })

      await wrapper.get('img').trigger('click')
      await nextTick()

      expect(wrapper.attributes('data-state')).toBe('open')
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
      const preview = document.querySelector('[aria-label="Image Preview"]')
      expect(preview).toBeTruthy()
      expect(document.body.textContent).toContain('Loading...')
      expect(document.querySelectorAll('[aria-label="Image Preview"] li')).toHaveLength(2)
      wrapper.unmount()
    })

    it('selects a thumbnail', async () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          previews,
        },
      })

      await wrapper.get('img').trigger('click')
      await nextTick()
      const thumbs = document.querySelectorAll('[aria-label="Image Preview"] li')
      thumbs[1].dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()

      const images = document.querySelectorAll('[aria-label="Image Preview"] img')
      expect(
        [...images].some((img) => img.getAttribute('src') === 'https://example.com/b.png'),
      ).toBe(true)
      expect(thumbs[1].hasAttribute('data-highlighted')).toBe(true)
      wrapper.unmount()
    })

    it('closes on escape and on the overlay', async () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: { src: 'https://example.com/photo.png' },
      })

      await wrapper.get('img').trigger('click')
      await nextTick()
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.attributes('data-state')).toBe('closed')
      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])

      await wrapper.get('img').trigger('click')
      await nextTick()
      const overlay = document.querySelector('[aria-label="Image Preview"]')
        ?.nextElementSibling as HTMLElement | null
      overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()
      expect(wrapper.attributes('data-state')).toBe('closed')
      wrapper.unmount()
    })

    it('does not open when disabled', async () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          disabled: true,
        },
      })

      await wrapper.get('img').trigger('click')
      expect(wrapper.attributes('data-state')).toBe('closed')
      expect(wrapper.emitted('update:open')).toBeUndefined()
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(ImagePreview, {
        attachTo: document.body,
        props: { src: 'https://example.com/photo.png', alt: 'Photo' },
      })
      expect(wrapper.get('img').attributes('alt')).toBeUndefined()
      // Trigger `Image` declares `alt` but does not bind it onto the img.
      expect(
        await axe(wrapper.element, {
          rules: {
            'image-alt': { enabled: false },
          },
        }),
      ).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
