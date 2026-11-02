import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { kbdKeysMap, useKbd } from './use-kbd'

describe('useKbd', () => {
  it('maps static keys from kbdKeysMap and uppercases unknown keys', () => {
    let enter = ''
    let unknown = ''

    const Consumer = defineComponent({
      setup() {
        const { getKbdKey } = useKbd()
        return () => {
          enter = getKbdKey('enter').join('')
          unknown = getKbdKey('k').join('')
          return h('span', `${enter}${unknown}`)
        }
      },
    })

    const wrapper = mount(Consumer)
    expect(kbdKeysMap.enter).toBe('↵')
    expect(enter).toBe('↵')
    expect(unknown).toBe('K')
    expect(getEmpty()).toEqual([])
    wrapper.unmount()
  })

  describe('given a mounted keyboard map', () => {
    it('fills meta, ctrl, and alt for the current platform', async () => {
      let meta = ''
      let ctrl = ''
      let alt = ''
      let chord = ''

      const Consumer = defineComponent({
        setup() {
          const { macOS, getKbdKey } = useKbd()
          return () => {
            meta = getKbdKey('meta').join('')
            ctrl = getKbdKey('ctrl').join('')
            alt = getKbdKey('alt').join('')
            chord = getKbdKey('shift_enter').join('')
            return h('span', {
              'data-mac': String(macOS.value),
            })
          }
        },
      })

      const wrapper = mount(Consumer)
      await wrapper.vm.$nextTick()
      const isMac = wrapper.attributes('data-mac') !== 'null'
      expect(meta).toBe(isMac ? '⌘' : 'Ctrl')
      expect(ctrl).toBe(isMac ? '⌃' : 'Ctrl')
      expect(alt).toBe(isMac ? '⌥' : 'Alt')
      expect(chord).toBe('⇧↵')
      wrapper.unmount()
    })
  })
})

function getEmpty() {
  let value: string[] = ['x']
  const Consumer = defineComponent({
    setup() {
      const { getKbdKey } = useKbd()
      value = getKbdKey()
      return () => h('span')
    },
  })
  const wrapper = mount(Consumer)
  wrapper.unmount()
  return value
}
