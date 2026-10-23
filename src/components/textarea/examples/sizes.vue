<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Textarea from '../textarea.vue'

const defaultValues = {
  sm: '',
  md: '',
  lg: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <Textarea size="sm" placeholder="Small" />
    </FormField>
    <FormField name="md" label="MD">
      <Textarea size="md" placeholder="Medium" />
    </FormField>
    <FormField name="lg" label="LG">
      <Textarea size="lg" placeholder="Large" />
    </FormField>
  </Form>
</template>
