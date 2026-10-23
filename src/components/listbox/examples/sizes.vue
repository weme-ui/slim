<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const defaultValues = {
  sm: '',
  md: '',
  lg: '',
}

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <Listbox size="sm" :items="items" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <Listbox size="md" :items="items" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <Listbox size="lg" :items="items" placeholder="Large" />
    </FormField>
  </Form>
</template>
