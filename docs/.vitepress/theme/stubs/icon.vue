<script lang="ts" setup>
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps<{
  name: string
  class?: any
}>()
</script>

<template>
  <IconifyIcon :icon="name" :class="$props.class" />
</template>
