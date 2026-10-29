<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  {
    label: 'Hobby',
    value: 'hobby',
    description: 'For personal projects and experiments.',
  },
  {
    label: 'Pro',
    value: 'pro',
    description: 'For growing teams that need more seats.',
  },
  {
    label: 'Enterprise',
    value: 'enterprise',
    description: 'For organizations with advanced controls.',
  },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <RadioGroup
      :items="items"
    />
  </div>
</template>
