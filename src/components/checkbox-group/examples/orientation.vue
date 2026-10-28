<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-md w-full">
    <CheckboxGroup
      orientation="vertical"
      :items="items"
    />

    <CheckboxGroup
      orientation="horizontal"
      :items="items"
    />
  </div>
</template>
