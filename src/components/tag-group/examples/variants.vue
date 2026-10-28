<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

function createItems(): TagGroupItem[] {
  return [
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
    { label: 'Gamma', value: 'gamma' },
  ]
}

const softItems = ref(createItems())
const outlineItems = ref(createItems())
const invertedItems = ref(createItems())
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <TagGroup variant="soft" :items="softItems" />

    <TagGroup variant="outline" :items="outlineItems" />

    <TagGroup variant="inverted" :items="invertedItems" />
  </div>
</template>
