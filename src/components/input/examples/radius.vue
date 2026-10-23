<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  none: '',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  full: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <Input radius="none" placeholder="None" />
    </FormField>
    <FormField name="xs" label="XS">
      <Input radius="xs" placeholder="XS" />
    </FormField>
    <FormField name="sm" label="SM">
      <Input radius="sm" placeholder="SM" />
    </FormField>
    <FormField name="md" label="MD">
      <Input radius="md" placeholder="MD" />
    </FormField>
    <FormField name="lg" label="LG">
      <Input radius="lg" placeholder="LG" />
    </FormField>
    <FormField name="xl" label="XL">
      <Input radius="xl" placeholder="XL" />
    </FormField>
    <FormField name="full" label="Full">
      <Input radius="full" placeholder="Full" />
    </FormField>
  </Form>
</template>
