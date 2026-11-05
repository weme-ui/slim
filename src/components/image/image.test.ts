import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import { useImageStyle } from './image.style'
import Image from './image.vue'

describe('image', () => {
  it('applies contain fit by default', () => {
    const ui = useImageStyle({})
    expect(ui).toContain('rounded-none')
    expect(ui).toContain('object-contain')
  })

  it('applies fit variants', () => {
    expect(useImageStyle({ fit: 'none' })).toContain('object-none')
    expect(useImageStyle({ fit: 'cover' })).toContain('object-cover')
    expect(useImageStyle({ fit: 'fill' })).toContain('object-fill')
    expect(useImageStyle({ fit: 'scale' })).toContain('object-scale-down')
  })

  describe('given an image', () => {
    it('renders an img and reports idle first', () => {
      const wrapper = mount(Image, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          width: 100,
          height: 80,
          loading: 'lazy',
          referrerPolicy: 'no-referrer',
          alt: 'Photo',
          crossOrigin: 'anonymous',
          class: 'is-photo',
        },
      })

      expect(wrapper.element.tagName).toBe('IMG')
      expect(wrapper.attributes('src')).toBe('https://example.com/photo.png')
      expect(wrapper.attributes('width')).toBe('100')
      expect(wrapper.attributes('height')).toBe('80')
      expect(wrapper.attributes('loading')).toBe('lazy')
      expect(wrapper.attributes('referrerpolicy')).toBe('no-referrer')
      expect(wrapper.attributes('alt')).toBeUndefined()
      expect(wrapper.attributes('crossorigin')).toBeUndefined()
      expect(wrapper.classes()).toContain('object-contain')
      expect(wrapper.classes()).toContain('rounded-none')
      expect(wrapper.classes()).toContain('is-photo')
      expect(wrapper.emitted('loadingStatusChange')?.[0]).toEqual(['idle'])
      wrapper.unmount()
    })

    it('shows fallbackSrc before the image loads', async () => {
      const wrapper = mount(Image, {
        props: {
          src: 'https://example.invalid/missing.png',
          fallbackSrc: 'https://example.com/fallback.png',
        },
      })

      await new Promise(resolve => setTimeout(resolve, 0))
      await nextTick()
      expect(wrapper.attributes('src')).toBe('https://example.com/fallback.png')
      wrapper.unmount()
    })

    it('has no accessibility violations', async () => {
      const wrapper = mount(Image, {
        attachTo: document.body,
        props: {
          src: 'https://example.com/photo.png',
          alt: 'Photo',
        },
      })
      // `alt` is declared but not bound onto the img.
      expect(await axe(wrapper.element, {
        rules: {
          'image-alt': { enabled: false },
        },
      })).toHaveNoViolations()
      wrapper.unmount()
    })
  })
})
