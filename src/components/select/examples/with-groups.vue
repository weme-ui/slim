<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Select from '../select.vue'

const defaultValues = {
  food: '',
}

const items: SelectItems = [
  [
    { type: 'label', label: 'Fruits', value: 'fruits' },
    { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
    { label: 'Banana', value: 'banana' },
    { type: 'separator', value: 'sep-1' },
  ],
  [
    { type: 'label', label: 'Vegetables', value: 'vegetables' },
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
  ],
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="food" label="Food">
      <Select
        :model-value="field.state.value"
        :items="items"
        placeholder="Select food…"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
