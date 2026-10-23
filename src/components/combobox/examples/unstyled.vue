<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Combobox from '../combobox.vue'

const defaultValues = {
  value: '',
}

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField name="value" label="Custom Styled">
      <Combobox
        unstyled
        :items="items"
        placeholder="Fully custom…"
        class="text-sm py-1 outline-none border-b b-base w-full"
      />
    </FormField>
  </Form>
</template>
