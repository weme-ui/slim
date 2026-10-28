<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <CheckboxGroup :items="items" />
    <CheckboxGroup invalid :items="items" />
  </div>
</template>
