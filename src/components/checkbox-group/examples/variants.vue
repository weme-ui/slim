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
      variant="soft"
      :items="items"
    />

    <CheckboxGroup
      variant="outline"
      :items="items"
    />

    <CheckboxGroup
      variant="card"
      :items="items"
    />
  </div>
</template>
