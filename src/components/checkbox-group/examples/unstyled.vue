<script lang="ts" setup>
import type { CheckboxGroupItem } from '../checkbox-group.props'
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import CheckboxGroup from '../checkbox-group.vue'

const defaultValues = {
  custom: ['a'],
}

const items: CheckboxGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="custom" label="Custom">
      <CheckboxGroup
        unstyled
        class="flex flex-col gap-2"
        :model-value="field.state.value"
        :items="items"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
