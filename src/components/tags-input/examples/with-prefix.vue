<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const tags = ref<TagsInputValue[]>(['label', 'icon'])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagsInput
      v-model="tags"
      prefix-icon="ri:price-tag-3-line"
      placeholder="Add a tag…"
    />
  </div>
</template>
