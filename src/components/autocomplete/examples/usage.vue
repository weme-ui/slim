<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const defaultValues = {
  drink: '',
}

const items: AutocompleteItems = [
  {
    label: 'Beer',
    value: 'beer',
    icon: 'ri:beer-line',
    selectedIcon: 'ri:beer-fill',
    iconClass: 'text-accent',
  },
  {
    label: 'Coffee',
    value: 'coffee',
    icon: 'ri:drinks-line',
    selectedIcon: 'ri:drinks-fill',
    iconClass: 'text-neutral',
  },
  {
    label: 'Juice',
    value: 'juice',
    icon: 'ri:goblet-line',
    selectedIcon: 'ri:goblet-fill',
    iconClass: 'text-info',
  },
  {
    label: 'Milk Tea',
    value: 'milk tea',
    icon: 'ri:drinks-2-line',
    selectedIcon: 'ri:drinks-2-fill',
    iconClass: 'text-warning',
  },
  {
    label: 'Wine',
    value: 'wine',
    icon: 'ri:goblet-2-line',
    selectedIcon: 'ri:goblet-2-fill',
    iconClass: 'text-error',
  },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="drink" label="Pick a drink">
      <Autocomplete
        :model-value="field.state.value"
        :items="items"
        prefix-icon="ri:search-line"
        placeholder="Search drinks…"
        open-on-focus
        @change="field.api.handleChange"
      />
      <p class="text-sm">
        Selected: {{ field.state.value }}
      </p>
    </FormField>
  </Form>
</template>
