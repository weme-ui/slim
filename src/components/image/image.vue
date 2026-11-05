<script lang="ts" setup>
import type { ImageEmits, ImageLoadingStatus, ImageProps } from './image.props'
import { isClient, reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, toRefs, watch, watchEffect } from 'vue'
import { cn } from '~/utils/styles'
import { useImageStyle } from './image.style'

const props = withDefaults(defineProps<ImageProps>(), {
  as: 'img',
  fit: 'contain',
  fallbackDelayMs: 0,
})

const emits = defineEmits<ImageEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'width', 'height', 'referrerPolicy', 'loading')

const ui = computed(() => useImageStyle({
  fit: props.fit,
}))

const isMounted = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)
const image = computed(() => {
  if (!isMounted.value) {
    return null
  }
  if (!imageRef.value && isClient) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    imageRef.value = new window.Image()
  }
  return imageRef.value
})

const { src, referrerPolicy, crossOrigin } = toRefs(props)
const loadingStatus = ref<ImageLoadingStatus>(resolveLoadingStatus(image.value, src.value))
const shouldShowFallback = ref(props.fallbackDelayMs === undefined && !!props.fallbackSrc)

watch(
  loadingStatus,
  (status) => {
    emits('loadingStatusChange', status)
  },
  { immediate: true },
)

watchEffect((onCleanup) => {
  if (props.fallbackSrc && isClient) {
    const timerId = window.setTimeout(() => {
      shouldShowFallback.value = true
    }, props.fallbackDelayMs)

    onCleanup(() => {
      window.clearTimeout(timerId)
    })
  }
})

onMounted(() => {
  isMounted.value = true

  watchEffect((onCleanup) => {
    const img = image.value
    if (!img) {
      return
    }

    loadingStatus.value = resolveLoadingStatus(img, src.value)

    const handleLoad = updateLoadingStatus('loaded')
    const handleError = updateLoadingStatus('error')

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)

    if (referrerPolicy?.value)
      img.referrerPolicy = referrerPolicy.value
    if (typeof crossOrigin?.value === 'string')
      img.crossOrigin = crossOrigin.value

    onCleanup(() => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    })
  })
})

onUnmounted(() => {
  isMounted.value = false
})

function updateLoadingStatus(status: ImageLoadingStatus) {
  return () => {
    if (isMounted.value)
      loadingStatus.value = status
  }
}

function resolveLoadingStatus(image: HTMLImageElement | null, src?: string): ImageLoadingStatus {
  if (!image)
    return 'idle'

  if (!src)
    return 'error'

  if (image.src !== src)
    image.src = src

  return image.complete && image.naturalWidth > 0
    ? 'loaded'
    : 'loading'
}
</script>

<template>
  <Primitive
    v-bind="delegated"
    :src="shouldShowFallback && loadingStatus !== 'loaded' ? fallbackSrc : src"
    :class="cn(ui, props.class)"
  >
    <slot />
  </Primitive>
</template>
