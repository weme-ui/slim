<script lang="ts" setup>
import type { ImageLoadingStatus } from '../image/image.props'
import type { ImagePreviewEmits, ImagePreviewProps } from './image-preview.props'
import { onKeyStroke, reactivePick, useMounted } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { injectConfigProviderContext, Primitive, useBodyScrollLock } from 'reka-ui'
import { computed, ref, toRef, watch } from 'vue'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import Image from '../image/image.vue'
import { useImagePreviewStyle } from './image-preview.style'

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  loadingText: 'Loading...',
  loadingIcon: 'ri:loader-line',
  closeOnEscape: true,
})

const emits = defineEmits<ImagePreviewEmits>()
const imageProps = reactivePick(props, 'fit', 'fallbackSrc', 'fallbackDelayMs', 'alt', 'loading', 'referrerPolicy', 'crossOrigin')

const open = ref(false)

const configContext = injectConfigProviderContext({})
const scrollLocked = useBodyScrollLock(open.value)
const portalTarget = computed(() => configContext.teleportTo?.value ?? 'body')

const previews = toRef(() => props.previews || [])
const previewImage = ref<string | null>(null)
const previewLoaded = ref(false)

const ui = useImagePreviewStyle()

const isMounted = useMounted()

if (props.closeOnEscape) {
  onKeyStroke('Escape', () => open.value && handleOpenChange(false))
}

watch(
  open,
  (value) => {
    scrollLocked.value = value

    if (value && previewImage.value === null) {
      previewImage.value = previews.value.length > 0
        ? previews.value[0].src
        : props.src
    }
  },
  { immediate: true },
)

function getState(open?: boolean) {
  return open ? 'open' : 'closed'
}

function handlePreviewImageLoad(state: ImageLoadingStatus) {
  previewLoaded.value = state === 'loaded'
}

function handleOpenChange(value: boolean) {
  if (props.disabled)
    return

  open.value = value
  emits('update:open', value)
}
</script>

<template>
  <Primitive
    as="div"
    :data-slot="$attrs['data-slot'] || 'image-preview'"
    :data-state="getState(open)"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot>
      <Image
        v-bind="imageProps"
        :as="as"
        :src="src"
        :width="width"
        :height="height"
        :data-disabled="toBoolDataAttrValue(disabled)"
        :class="cn(ui.trigger(), props.ui?.trigger)"
        @click="handleOpenChange(!open)"
      />
    </slot>

    <Teleport v-if="isMounted" :to="portalTarget" :disabled="disabled">
      <AnimatePresence>
        <Motion
          v-if="open"
          key="content"
          aria-label="Image Preview"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :data-state="getState(open)"
          :class="cn(ui.content(), props.ui?.content)"
        >
          <div :class="cn(ui.viewport(), props.ui?.viewport)">
            <div v-if="!previewLoaded" :class="cn(ui.loading(), props.ui?.loading)">
              <Icon :name="loadingIcon" :class="cn(ui.loadingIcon(), props.ui?.loadingIcon)" />
              <span :class="cn(ui.loadingText(), props.ui?.loadingText)">{{ loadingText }}</span>
            </div>

            <div v-show="previewImage" :class="cn(ui.preview(), props.ui?.preview)">
              <Image
                v-bind="imageProps"
                :src="previewImage || src"
                :class="cn(ui.previewImage(), props.ui?.previewImage)"
                @loading-status-change="handlePreviewImageLoad"
              />
            </div>

            <Motion
              key="thumbs"
              as="ul"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0, transition: { when: 'beforeChildren' } }"
              :exit="{ opacity: 0, y: 0 }"
              :class="cn(ui.thumbs(), props.ui?.thumbs)"
            >
              <template v-for="preview in previews" :key="preview.src">
                <li
                  :data-highlighted="toBoolDataAttrValue(preview.src === previewImage)"
                  :class="cn(ui.thumb(), props.ui?.thumb)"
                  @click="previewImage = preview.src"
                >
                  <Image
                    :src="preview.src"
                    :alt="preview.alt"
                    :fallback-src="fallbackSrc"
                    :class="cn(ui.thumbImage(), props.ui?.thumbImage)"
                  />
                </li>
              </template>
            </Motion>
          </div>
        </Motion>

        <Motion
          v-if="open"
          key="overlay"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :class="cn(ui.overlay(), props.ui?.overlay)"
          @click="handleOpenChange(false)"
        />
      </AnimatePresence>
    </Teleport>
  </Primitive>
</template>
