<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

const items = ref<TagGroupItem[]>([
  { label: 'Plain', value: 'plain' },
  { label: 'Custom', value: 'custom' },
  { label: 'Styles', value: 'styles' },
])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagGroup unstyled :items="items" />
  </div>
</template>
