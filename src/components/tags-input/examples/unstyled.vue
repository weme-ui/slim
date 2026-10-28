<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const tags = ref<TagsInputValue[]>(['custom'])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagsInput
      v-model="tags"
      unstyled
      placeholder="Fully custom…"
      class="text-sm py-1 outline-none border-b b-base flex flex-wrap gap-1 w-full focus-within:b-accent"
    />
  </div>
</template>
