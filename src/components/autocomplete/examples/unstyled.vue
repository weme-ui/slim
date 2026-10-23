<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Autocomplete from '../autocomplete.vue'

const defaultValues = {
  value: '',
}

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <Autocomplete
        unstyled
        :items="items"
        placeholder="Fully custom…"
        open-on-focus
        class="text-sm py-1 outline-none border-b b-base w-full"
      />
    </FormField>
  </Form>
</template>
