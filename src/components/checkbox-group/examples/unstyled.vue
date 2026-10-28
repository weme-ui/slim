<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <CheckboxGroup
      unstyled
      class="flex flex-col gap-2"
      :items="items"
    />
  </div>
</template>
