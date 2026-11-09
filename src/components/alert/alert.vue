<script lang="ts" setup>
import type { AlertProps } from './alert.props'
import { Presence, Primitive, useId } from 'reka-ui'
import { computed, useAttrs, useSlots } from 'vue'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import LinkOverlay from '../link-overlay/link-overlay.vue'
import { useAlertStyle } from './alert.style'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'soft',
  closeIcon: 'ri:close-line',
  externalIcon: 'ri:external-link-line',
})

const visible = defineModel<boolean>('visible', { default: true })
const slots = useSlots()

const resolvedIcon = computed(() => {
  switch (props.status) {
    case 'info':
      return 'ri:information-line'
    case 'success':
      return 'ri:checkbox-circle-line'
    case 'warning':
      return 'ri:alert-line'
    case 'error':
      return 'ri:indeterminate-circle-line'
    default:
      return props.icon
  }
})

const isExternal = computed(
  () =>
    props.href?.startsWith('http') &&
    props.target === '_blank' &&
    props.rel === 'noopener noreferrer',
)

const hasIcon = computed(() => !!slots.icon || resolvedIcon.value !== undefined)
const hasTitle = computed(() => !!slots.title || !!props.title)
const hasDescription = computed(() => !!slots.description || !!props.description)
const hasContent = computed(() => hasTitle.value || hasDescription.value)
const hasActions = computed(() => !!slots.actions || isExternal.value)

const attrs = useAttrs()

const id = computed(() => useId(attrs.id as string | undefined, 'alert'))
const titleId = computed(() => (hasTitle.value ? `${id.value}-title` : undefined))
const descriptionId = computed(() => (hasDescription.value ? `${id.value}-desc` : undefined))

const ui = computed(() =>
  useAlertStyle({
    variant: props.variant,
    status: props.status,
    inline: !hasTitle.value || !hasDescription.value,
    clickable: !!props.href,
    withIcon: hasIcon.value,
  }),
)

function handleClose() {
  visible.value = false
}
</script>

<template>
  <Presence v-if="visible" :present="visible">
    <Primitive
      :id="id"
      :as="as"
      :as-child="asChild"
      :data-slot="$attrs['data-slot'] || 'alert'"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
      :class="cn(ui.root(), props.ui?.root, props.class)"
    >
      <slot v-if="hasIcon" name="icon">
        <Icon v-if="resolvedIcon" :name="resolvedIcon" :class="cn(ui.icon(), props.ui?.icon)" />
      </slot>

      <div v-if="hasContent" :class="cn(ui.content(), props.ui?.content)">
        <h2 v-if="hasTitle" :id="titleId" :class="cn(ui.title(), props.ui?.title)">
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <p
          v-if="hasDescription"
          :id="descriptionId"
          :class="cn(ui.description(), props.ui?.description)"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>

      <div v-if="hasActions" :class="cn(ui.actions(), props.ui?.actions)">
        <slot name="actions">
          <Icon v-if="isExternal" :name="externalIcon" />
        </slot>
      </div>

      <button
        v-if="closable"
        type="button"
        :class="cn(ui.close(), props.ui?.close)"
        @click="handleClose"
      >
        <slot name="close">
          <Icon :name="closeIcon" />
        </slot>
      </button>

      <LinkOverlay
        v-if="href"
        :href="href"
        :target="target"
        :rel="rel"
        :as-child="!!$slots['link-overlay']"
      >
        <slot name="link-overlay" />
      </LinkOverlay>
    </Primitive>
  </Presence>
</template>
