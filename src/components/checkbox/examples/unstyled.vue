<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  custom: true,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="custom">
      <Checkbox
        unstyled
        label="Custom styled"
        class="inline-flex gap-2 items-center"
        :model-value="field.state.value"
        @update:model-value="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
