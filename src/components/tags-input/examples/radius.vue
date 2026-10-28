<script lang="ts" setup>
import type { TagsInputValue } from '../tags-input.props'
import { ref } from 'vue'
import TagsInput from '../tags-input.vue'

const none = ref<TagsInputValue[]>(['none'])
const md = ref<TagsInputValue[]>(['md'])
const full = ref<TagsInputValue[]>(['full'])
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <TagsInput v-model="none" radius="none" placeholder="None" />

    <TagsInput v-model="md" radius="md" placeholder="Medium" />

    <TagsInput v-model="full" radius="full" placeholder="Full" />
  </div>
</template>
