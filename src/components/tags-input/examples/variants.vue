<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const soft = ref<TagsInputValue[]>(['soft'])
const outline = ref<TagsInputValue[]>(['outline'])
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <TagsInput v-model="soft" variant="soft" placeholder="Soft" />

    <TagsInput v-model="outline" variant="outline" placeholder="Outline" />
  </div>
</template>
