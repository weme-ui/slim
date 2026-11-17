<script lang="ts" setup>
import type { SelectItems, SelectValue } from '~/components/select/select.props'

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

const select = ref<SelectValue | undefined>()
</script>

<template>
  <Select variant="soft" :items="items" placeholder="Soft" v-model="select" />
</template>
