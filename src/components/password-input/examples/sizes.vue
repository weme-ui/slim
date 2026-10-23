<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const defaultValues = {
  sm: '',
  md: '',
  lg: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <PasswordInput toggle-visibility size="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <PasswordInput toggle-visibility size="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <PasswordInput toggle-visibility size="lg" placeholder="Large" />
    </FormField>
  </Form>
</template>
