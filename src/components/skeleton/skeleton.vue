<script lang="ts" setup>
import type { SkeletonProps } from './skeleton.props'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useSkeletonStyle } from './skeleton.style'

const props = withDefaults(defineProps<SkeletonProps>(), { variant: 'rect' })
const ui = computed(() => useSkeletonStyle({ variant: props.variant }))
</script>

<template>
  <div :data-slot="$attrs['data-slot'] || `skeleton-${variant}`" :class="cn(ui, props.class)" />
</template>
