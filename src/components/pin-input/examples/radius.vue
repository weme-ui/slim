<script lang="ts" setup>
import FormField from '../../form-field/form-field.vue'
import Form from '../../form/form.vue'
import PinInput from '../pin-input.vue'

const defaultValues = {
  none: [] as string[],
  md: [] as string[],
  full: [] as string[],
}
</script>

<template>
  <Form :default-values="defaultValues" class="flex flex-col gap-3 max-w-sm w-full">
    <FormField name="none" label="None">
      <PinInput radius="none" />
    </FormField>
    <FormField name="md" label="MD">
      <PinInput radius="md" />
    </FormField>
    <FormField name="full" label="Full">
      <PinInput radius="full" />
    </FormField>
  </Form>
</template>
