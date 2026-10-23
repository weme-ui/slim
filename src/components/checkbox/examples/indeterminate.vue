<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  selectAll: 'indeterminate' as boolean | 'indeterminate',
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="selectAll">
      <Checkbox
        label="Select all"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
