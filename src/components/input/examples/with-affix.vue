<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  icons: '',
  text: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="icons" label="With icons">
      <Input
        prefix-icon="ri:mail-line"
        suffix-icon="ri:search-line"
        placeholder="Search mail"
      />
    </FormField>
    <FormField name="text" label="With text">
      <Input prefix="https://" suffix=".com" placeholder="example" />
    </FormField>
  </Form>
</template>
