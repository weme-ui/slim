<script lang="ts" setup>
import type { AvatarGroupProps } from './avatar-group.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import Avatar from '../avatar/avatar.vue'
import { useAvatarGroupStyle } from './avatar-group.style'

const props = withDefaults(defineProps<AvatarGroupProps>(), { size: 'md' })

const availableItems = computed(() =>
  props.items ? props.items.slice(0, props.max || props.items.length) : [],
)
const remaining = computed(() =>
  props.items ? props.items.length - availableItems.value.length : 0,
)

const ui = computed(() => useAvatarGroupStyle({ size: props.size }))
</script>

<template>
  <Primitive
    :as="as"
    :data-slot="$attrs['data-slot'] || 'avatar-group'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <slot>
      <template v-if="remaining > 0">
        <Avatar :size="size" :color="color"> +{{ remaining }} </Avatar>
      </template>
      <template v-for="(item, index) in availableItems" :key="index">
        <Avatar
          v-bind="item"
          :size="item.size || size"
          :color="item.color || color"
          :class="cn(ui.item(), props.ui?.item, item.class)"
        />
      </template>
    </slot>
  </Primitive>
</template>
