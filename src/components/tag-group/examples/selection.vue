<script lang="ts" setup>
import type { TagGroupItem, TagGroupItemValue } from '../tag-group.props'
import { ref } from 'vue'
import TagGroup from '../tag-group.vue'

const singleItems = ref<TagGroupItem[]>([
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
])

const multipleItems = ref<TagGroupItem[]>([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
])

const singleValue = ref<TagGroupItemValue>()
const multipleValue = ref<TagGroupItemValue[]>([])

function onRemoveSingle(values: TagGroupItemValue[]) {
  singleItems.value = singleItems.value.filter(item => !values.includes(item.value))
}

function onRemoveMultiple(values: TagGroupItemValue[]) {
  multipleItems.value = multipleItems.value.filter(item => !values.includes(item.value))
}
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm w-full">
    <TagGroup
      v-model="singleValue"
      selection-mode="single"
      :items="singleItems"
      @remove="onRemoveSingle"
    />

    <TagGroup
      v-model="multipleValue"
      selection-mode="multiple"
      :items="multipleItems"
      @remove="onRemoveMultiple"
    />
  </div>
</template>
