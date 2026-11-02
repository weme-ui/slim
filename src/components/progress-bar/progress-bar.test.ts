import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { h } from 'vue'
import { useProgressBarStyle } from './progress-bar.style'
import ProgressBar from './progress-bar.vue'

describe('progress-bar', () => {
  it('applies default color and size classes', () => {
    const ui = useProgressBarStyle({})
    expect(ui.root()).toContain('flex')
    expect(ui.root()).toContain('flex-col')
    expect(ui.root()).toContain('gap-xs')
    expect(ui.track()).toContain('h-2')
    expect(ui.track()).toContain('rounded-full')
    expect(ui.track()).toContain('bg-muted')
    expect(ui.indicator()).toContain('bg-foreground-highlighted')
    expect(ui.indicator()).toContain('h-full')
    expect(ui.caption()).toContain('justify-between')
    expect(ui.label()).toContain('text-sm')
    expect(ui.description()).toContain('text-xs')
    expect(ui.description()).toContain('text-muted')
    expect(ui.value()).toContain('text-xs')
  })

  it('applies color variants', () => {
    expect(useProgressBarStyle({ color: 'default' }).indicator()).toContain('bg-foreground-highlighted')
    expect(useProgressBarStyle({ color: 'accent' }).indicator()).toContain('bg-accent')
    expect(useProgressBarStyle({ color: 'info' }).indicator()).toContain('bg-info')
    expect(useProgressBarStyle({ color: 'success' }).indicator()).toContain('bg-success')
    expect(useProgressBarStyle({ color: 'warning' }).indicator()).toContain('bg-warning')
    expect(useProgressBarStyle({ color: 'error' }).indicator()).toContain('bg-error')
  })

  it('applies size variants', () => {
    const sm = useProgressBarStyle({ size: 'sm' })
    expect(sm.root()).toContain('gap-1')
    expect(sm.track()).toContain('h-1')
    expect(sm.label()).toContain('text-xs')
    expect(sm.description()).toContain('text-xs')
    expect(sm.value()).toContain('text-xs')

    const lg = useProgressBarStyle({ size: 'lg' })
    expect(lg.root()).toContain('gap-xs')
    expect(lg.track()).toContain('h-3')
    expect(lg.label()).toContain('text-base')
    expect(lg.description()).toContain('text-sm')
    expect(lg.value()).toContain('text-sm')
  })

  describe('given a labeled progress bar', () => {
    it('sets progressbar semantics and has no accessibility violations', async () => {
      const wrapper = mount(ProgressBar, {
        attachTo: document.body,
        props: { label: 'Uploading', modelValue: 64 },
      })
      expect(wrapper.attributes('data-slot')).toBe('progress-bar')
      expect(wrapper.attributes('role')).toBe('progressbar')
      expect(wrapper.attributes('aria-valuemin')).toBe('0')
      expect(wrapper.attributes('aria-valuemax')).toBe('100')
      expect(wrapper.attributes('aria-valuenow')).toBe('64')
      expect(wrapper.attributes('aria-label')).toBe('64%')
      expect(wrapper.attributes('data-state')).toBe('loading')
      expect(wrapper.attributes('data-value')).toBe('64')
      expect(wrapper.attributes('data-max')).toBe('100')
      expect(await axe(wrapper.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('renders the label and a percent value', async () => {
      const wrapper = mount(ProgressBar, {
        props: { label: 'Uploading', modelValue: 64 },
      })
      expect(wrapper.text()).toContain('Uploading')
      expect(wrapper.text()).toContain('64%')
      await wrapper.setProps({ modelValue: 20 })
      expect(wrapper.text()).toContain('20%')
      expect(wrapper.text()).not.toContain('64%')
      wrapper.unmount()
    })

    it('formats percent against max and sizes the indicator from modelValue', () => {
      const wrapper = mount(ProgressBar, {
        props: { label: 'Load', modelValue: 50, max: 200 },
      })
      expect(wrapper.text()).toContain('25%')
      expect(wrapper.html()).toContain('translateX(-50%)')
      wrapper.unmount()
    })

    it('formats a non-percent value from modelValue', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          label: 'Count',
          modelValue: 64,
          formatOptions: { style: 'decimal' },
        },
      })
      expect(wrapper.text()).toContain('64')
      expect(wrapper.text()).not.toContain('%')
      wrapper.unmount()
    })

    it('hides the value when hideValue is true', () => {
      const wrapper = mount(ProgressBar, {
        props: { label: 'Uploading', modelValue: 64, hideValue: true },
      })
      expect(wrapper.text()).toContain('Uploading')
      expect(wrapper.text()).not.toContain('64%')
      wrapper.unmount()
    })

    it('omits the caption when label is absent', () => {
      const wrapper = mount(ProgressBar, {
        props: { modelValue: 64 },
      })
      expect(wrapper.text()).not.toContain('64%')
      wrapper.unmount()
    })

    it('renders description text', () => {
      const wrapper = mount(ProgressBar, {
        props: {
          label: 'Storage',
          description: '64 GB of 100 GB used',
          modelValue: 64,
        },
      })
      expect(wrapper.text()).toContain('64 GB of 100 GB used')
      wrapper.unmount()
    })

    it('passes modelValue and the formatted value to the value slot', () => {
      const wrapper = mount(ProgressBar, {
        props: { label: 'Uploading', modelValue: 64 },
        slots: {
          value: (slotProps: { modelValue?: number | null, value: string }) =>
            h('span', `${slotProps.modelValue} ${slotProps.value}`),
        },
      })
      expect(wrapper.text()).toContain('64 64%')
      wrapper.unmount()
    })

    it('puts class on the track', () => {
      const wrapper = mount(ProgressBar, {
        props: { class: 'w-48', label: 'Uploading', modelValue: 10 },
      })
      expect(wrapper.classes()).not.toContain('w-48')
      expect(wrapper.find('.rounded-full').classes()).toContain('w-48')
      wrapper.unmount()
    })

    it('marks an empty value as indeterminate and a full value as complete', () => {
      const empty = mount(ProgressBar, {
        props: { label: 'Wait', modelValue: null },
      })
      expect(empty.attributes('data-state')).toBe('indeterminate')
      expect(empty.attributes('aria-valuenow')).toBeUndefined()
      empty.unmount()

      const done = mount(ProgressBar, {
        props: { label: 'Done', modelValue: 100 },
      })
      expect(done.attributes('data-state')).toBe('complete')
      expect(done.html()).toContain('translateX(-0%)')
      done.unmount()
    })
  })
})
