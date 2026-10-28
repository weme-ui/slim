<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import CheckboxGroup from '../checkbox-group.vue'

const items: CheckboxGroupItem[] = [
  {
    label: 'Email',
    value: 'email',
    description: 'Get notified via email.',
  },
  {
    label: 'Push',
    value: 'push',
    description: 'Get push notifications on your devices.',
  },
  {
    label: 'SMS',
    value: 'sms',
    description: 'Get text messages for important updates.',
  },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <CheckboxGroup
      :items="items"
    />
  </div>
</template>
