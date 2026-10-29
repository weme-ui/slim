<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering', disabled: true },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <RadioGroup
      :items="items"
    />
  </div>
</template>
