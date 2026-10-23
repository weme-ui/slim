<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import Input from '../input.vue'

const defaultValues = {
  soft: '',
  outline: '',
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="soft" label="Soft">
      <Input variant="soft" placeholder="Soft" />
    </FormField>
    <FormField name="outline" label="Outline">
      <Input variant="outline" placeholder="Outline" />
    </FormField>
  </Form>
</template>
