<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const defaultValues = {
  locked: ['design'],
}

const items: CheckboxGroupItem[] = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering', disabled: true },
  { label: 'Product', value: 'product' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="locked" label="Interests">
      <CheckboxGroup
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
