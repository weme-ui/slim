<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <RadioGroup :items="items" />
    <RadioGroup invalid :items="items" />
  </div>
</template>
