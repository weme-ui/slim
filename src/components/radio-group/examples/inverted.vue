<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-sm w-full">
    <RadioGroup
      :items="items"
    />

    <RadioGroup
      inverted
      :items="items"
    />
  </div>
</template>
