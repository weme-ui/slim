<script lang="ts" setup>
import type { AspectRatioProps } from './aspect-ratio.props'
import { AspectRatio } from 'reka-ui'

const props = defineProps<AspectRatioProps>()
</script>

<template>
  <AspectRatio :as="as" :as-child="asChild" :ratio="ratio" :class="props.class">
    <slot />
  </AspectRatio>
</template>
