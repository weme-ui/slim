import { mount } from '@vue/test-utils'
import { ConfigProvider } from 'reka-ui'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { useNumberFormatter } from './use-number-formatter'

describe('useNumberFormatter', () => {
  it('formats percents with the default en locale', () => {
    let locale = ''
    const Consumer = defineComponent({
      setup() {
        const formatter = useNumberFormatter({ style: 'percent' })
        return () => {
          locale = formatter.value.resolvedOptions().locale
          return h('span', formatter.value.format(0.64))
        }
      },
    })

    const wrapper = mount(Consumer)
    expect(locale.startsWith('en')).toBe(true)
    expect(wrapper.text()).toBe('64%')
    wrapper.unmount()
  })

  it('keeps a plain options object from the call', () => {
    const options: { style: 'decimal' | 'percent' } = { style: 'decimal' }
    let format: ((value: number) => string) | undefined

    const Consumer = defineComponent({
      setup() {
        const formatter = useNumberFormatter(options)
        format = value => formatter.value.format(value)
        return () => h('span', format!(64))
      },
    })

    const wrapper = mount(Consumer)
    expect(wrapper.text()).toBe('64')
    options.style = 'percent'
    expect(format!(64)).toBe('64')
    wrapper.unmount()
  })

  it('exposes trigger', () => {
    let trigger: (() => void) | undefined
    const Consumer = defineComponent({
      setup() {
        const formatter = useNumberFormatter()
        trigger = formatter.trigger
        return () => h('span', formatter.value.format(1000))
      },
    })

    const wrapper = mount(Consumer)
    expect(typeof trigger).toBe('function')
    expect(wrapper.text()).toBe('1,000')
    trigger!()
    expect(wrapper.text()).toBe('1,000')
    wrapper.unmount()
  })

  describe('given a ConfigProvider locale', () => {
    it('follows the provider locale', async () => {
      let locale = ''
      const Consumer = defineComponent({
        setup() {
          const formatter = useNumberFormatter({ style: 'decimal' })
          return () => {
            locale = formatter.value.resolvedOptions().locale
            return h('span', locale)
          }
        },
      })

      const wrapper = mount(ConfigProvider, {
        props: { locale: 'de-DE' },
        slots: {
          default: () => h(Consumer),
        },
      })
      expect(locale.startsWith('de')).toBe(true)

      await wrapper.setProps({ locale: 'fr' })
      expect(locale.startsWith('fr')).toBe(true)
      wrapper.unmount()
    })
  })
})
