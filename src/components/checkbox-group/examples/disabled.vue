<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering', disabled: true },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <CheckboxGroup
      :items="items"
    />
  </div>
</template>
