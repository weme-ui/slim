<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const defaultValues = {
  sm: [] as string[],
  md: [] as string[],
  lg: [] as string[],
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="sm" label="SM">
      <PinInput size="sm" />
    </FormField>
    <FormField name="md" label="MD">
      <PinInput size="md" />
    </FormField>
    <FormField name="lg" label="LG">
      <PinInput size="lg" />
    </FormField>
  </Form>
</template>
