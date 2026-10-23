<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const defaultValues = {
  fruit: 'apple',
}

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="fruit" label="Fruit">
      <Autocomplete
        disabled
        :model-value="field.state.value"
        :items="items"
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
