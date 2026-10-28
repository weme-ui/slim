<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const tags = ref<TagsInputValue[]>(['locked', 'readonly'])
</script>

<template>
  <div class="max-w-sm w-full">
    <TagsInput
      v-model="tags"
      disabled
      placeholder="Disabled"
    />
  </div>
</template>
