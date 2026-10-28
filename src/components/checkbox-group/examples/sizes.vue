<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-sm w-full">
    <CheckboxGroup
      size="sm"
      :items="items"
    />

    <CheckboxGroup
      size="md"
      :items="items"
    />

    <CheckboxGroup
      size="lg"
      :items="items"
    />
  </div>
</template>
