<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const defaultValues = {
  soft: '',
  outline: '',
}

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Autocomplete variant="soft" :items="items" placeholder="Soft" open-on-focus />
    </FormField>
    <FormField name="outline" label="Outline">
      <Autocomplete variant="outline" :items="items" placeholder="Outline" open-on-focus />
    </FormField>
  </Form>
</template>
