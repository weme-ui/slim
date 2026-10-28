<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const tags = ref<TagsInputValue[]>(['alpha', 'beta', 'gamma'])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagsInput
      v-model="tags"
      clearable
      placeholder="Add a tag…"
    />
  </div>
</template>
