<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const defaultValues = {
  soft: '',
  outline: '',
}

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Listbox variant="soft" :items="items" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Listbox variant="outline" :items="items" placeholder="Outline" />
    </FormField>
  </Form>
</template>
