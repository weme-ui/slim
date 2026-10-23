<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const defaultValues = {
  value: '',
}

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <Listbox
        unstyled
        :items="items"
        placeholder="Fully custom…"
        class="text-sm w-full"
      />
    </FormField>
  </Form>
</template>
