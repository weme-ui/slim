<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Checkbox from '../checkbox.vue'

const defaultValues = {
  terms: false,
}
</script>

<template>
  <Form :default-values="defaultValues" class="max-w-sm w-full">
    <FormField v-slot="{ field }" name="terms">
      <Checkbox
        variant="card"
        indicator="end"
        radius="xl"
        label="Accept terms and conditions"
        description="By accepting, you agree to the terms and conditions"
        :model-value="field.state.value"
        @change="field.api.handleChange"
      />
    </FormField>
  </Form>
</template>
