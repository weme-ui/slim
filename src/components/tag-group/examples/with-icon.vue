<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

const items = ref<TagGroupItem[]>([
  {
    label: 'Design',
    value: 'design',
    icon: 'ri:palette-line',
    selectedIcon: 'ri:palette-fill',
  },
  {
    label: 'Code',
    value: 'code',
    icon: 'ri:code-s-slash-line',
    selectedIcon: 'ri:code-s-slash-fill',
  },
  {
    label: 'Docs',
    value: 'docs',
    icon: 'ri:book-open-line',
    selectedIcon: 'ri:book-open-fill',
  },
])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagGroup
      selection-mode="multiple"
      :items="items"
    />
  </div>
</template>
