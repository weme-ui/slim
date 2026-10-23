<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Listbox from '../listbox.vue'

const defaultValues = {
  fruit: 'apple',
}

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="fruit" label="Fruit">
      <Listbox
        disabled
        :model-value="field.state.value"
        :items="items"
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
