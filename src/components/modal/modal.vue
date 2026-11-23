<script lang="ts" setup>
import type { ModalEmits, ModalProps } from './modal.props'
import { reactivePick } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import {
  DialogRoot,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  useForwardPropsEmits,
  DialogTitle,
  VisuallyHidden,
  DialogClose,
} from 'reka-ui'
import { computed, toRef, useSlots } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useModalStyle } from './modal.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ModalProps>(), {
  side: 'center',
  size: 'md',
  overlay: true,
  dismissible: true,
  loadingIcon: 'ri:loader-line',
  closeIcon: 'ri:close-line',
})

const emits = defineEmits<ModalEmits>()
const delegated = reactivePick(props, 'defaultOpen', 'open', 'modal', 'unmountOnHide')
const forwarded = useForwardPropsEmits(delegated, emits)

const contentProps = toRef(() => props.content)
const portalProps = toRef(() =>
  typeof props.portal === 'boolean' ? { disabled: props.portal } : props.portal,
)
const overlayProps = toRef(() => (typeof props.overlay === 'object' ? props.overlay : undefined))

const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown']

    return events.reduce(
      (acc, curr) => {
        acc[curr] = (e: Event) => {
          e.preventDefault()
          emits('close:prevent')
        }
        return acc
      },
      {} as Record<(typeof events)[number], (e: Event) => void>,
    )
  }

  return {}
})

const motion = computed(() => {
  switch (props.side) {
    case 'top':
      return {
        initial: { opacity: 0, top: '-10%' },
        animate: { opacity: 1, top: 0 },
        exit: { opacity: 0, top: '-10%' },
      }

    case 'bottom':
      return {
        initial: { opacity: 0, bottom: '-10%' },
        animate: { opacity: 1, bottom: 0 },
        exit: { opacity: 0, bottom: '-10%' },
      }

    case 'left':
      return {
        initial: { opacity: 0, left: '-5%' },
        animate: { opacity: 1, left: 0 },
        exit: { opacity: 0, left: '-5%' },
      }

    case 'right':
      return {
        initial: { opacity: 0, right: '-5%' },
        animate: { opacity: 1, right: 0 },
        exit: { opacity: 0, right: '-5%' },
      }

    default:
      return {
        initial: { opacity: 0, top: '55%', scale: 0.9 },
        animate: { opacity: 1, top: '50%', scale: 1 },
        exit: { opacity: 0, top: '55%', scale: 0.9 },
      }
  }
})

const slots = useSlots()
const hasHeader = computed(
  () =>
    !!slots.header || !!slots.title || !!slots.description || !!props.title || !!props.description,
)

const ui = computed(() =>
  useModalStyle({
    side: props.side,
    size: props.size,
    loading: toBoolValue(props.loading),
  }),
)
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="forwarded">
    <DialogTrigger data-slot="modal-trigger" :class="props.class" as-child>
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps">
      <AnimatePresence>
        <DialogOverlay v-if="!!overlay" v-bind="overlayProps" as-child>
          <Motion
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.2, ease: 'easeInOut' }"
            :class="cn(ui.overlay(), props.ui?.overlay)"
          />
        </DialogOverlay>

        <DialogContent
          data-slot="modal-content"
          v-bind="contentProps"
          v-on="contentEvents"
          as-child
        >
          <Motion
            v-bind="motion"
            :transition="{ duration: 0.2, ease: 'easeInOut' }"
            :class="cn(ui.root(), props.ui?.root)"
          >
            <header v-if="hasHeader" :class="cn(ui.header(), props.ui?.header)">
              <slot name="header" v-bind="{ open, close }">
                <div
                  v-if="!!loading || !!icon || !!$slots.icon"
                  :class="cn(ui.headerIconWrapper(), props.ui?.headerIconWrapper)"
                >
                  <slot name="icon" v-bind="{ open, loading }">
                    <Icon
                      v-if="icon || loading"
                      :name="loading ? loadingIcon : (icon ?? '')"
                      :class="cn(ui.headerIcon(), props.ui?.headerIcon)"
                    />
                  </slot>
                </div>

                <div :class="cn(ui.headerContent(), props.ui?.headerContent)">
                  <DialogTitle
                    :class="
                      cn(
                        !!title || !!$slots.title
                          ? [ui.headerTitle(), props.ui?.headerTitle]
                          : 'sr-only',
                      )
                    "
                  >
                    <slot name="title">{{ title }}</slot>
                  </DialogTitle>

                  <DialogDescription
                    :class="
                      cn(
                        !!description || !!$slots.description
                          ? [ui.headerDescription(), props.ui?.headerDescription]
                          : 'sr-only',
                      )
                    "
                  >
                    <slot name="description">{{ description }}</slot>
                  </DialogDescription>
                </div>
              </slot>

              <DialogClose v-if="closable" :class="cn(ui.close(), props.ui?.close)">
                <slot name="close">
                  <Icon :name="closeIcon" />
                </slot>
              </DialogClose>
            </header>

            <VisuallyHidden v-else as-child>
              <DialogTitle />
              <DialogDescription />
            </VisuallyHidden>

            <div :class="cn(ui.content(), props.ui?.content)">
              <slot name="content" v-bind="{ open, loading, close }" />
            </div>

            <footer v-if="!!$slots.footer" :class="cn(ui.footer(), props.ui?.footer)">
              <slot name="footer" v-bind="{ open, loading, close }" />
            </footer>
          </Motion>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
