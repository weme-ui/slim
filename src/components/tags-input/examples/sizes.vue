<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const sm = ref<TagsInputValue[]>(['sm'])
const md = ref<TagsInputValue[]>(['md'])
const lg = ref<TagsInputValue[]>(['lg'])
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <TagsInput v-model="sm" size="sm" placeholder="Small" />

    <TagsInput v-model="md" size="md" placeholder="Medium" />

    <TagsInput v-model="lg" size="lg" placeholder="Large" />
  </div>
</template>
