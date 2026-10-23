<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PasswordInput from '../password-input.vue'

const defaultValues = {
  withToggle: '',
  withoutToggle: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="withToggle" label="With toggle">
      <PasswordInput
        toggle-visibility
        placeholder="Toggle enabled"
      />
    </FormField>
    <FormField name="withoutToggle" label="Without toggle">
      <PasswordInput placeholder="Toggle disabled" />
    </FormField>
  </Form>
</template>
