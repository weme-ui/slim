<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-md w-full">
    <RadioGroup
      orientation="vertical"
      :items="items"
    />

    <RadioGroup
      orientation="horizontal"
      :items="items"
    />
  </div>
</template>
