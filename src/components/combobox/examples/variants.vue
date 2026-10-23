<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const defaultValues = {
  soft: '',
  outline: '',
}

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Combobox variant="soft" :items="items" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Combobox variant="outline" :items="items" placeholder="Outline" />
    </FormField>
  </Form>
</template>
