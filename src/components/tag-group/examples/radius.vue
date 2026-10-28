<script lang="ts" setup>
import type { TagGroupItem } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

function createItems(): TagGroupItem[] {
  return [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ]
}

const noneItems = ref(createItems())
const mdItems = ref(createItems())
const fullItems = ref(createItems())
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <TagGroup radius="none" :items="noneItems" />

    <TagGroup radius="md" :items="mdItems" />

    <TagGroup radius="full" :items="fullItems" />
  </div>
</template>
