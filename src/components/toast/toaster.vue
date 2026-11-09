<script lang="ts" setup>
import type { ToastData } from './toast.props'
import type { ToasterProps } from './toaster.props'
import { injectToastProviderContext, useToastManager } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '~/utils/styles'
import Toast from './toast.vue'

const props = defineProps<ToasterProps>()
const providerContext = injectToastProviderContext()
const { toasts, close } = useToastManager<ToastData>()

const refs = ref<{ height: number }[]>([])

const height = computed(() => refs.value.reduce((acc, { height }) => acc + height + props.gap, 0))
const expanded = computed(() => providerContext.expanded.value)
const visibleToasts = computed(() => toasts.value.filter((toast) => toast.open))

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height }) => acc + height + props.gap, 0)
}

function handleUpdateOpen(open: boolean, id: string) {
  if (!open) {
    close(id)
  }
}

defineExpose({
  height,
})
</script>

<template>
  <template v-for="(toast, index) in visibleToasts" :key="toast.id">
    <Toast
      ref="refs"
      :toast="toast"
      :icon="toast.data?.icon"
      :status="toast.status"
      :title="toast.title"
      :description="toast.description"
      :actions="toast.data?.actions"
      :orientation="orientation"
      :close-icon="closeIcon"
      :loading-icon="toast.data?.loadingIcon ?? loadingIcon"
      :closable="toast.data?.closable ?? closable"
      :expanded="expanded"
      :style="{
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--before': visibleToasts.length - 1 - index,
        '--offset': getOffset(index),
        '--translate': expanded
          ? 'calc(var(--offset) * var(--translate-factor))'
          : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      :class="cn(props.class, toast.data?.class)"
      @update:open="handleUpdateOpen($event, toast.id)"
    />
  </template>
</template>
