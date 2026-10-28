<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import Combobox from '../combobox.vue'

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Combobox
      disabled
      :items="items"
      placeholder="Disabled"
    />
  </div>
</template>
