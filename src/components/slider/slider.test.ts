import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { TooltipProvider } from 'reka-ui'
import { afterEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h } from 'vue'
import FormField from '../form-field/form-field.vue'
import Form from '../form/form.vue'
import { useSliderStyle } from './slider.style'
import Slider from './slider.vue'

let wrapper: VueWrapper | undefined

function mountSlider(sliderProps: Record<string, unknown> = {}) {
  const model = (sliderProps.modelValue as number[] | undefined)
    ?? (sliderProps.defaultValue as number[] | undefined)
    ?? [40]

  const Root = defineComponent({
    setup() {
      return () => h(TooltipProvider, { delayDuration: 0 }, {
        default: () => h(Form, {
          defaultValues: { volume: model },
        }, () =>
          h(FormField, { name: 'volume', label: 'Volume' }, {
            default: () => h(Slider, sliderProps),
          })),
      })
    },
  })

  wrapper = mount(Root, { attachTo: document.body })
  return wrapper
}

afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})

describe('slider', () => {
  it('applies default horizontal size and surface classes', () => {
    const ui = useSliderStyle({})
    expect(ui.wrapper()).toContain('flex-col')
    expect(ui.root()).toContain('min-w-60')
    expect(ui.track()).toContain('h-2')
    expect(ui.track()).toContain('rounded-full')
    expect(ui.range()).toContain('h-full')
    expect(ui.thumb()).toContain('h-3.5')
    expect(ui.thumb()).toContain('w-4.5')
    expect(ui.mark()).toContain('-translate-x-1/2')
  })

  it('applies size variants', () => {
    expect(useSliderStyle({ size: 'sm' }).track()).toContain('h-1')
    expect(useSliderStyle({ size: 'sm' }).thumb()).toContain('h-2.5')
    expect(useSliderStyle({ size: 'lg' }).track()).toContain('h-3')
    expect(useSliderStyle({ size: 'lg' }).thumb()).toContain('h-4.5')
  })

  it('applies vertical orientation', () => {
    const ui = useSliderStyle({ orientation: 'vertical' })
    expect(ui.wrapper()).toContain('flex-row')
    expect(ui.root()).toContain('min-h-60')
    expect(ui.range()).toContain('w-full')
    expect(ui.track()).toContain('w-2')
    expect(ui.mark()).toContain('-translate-y-1/2')
  })

  it('applies disabled and unstyled states', () => {
    expect(useSliderStyle({ disabled: true }).root()).toContain('is-disabled')

    const styled = useSliderStyle({ unstyled: false })
    expect(styled.track()).toContain('bg-muted')
    expect(styled.range()).toContain('bg-accent')
    expect(styled.thumb()).toContain('ring-2')
    expect(styled.thumb()).toContain('ring-accent')

    const unstyled = useSliderStyle({ unstyled: true })
    expect(unstyled.track()).not.toContain('bg-muted')
    expect(unstyled.range()).not.toContain('bg-accent')
    expect(unstyled.thumb()).not.toContain('ring-2')
    expect(unstyled.marks()).not.toContain('text-subtle')
  })

  describe('given a slider inside a labeled form field', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const root = mountSlider({
        defaultValue: [40],
      })
      expect(root.get('[data-slot="slider"]').attributes('data-slot')).toBe('slider')
      // 单拇指 Reka 不设 aria-label；FormField 的 label 也没有绑到拇指上。
      expect(await axe(root.element, {
        rules: {
          'aria-input-field-name': { enabled: false },
        },
      })).toHaveNoViolations()
    })

    it('renders one thumb per value', () => {
      mountSlider({
        defaultValue: [25, 75],
      })
      expect(wrapper!.findAll('[role="slider"]')).toHaveLength(2)
    })

    it('renders step dots when showSteps is true', () => {
      mountSlider({
        defaultValue: [40],
        showSteps: true,
      })
      const track = wrapper!.get('[data-slot="slider"]').findAll('span')
      expect(track.length).toBeGreaterThan(0)
      expect(wrapper!.html()).toContain('rounded-full absolute')
    })

    it('renders three marks when showMarks is true', () => {
      mountSlider({
        defaultValue: [40],
        showMarks: true,
      })
      expect(wrapper!.text()).toContain('100')
      expect(wrapper!.text()).toContain('50')
      expect(wrapper!.text()).toContain('0')
    })
  })
})
