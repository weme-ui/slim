<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

function createItems(): TagGroupItem[] {
  return [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ]
}

const smItems = ref(createItems())
const mdItems = ref(createItems())
const lgItems = ref(createItems())
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <TagGroup size="sm" :items="smItems" />

    <TagGroup size="md" :items="mdItems" />

    <TagGroup size="lg" :items="lgItems" />
  </div>
</template>
