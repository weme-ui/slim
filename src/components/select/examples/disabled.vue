<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const defaultValues = {
  fruit: 'apple',
}

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="fruit" label="Fruit">
      <Select
        disabled
        :model-value="field.state.value"
        :items="items"
        placeholder="Disabled"
      />
    </FormField>
  </Form>
</template>
