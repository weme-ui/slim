<script lang="ts" setup>
import type { ToastProviderProps } from './toast-provider.props'
import { reactivePick } from '@vueuse/core'
import { ToastPortal, ToastProvider, ToastViewport, useForwardProps } from 'reka-ui'
import { computed, ref } from 'vue'
import { useToastProviderStyle } from './toast-provider.style'
import Toaster from './toaster.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastProviderProps>(), { side: 'bottom-right', gap: 16 })
const delegated = reactivePick(
  props,
  'disableSwipe',
  'duration',
  'label',
  'limit',
  'swipeThreshold',
  'toastManager',
)
const forwarded = useForwardProps(delegated)

const toasterRef = ref<{ height: number }>()

const height = computed(() => toasterRef.value?.height || 0)

const swipeDirection = computed<ToastProviderProps['swipeDirection']>(() => {
  switch (props.side) {
    case 'top':
      return 'up'
    case 'bottom':
      return 'down'
    case 'top-left':
    case 'bottom-left':
      return 'left'
    default:
      return 'right'
  }
})

const ui = computed(() =>
  useToastProviderStyle({
    side: props.side,
    swipe: swipeDirection.value,
  }),
)
</script>

<template>
  <ToastProvider v-bind="forwarded" :swipe-direction="swipeDirection">
    <slot />

    <Toaster
      ref="toasterRef"
      :gap="gap"
      :loading-icon="loadingIcon"
      :close-icon="closeIcon"
      :orientation="orientation"
      :closable="closable"
      :class="ui.toast()"
    />

    <ToastPortal>
      <ToastViewport
        data-slot="toast-viewport"
        :style="{
          '--gap': side.startsWith('top') ? `${gap}px` : `-${gap}px`,
          '--height': `${height}px`,
          '--scale-factor': '0.05',
          '--translate-factor': side.startsWith('top') ? '1px' : '-1px',
        }"
        :class="ui.root()"
      />
    </ToastPortal>
  </ToastProvider>
</template>
