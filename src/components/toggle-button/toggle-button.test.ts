import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useToggleButtonStyle } from './toggle-button.style'
import ToggleButton from './toggle-button.vue'

function mountToggle(toggleProps: Record<string, unknown> = {}) {
  const model = ref((toggleProps.modelValue as boolean | undefined) ?? false)

  const Root = defineComponent({
    setup() {
      return () => h(ToggleButton, {
        ...toggleProps,
        'modelValue': model.value,
        'onUpdate:modelValue': (value: boolean) => {
          model.value = value
        },
      })
    },
  })

  const wrapper = mount(Root, { attachTo: document.body })
  return { wrapper, model }
}

describe('toggle-button', () => {
  it('applies default labeled size and appearance', () => {
    const ui = useToggleButtonStyle({ hasLabel: true })
    expect(ui.root()).toContain('flex-(inline center)')
    expect(ui.root()).toContain('w-fit')
    expect(ui.root()).toContain('h-8')
    expect(ui.root()).toContain('text-sm')
    expect(ui.root()).toContain('px-md')
    expect(ui.root()).toContain('rounded')
    expect(ui.root()).toContain('bg-muted')
    expect(ui.root()).toContain('data-[state=on]:(bg-elevated')
    expect(ui.root()).toContain('hover:data-[state=off]:(bg-elevated text-highlighted)')
    expect(ui.icon()).toContain('size-3.5')
  })

  it('applies square size when hasLabel is false', () => {
    expect(useToggleButtonStyle({ hasLabel: false }).root()).toContain('size-8')
    expect(useToggleButtonStyle({ hasLabel: false, size: 'sm' }).root()).toContain('size-6')
    expect(useToggleButtonStyle({ hasLabel: false, size: 'lg' }).root()).toContain('size-10')
  })

  it('applies pressed scale when scalable', () => {
    expect(useToggleButtonStyle({ scalable: true }).root()).toContain('aria-[pressed=true]:scale-97')
    expect(useToggleButtonStyle({ scalable: true }).root()).toContain('transition-all')
  })

  it('applies appearance variants', () => {
    expect(useToggleButtonStyle({ variant: 'soft' }).root()).toContain('bg-muted')
    expect(useToggleButtonStyle({ variant: 'outline' }).root()).toContain('b-base')
    expect(useToggleButtonStyle({ variant: 'outline' }).root()).toContain('data-[state=on]:b-elevated')

    const ghost = useToggleButtonStyle({ variant: 'ghost' })
    expect(ghost.root()).toContain('bg-transparent')
    expect(ghost.root()).not.toContain('bg-muted')
  })

  it('skips appearance and pressed scale when unstyled or scalable is false', () => {
    const unstyled = useToggleButtonStyle({ unstyled: true })
    expect(unstyled.root()).not.toContain('bg-muted')
    expect(unstyled.root()).not.toContain('rounded')
    expect(unstyled.root()).not.toContain('aria-[pressed=true]:scale-97')

    expect(useToggleButtonStyle({ scalable: false }).root()).not.toContain('aria-[pressed=true]:scale-97')
  })

  it('applies labeled size variants', () => {
    expect(useToggleButtonStyle({ hasLabel: true, size: 'sm' }).root()).toContain('h-6')
    expect(useToggleButtonStyle({ hasLabel: true, size: 'sm' }).icon()).toContain('size-3')
    expect(useToggleButtonStyle({ hasLabel: true, size: 'lg' }).root()).toContain('h-10')
    expect(useToggleButtonStyle({ hasLabel: true, size: 'lg' }).icon()).toContain('size-4')
  })

  it('applies disabled state', () => {
    const disabled = useToggleButtonStyle({ disabled: true, scalable: true })
    expect(disabled.root()).toContain('is-disabled')
    expect(disabled.root()).not.toContain('aria-[pressed=true]:scale-97')
  })

  describe('given a labeled toggle button', () => {
    it('sets data-slot and has no accessibility violations', async () => {
      const { wrapper } = mountToggle({ label: 'Bookmark' })
      const root = wrapper.get('[data-slot="toggle-button"]')
      expect(root.attributes('data-slot')).toBe('toggle-button')
      expect(await axe(root.element)).toHaveNoViolations()
      wrapper.unmount()
    })

    it('exposes data-state off when unchecked', () => {
      const { wrapper } = mountToggle({ label: 'Bookmark' })
      const root = wrapper.get('[data-slot="toggle-button"]')
      expect(root.attributes('data-state')).toBe('off')
      expect(root.attributes('aria-pressed')).toBe('false')
      wrapper.unmount()
    })

    it('exposes data-state on when checked', () => {
      const { wrapper } = mountToggle({ label: 'Bookmark', modelValue: true })
      const root = wrapper.get('[data-slot="toggle-button"]')
      expect(root.attributes('data-state')).toBe('on')
      wrapper.unmount()
    })

    it('toggles modelValue when clicked', async () => {
      const { wrapper, model } = mountToggle({ label: 'Bookmark' })
      await wrapper.get('[data-slot="toggle-button"]').trigger('click')
      expect(model.value).toBe(true)
      wrapper.unmount()
    })

    it('renders label text', () => {
      const { wrapper } = mountToggle({ label: 'Bookmark' })
      expect(wrapper.text()).toContain('Bookmark')
      wrapper.unmount()
    })
  })

  describe('given a disabled toggle button', () => {
    it('exposes disabled and does not toggle', async () => {
      const { wrapper, model } = mountToggle({ label: 'Bookmark', disabled: true })
      const root = wrapper.get('[data-slot="toggle-button"]')
      expect(root.attributes('disabled')).toBeDefined()
      expect(root.attributes('data-disabled')).toBe('')
      await root.trigger('click')
      await nextTick()
      expect(model.value).toBe(false)
      expect(root.attributes('aria-pressed')).toBe('false')
      wrapper.unmount()
    })
  })

  describe('given a toggle button with an icon', () => {
    it('renders AnimatedToggleIcon', async () => {
      const { wrapper } = mountToggle({
        'icon': 'ri:heart-line',
        'activeIcon': 'ri:heart-fill',
        'aria-label': 'Favorite',
      })
      await nextTick()
      expect(wrapper.find('[data-slot="animated-toggle-icon"]').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
