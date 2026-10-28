<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import TagGroup from '../tag-group.vue'

const items: TagGroupItem[] = [
  { label: 'Locked', value: 'locked' },
  { label: 'Read only', value: 'readonly' },
  { label: 'Disabled', value: 'disabled' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <TagGroup disabled :items="items" />
  </div>
</template>
