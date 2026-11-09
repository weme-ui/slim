<script lang="ts" setup>
import type { ToastEmits, ToastProps } from './toast.props'
import { isClient, reactivePick } from '@vueuse/core'
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, useTemplateRef } from 'vue'
import { cn } from '~/utils/styles'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { useToastStyle } from './toast.style'

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
  orientation: 'horizontal',
  closeIcon: 'ri:close-line',
  loadingIcon: 'ri:loader-line',
})

const emits = defineEmits<ToastEmits>()
const delegated = reactivePick(
  props,
  'as',
  'asChild',
  'defaultOpen',
  'duration',
  'forceMount',
  'open',
  'type',
)
const forwarded = useForwardPropsEmits(delegated, emits)

const rootRef = useTemplateRef('rootRef')

const resolvedVariant = computed(() => {
  switch (props.status) {
    case 'loading':
      return 'loading'
    case 'info':
      return 'info'
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'error':
      return 'error'
    default:
      return props.variant
  }
})

const statusIcon = computed(() => {
  switch (props.status) {
    case 'info':
      return 'ri:information-fill'
    case 'success':
      return 'ri:checkbox-circle-fill'
    case 'warning':
      return 'ri:alert-fill'
    case 'error':
      return 'ri:indeterminate-circle-fill'
    default:
      return undefined
  }
})

const hasIcon = computed(() => !!statusIcon.value || props.status === 'loading')

const ui = computed(() =>
  useToastStyle({
    variant: resolvedVariant.value,
    orientation: props.orientation,
  }),
)

const height = computed(() => {
  if (!isClient || !rootRef.value?.$el) return 0

  return rootRef.value.$el.getBoundingClientRect().height
})

defineExpose({
  height,
})
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    ref="rootRef"
    data-slot="toast"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div :class="cn(ui.container(), props.ui?.container)">
      <slot v-if="hasIcon" name="icon" :status="status">
        <Icon
          v-if="status === 'loading'"
          :name="loadingIcon"
          :class="cn(ui.icon(), props.ui?.icon)"
        />
        <Icon v-else-if="statusIcon" :name="statusIcon" :class="cn(ui.icon(), props.ui?.icon)" />
        <Icon v-else-if="icon" :name="icon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
        <div :class="cn(ui.content(), props.ui?.content)">
          <ToastTitle v-if="!!title" :class="cn(ui.title(), props.ui?.title)">
            <slot name="title">
              {{ title }}
            </slot>
          </ToastTitle>

          <ToastDescription
            v-if="!!description"
            :class="cn(ui.description(), props.ui?.description)"
          >
            <slot name="description">
              {{ description }}
            </slot>
          </ToastDescription>
        </div>

        <div v-if="actions && actions.length > 0" :class="cn(ui.actions(), props.ui?.actions)">
          <ToastAction
            v-for="(action, idx) in actions"
            :key="idx"
            :alt-text="action.label || 'Action'"
            as-child
          >
            <Button
              v-bind="action"
              :color="
                action.color ||
                (status === 'loading' || resolvedVariant === 'loading'
                  ? 'default'
                  : resolvedVariant)
              "
              variant="soft"
              size="sm"
              :class="cn(ui.action(), props.ui?.action, action.class)"
            />
          </ToastAction>
        </div>
      </div>
    </div>

    <ToastClose v-if="closable" :class="cn(ui.close(), props.ui?.close)">
      <slot name="close">
        <Icon :name="closeIcon" />
      </slot>
    </ToastClose>
  </ToastRoot>
</template>
