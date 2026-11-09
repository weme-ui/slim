import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import { useProgressCircleStyle } from './progress-circle.style'
import ProgressCircle from './progress-circle.vue'

const CIRCUMFERENCE = 2 * Math.PI * 16

describe('progress-circle', () => {
  it('applies default color and size classes', () => {
    const ui = useProgressCircleStyle({})
    expect(ui.root()).toContain('inline-flex')
    expect(ui.root()).toContain('flex-center')
    expect(ui.root()).toContain('gap-sm')
    expect(ui.wrapper()).toContain('size-7')
    expect(ui.wrapper()).toContain('group-data-[state=indeterminate]:animate-spin')
    expect(ui.track()).toContain('stroke-background-muted')
    expect(ui.indicator()).toContain('stroke-foreground-highlighted')
    expect(ui.indicator()).toContain('transition-stroke-dashoffset')
    expect(ui.value()).toContain('text-sm')
  })

  it('applies color variants', () => {
    expect(useProgressCircleStyle({ color: 'default' }).indicator()).toContain(
      'stroke-foreground-highlighted',
    )
    expect(useProgressCircleStyle({ color: 'accent' }).indicator()).toContain('stroke-accent')
    expect(useProgressCircleStyle({ color: 'info' }).indicator()).toContain('stroke-info')
    expect(useProgressCircleStyle({ color: 'success' }).indicator()).toContain('stroke-success')
    expect(useProgressCircleStyle({ color: 'warning' }).indicator()).toContain('stroke-warning')
    expect(useProgressCircleStyle({ color: 'error' }).indicator()).toContain('stroke-error')
  })

  it('applies size variants', () => {
    const sm = useProgressCircleStyle({ size: 'sm' })
    expect(sm.root()).toContain('gap-sm')
    expect(sm.wrapper()).toContain('size-5')
    expect(sm.value()).toContain('text-xs')

    const lg = useProgressCircleStyle({ size: 'lg' })
    expect(lg.root()).toContain('gap-md')
    expect(lg.wrapper()).toContain('size-9')
    expect(lg.value()).toContain('text-base')
  })

  describe('given a progress circle', () => {
    it('sets progressbar semantics and has no accessibility violations', async () => {
      const wrapper = mount(ProgressCircle, {
        attachTo: document.body,
        props: { modelValue: 64 },
      })
      expect(wrapper.attributes('data-slot')).toBe('progress-circle')
      expect(wrapper.attributes('role')).toBe('progressbar')
      expect(wrapper.attributes('aria-valuemin')).toBe('0')
      expect(wrapper.attributes('aria-valuemax')).toBe('100')
      expect(wrapper.attributes('aria-valuenow')).toBe('64')
      expect(wrapper.attributes('aria-label')).toBe('64%')
      expect(wrapper.attributes('data-state')).toBe('loading')
      expect(wrapper.attributes('data-value')).toBe('64')
      expect(wrapper.attributes('data-max')).toBe('100')
      expect(wrapper.find('[data-slot="progress-circle-track"]').exists()).toBe(true)
      expect(wrapper.find('[data-slot="progress-circle-indicator"]').exists()).toBe(true)
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders a percent value and sizes the arc from modelValue and max', () => {
      const wrapper = mount(ProgressCircle, {
        props: { modelValue: 50, max: 200 },
      })
      expect(wrapper.text()).toContain('25%')
      expect(
        wrapper.find('[data-slot="progress-circle-indicator"]').attributes('stroke-dashoffset'),
      ).toBe(String(CIRCUMFERENCE * 0.75))
      wrapper.unmount()
    })

    it('formats a non-percent value from modelValue', () => {
      const wrapper = mount(ProgressCircle, {
        props: {
          modelValue: 64,
          formatOptions: { style: 'decimal' },
        },
      })
      expect(wrapper.text()).toContain('64')
      expect(wrapper.text()).not.toContain('%')
      wrapper.unmount()
    })

    it('hides the value when hideValue is true', () => {
      const wrapper = mount(ProgressCircle, {
        props: { modelValue: 64, hideValue: true },
      })
      expect(wrapper.text()).not.toContain('64%')
      wrapper.unmount()
    })

    it('shows zero when modelValue is omitted and spins a fixed arc when it is null', () => {
      const omitted = mount(ProgressCircle, {})
      expect(omitted.attributes('data-state')).toBe('indeterminate')
      expect(omitted.text()).toContain('0%')
      expect(
        omitted.find('[data-slot="progress-circle-indicator"]').attributes('stroke-dashoffset'),
      ).toBe(String(CIRCUMFERENCE))
      omitted.unmount()

      const pending = mount(ProgressCircle, {
        props: { modelValue: null },
      })
      expect(pending.attributes('data-state')).toBe('indeterminate')
      expect(pending.text()).not.toContain('%')
      expect(pending.find('svg').classes()).toContain(
        'group-data-[state=indeterminate]:animate-spin',
      )
      expect(
        pending.find('[data-slot="progress-circle-indicator"]').attributes('stroke-dashoffset'),
      ).toBe(String(CIRCUMFERENCE * 0.75))
      pending.unmount()
    })

    it('passes modelValue and the formatted value to the value slot', () => {
      const wrapper = mount(ProgressCircle, {
        props: { modelValue: 64 },
        slots: {
          value: (slotProps: { modelValue?: number | null; value: string }) =>
            h('span', `${slotProps.modelValue} ${slotProps.value}`),
        },
      })
      expect(wrapper.text()).toContain('64 64%')
      wrapper.unmount()
    })

    it('puts class on the root', () => {
      const wrapper = mount(ProgressCircle, {
        props: { class: 'm-2', modelValue: 10 },
      })
      expect(wrapper.classes()).toContain('m-2')
      wrapper.unmount()
    })

    it('marks a full value as complete', () => {
      const wrapper = mount(ProgressCircle, {
        props: { modelValue: 100 },
      })
      expect(wrapper.attributes('data-state')).toBe('complete')
      expect(
        wrapper.find('[data-slot="progress-circle-indicator"]').attributes('stroke-dashoffset'),
      ).toBe('0')
      wrapper.unmount()
    })
  })
})
