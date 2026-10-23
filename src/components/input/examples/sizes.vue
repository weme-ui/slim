<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  sm: '',
  md: '',
  lg: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <Input size="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <Input size="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <Input size="lg" placeholder="Large" />
    </FormField>
  </Form>
</template>
