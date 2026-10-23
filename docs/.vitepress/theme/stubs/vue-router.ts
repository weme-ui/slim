import { defineComponent } from 'vue'

function toHref(to: unknown) {
  if (typeof to === 'string')
    return to
  if (to && typeof to === 'object' && 'path' in to)
    return String((to as { path?: unknown }).path || '#')
  return '#'
}

export const RouterLink = defineComponent({
  name: 'RouterLink',
  inheritAttrs: false,
  props: {
    to: { type: [String, Object], required: true },
    custom: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: String,
    viewTransition: Boolean,
  },
  setup(props, { slots }) {
    return () => {
      const href = toHref(props.to)
      const navigate = (event?: Event) => {
        event?.preventDefault?.()
      }
      return slots.default?.({
        href,
        route: { path: href },
        navigate,
        isActive: false,
        isExactActive: false,
      })
    }
  },
})
